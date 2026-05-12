import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, HelpCircle, Zap, Loader2, Trash2, Paperclip, X, Square } from "lucide-react";
import { getSubject } from "@/config/subjects";
import { useChat, Attachment } from "@/hooks/useChat";
import { useTranslation } from "@/contexts/TranslationContext";
import ChatMessage from "@/components/ChatMessage";
import OffTopicDialog from "@/components/OffTopicDialog";
import GlobalLanguageSelector from "@/components/GlobalLanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const Chat = () => {
  const { subject: slug } = useParams<{ subject: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const languageName = searchParams.get("lang") || undefined;
  const { t } = useTranslation();

  const subject = getSubject(slug || "");
  const displayName =
    slug === "language" && languageName ? languageName : subject?.name || "Chat";
  const accentHsl = subject?.accentHsl || "220 70% 50%";

  const { messages, isLoading, send, clearMessages, stopResponse, editMessage } = useChat(
    slug || "",
    languageName
  );

  const hasStreamingMessage = messages.some(
    (msg) => msg.role === "assistant" && msg.isStreaming
  );

  const [input, setInput] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>([]);
  const [offTopicSubject, setOffTopicSubject] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Detect [OFF_TOPIC] in last assistant message
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === "assistant" && lastMsg.content.includes("[OFF_TOPIC]")) {
      const match = lastMsg.content.match(/about\s+(\w+)/i);
      if (match) {
        setOffTopicSubject(match[1].toLowerCase());
      }
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed && pendingAttachments.length === 0) return;
    if (isLoading) return;

    const attachments = pendingAttachments.length ? pendingAttachments : undefined;
    setInput("");
    setPendingAttachments([]);
    send(trimmed, attachments);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const nextAttachments: Attachment[] = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      url: URL.createObjectURL(file),
      isImage: file.type.startsWith("image/"),
    }));

    setPendingAttachments((prev) => [...prev, ...nextAttachments]);
    event.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickAction = (prompt: string) => {
    if (isLoading) return;
    send(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header
        className="border-b border-border backdrop-blur-md sticky top-0 z-30"
        style={{
          background: `linear-gradient(135deg, hsl(${accentHsl} / 0.08), hsl(${accentHsl} / 0.02))`,
        }}
      >
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
            style={{ backgroundColor: `hsl(${accentHsl})` }}
          >
            {subject && <subject.icon className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold font-[Space_Grotesk] text-foreground leading-tight">
              {displayName}
            </h1>
            <p className="text-xs text-muted-foreground">{t("chat.bySashankEduAlyve")}</p>
          </div>
          <GlobalLanguageSelector />
          <ThemeToggle />
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearMessages}
              className="shrink-0 text-muted-foreground hover:text-destructive"
              title={t("chat.clearChat")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-2xl border border-border bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
            {t("chat.disclaimer")}
          </div>

          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div
                className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4"
                style={{ backgroundColor: `hsl(${accentHsl})` }}
              >
                {subject && <subject.icon className="h-8 w-8" />}
              </div>
              <h2 className="text-xl font-bold font-[Space_Grotesk] text-foreground">
                {t("chat.greeting", { subject: displayName })}
              </h2>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                {t("chat.subtitle", { subject: displayName })}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="rounded-full border-2 p-3 hover:shadow-md transition-shadow"
                    style={{ borderColor: `hsl(${accentHsl} / 0.4)`, color: `hsl(${accentHsl})` }}
                    onClick={() => quickAction(t("chat.quickActionDoubt", { subject: displayName }))}
                    title={t("chat.askDoubt")}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    variant="outline"
                    className="rounded-full border-2 p-3 hover:shadow-md transition-shadow"
                    style={{ borderColor: `hsl(${accentHsl} / 0.4)`, color: `hsl(${accentHsl})` }}
                    onClick={() => quickAction(t("chat.quickActionQuiz", { subject: displayName }))}
                    title={t("chat.quizMe")}
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                accentHsl={accentHsl}
                videoUrl={msg.videoUrl}
                imageUrl={msg.imageUrl}
                attachments={msg.attachments}
                isStreaming={msg.isStreaming}
                onEdit={msg.role === "user" ? (newContent) => editMessage(i, newContent) : undefined}
              />
            ))}
          </AnimatePresence>

          {isLoading && !messages.some((msg) => msg.role === "assistant" && msg.isStreaming) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: `hsl(${accentHsl})` }}
              >
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                  <span className="text-sm text-muted-foreground">{t("chat.loaderText")}</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-border bg-card/80 backdrop-blur-md px-4 py-3">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:bg-muted/10">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                {t("chat.attachFiles")}
              </div>
              <span className="text-xs font-medium text-primary">{t("chat.chooseFiles")}</span>
              <Input
                type="file"
                className="hidden"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
              />
            </label>

            {pendingAttachments.length > 0 && (
              <div className="grid gap-3">
                {pendingAttachments.map((file, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-border bg-background p-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {file.isImage ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          <Paperclip className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.type || t("message.document")} · {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPendingAttachments((prev) => prev.filter((_, i) => i !== index))}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder", { subject: displayName })}
              className="min-h-[44px] max-h-[120px] resize-none rounded-xl py-3"
              rows={1}
            />
              {hasStreamingMessage && (
              <Button
                variant="outline"
                size="icon"
                onClick={stopResponse}
                className="shrink-0"
                title={t("chat.stopResponse")}
              >
                <Square className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={handleSend}
              disabled={(!input.trim() && pendingAttachments.length === 0) || isLoading}
              className={`shrink-0 h-11 w-11 rounded-xl transition-all duration-200 ${
                input.trim() || pendingAttachments.length ? 'animate-pulse' : ''
              }`}
              style={{ backgroundColor: `hsl(${accentHsl})` }}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <OffTopicDialog
        open={!!offTopicSubject}
        onClose={() => setOffTopicSubject(null)}
        detectedSubject={offTopicSubject || ""}
        currentSubject={slug || ""}
      />
    </div>
  );
};

export default Chat;
