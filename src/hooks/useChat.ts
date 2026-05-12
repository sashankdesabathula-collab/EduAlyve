import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

export type Attachment = {
  name: string;
  type: string;
  size: number;
  url: string;
  isImage: boolean;
};

export type Message = {
  role: "user" | "assistant";
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  voiceText?: string;
  isStreaming?: boolean;
  attachments?: Attachment[];
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

function getStorageKey(subject: string, languageName?: string) {
  return `edualyve_chat_${subject}${languageName ? `_${languageName}` : ""}`;
}

export function useChat(subject: string, languageName?: string) {
  const storageKey = getStorageKey(subject, languageName);

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<Message[]>(messages);
  const abortControllerRef = useRef<AbortController | null>(null);
  const assistantContentRef = useRef<string>("");
  const fallbackText = "I couldn't fully understand that right now. Please try again or ask it in a different way.";

  useEffect(() => {
    messagesRef.current = messages;
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
  }, [messages, storageKey]);

  const upsertAssistant = useCallback((content: string, done = false) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "assistant") {
        return prev.map((m, i) =>
          i === prev.length - 1
            ? { ...m, content, isStreaming: !done }
            : m
        );
      }
      return [...prev, { role: "assistant", content, isStreaming: !done }];
    });
  }, []);

  const send = useCallback(
    async (input: string, attachments?: Attachment[]) => {
      const finalText =
        input.trim() ||
        (attachments?.length
          ? `Please review the attached file${attachments.length > 1 ? "s" : ""}: ${attachments
              .map((a) => a.name)
              .join(", ")}`
          : "");
      const userMsg: Message = {
        role: "user",
        content: finalText,
        attachments,
      };
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "", isStreaming: true }] );
      setIsLoading(true);
      assistantContentRef.current = "";
      const requestMessages = [...messagesRef.current, userMsg];
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          signal: abortController.signal,
          body: JSON.stringify({
            messages: requestMessages.map((m) => ({
              role: m.role,
              content: m.content,
              attachments: m.attachments?.map(({ name, type, size }) => ({ name, type, size })),
            })),
            subject,
            languageName,
          }),
        });

        if (resp.status === 429) {
          toast.error("Too many requests. Please wait a moment and try again.");
          upsertAssistant(fallbackText, true);
          setIsLoading(false);
          return;
        }
        if (resp.status === 402) {
          toast.error("AI credits exhausted. Please add funds to continue.");
          upsertAssistant(fallbackText, true);
          setIsLoading(false);
          return;
        }
        if (!resp.ok) {
          const text = await resp.text();
          console.error("Chat request failed", resp.status, resp.statusText, text);
          toast.error("Something went wrong. Please try again.");
          upsertAssistant(fallbackText, true);
          setIsLoading(false);
          return;
        }

        const contentType = resp.headers.get("content-type") || "";
        console.debug("Chat response type", contentType);

        if (contentType.includes("text/event-stream")) {
          let assistantSoFar = "";
          const reader = resp.body?.getReader();
          if (!reader) throw new Error("Missing response body");
          const decoder = new TextDecoder();
          let textBuffer = "";
          let streamDone = false;

          const appendAssistantChunk = (chunk: string, done = false) => {
            assistantSoFar += chunk;
            assistantContentRef.current = assistantSoFar;
            upsertAssistant(assistantSoFar, done);
          };

          while (!streamDone) {
            const { done, value } = await reader.read();
            if (done) {
              streamDone = true;
              break;
            }
            textBuffer += decoder.decode(value, { stream: true });

            let newlineIndex;
            while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
              let line = textBuffer.slice(0, newlineIndex);
              textBuffer = textBuffer.slice(newlineIndex + 1);

              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (line.startsWith(":")) continue;
              if (line.trim() === "") continue;
              if (!line.startsWith("data: ")) continue;

              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") {
                streamDone = true;
                break;
              }

              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content as string | undefined;
                if (content) appendAssistantChunk(content);
              } catch (innerError) {
                console.warn("Malformed SSE chunk", innerError, jsonStr);
              }
            }
          }

          if (textBuffer.trim()) {
            for (let raw of textBuffer.split("\n")) {
              if (!raw) continue;
              if (raw.endsWith("\r")) raw = raw.slice(0, -1);
              if (raw.startsWith(":")) continue;
              if (raw.trim() === "") continue;
              if (!raw.startsWith("data: ")) continue;
              const jsonStr = raw.slice(6).trim();
              if (jsonStr === "[DONE]") continue;
              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content as string | undefined;
                if (content) appendAssistantChunk(content);
              } catch (innerError) {
                console.warn("Malformed trailing SSE chunk", innerError, jsonStr);
              }
            }
          }

          if (assistantSoFar) {
            upsertAssistant(assistantSoFar, true);
          } else {
            upsertAssistant(fallbackText, true);
          }
        } else if (contentType.includes("application/json") || contentType.includes("text/json")) {
          const data = await resp.json();
          if (data.error) {
            toast.error(data.error);
            upsertAssistant(fallbackText, true);
            setIsLoading(false);
            return;
          }
          upsertAssistant(data.content || fallbackText, true);
        } else {
          const bodyText = await resp.text();
          console.warn("Unexpected chat response type", contentType, bodyText);
          try {
            const data = JSON.parse(bodyText);
            upsertAssistant(data.content || JSON.stringify(data), true);
          } catch (parseError) {
            throw new Error(`Unexpected response format: ${bodyText}`);
          }
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        console.error("Chat error:", e);
        const message = e instanceof Error ? e.message : "Failed to connect.";
        toast.error(`Failed to connect: ${message}`);
        upsertAssistant(assistantContentRef.current.trim() || fallbackText, true);
      } finally {
        abortControllerRef.current = null;
        setIsLoading(false);
      }
    },
    [subject, languageName]
  );

  const clearMessages = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [storageKey]);

  const stopResponse = useCallback(() => {
    if (!abortControllerRef.current) return;
    abortControllerRef.current.abort();
    abortControllerRef.current = null;
    upsertAssistant(assistantContentRef.current.trim() || fallbackText, true);
    setIsLoading(false);
  }, [upsertAssistant, fallbackText]);

  const editMessage = useCallback((index: number, content: string) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, content } : msg))
    );
  }, []);

  return { messages, isLoading, send, clearMessages, stopResponse, editMessage };
}
