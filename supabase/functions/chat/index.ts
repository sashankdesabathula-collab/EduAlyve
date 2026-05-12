import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildSystemPrompt(subject: string, languageName?: string): string {
  const subjectDisplayMap: Record<string, string> = {
    english: "English",
    hindi: "Hindi",
    math: "Math",
    science: "Science",
    social: "Social Studies",
    language: languageName || "Language",
  };

  const noHeadingSubjects = new Set<string>();
  const subjectDisplay = subjectDisplayMap[subject] || subject;

  const mathRules = subject === "math" ? `
- Use proper mathematical symbols: × for multiplication, ÷ for division, ≠ for not equal, ≤ ≥ for inequalities, √ for square root, π for pi, ² ³ for powers, ∑ for summation, ∞ for infinity, ∈ for belongs to, ⊂ for subset, ∪ ∩ for union/intersection, ∠ for angle, ° for degrees, ≈ for approximately equal.
- Never use LaTeX notation like \\times, \\div, \\sqrt, \\pi etc. Always use the actual Unicode symbols.
- Use × instead of * or x for multiplication. Use ÷ instead of / for division when showing operations.
- Write fractions as a/b in simple cases or describe them clearly.
` : "";

  const codingRules = "";

  const responseRules = noHeadingSubjects.has(subject)
    ? `RESPONSE FORMAT — For ${subjectDisplay}, do not use section headings like Topic, Explanation, or Real-Life Example. Write a clear, conversational answer with short paragraphs and bullet lists as needed. Add one heading exactly:\n\n## Trick to remember\n\nUse this heading near the end of the answer to share a simple memory trick or shortcut.\n`
    : `RESPONSE FORMAT — Follow this structure for EVERY answer:\n\n## 📖 Topic\nState the topic or question clearly.\n\n## 💡 Explanation\nProvide a clear, step-by-step explanation. Use simple language. Avoid jargon. If you must use a technical term, define it immediately.\n\n## 🎯 Trick to remember\nAdd a short memory trick, analogy, or tip that helps the student remember the main idea.\n`;

  return `You are an expert ${subjectDisplay} tutor called EduAlyve.\n\n${responseRules}\n${mathRules}${codingRules}
When presenting comparisons, data, formulas, or structured information, use markdown tables. Use this exact template and keep headers short and clear.\nEach row must appear on its own line. Do not put multiple rows on the same line.\n\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Value 1  | Value 2  | Value 3  |\n\nExample:\n| Property | Value |\n|----------|-------|\n| Speed    | 3 × 10⁸ m/s |\n\n${noHeadingSubjects.has(subject) ? "" : `## 🌍 Real-Life Example\nGive a relatable, real-world example that helps the student connect the concept to everyday life.\n\n`}## 🎥 Video Explanation\nFor most student questions, especially those about processes, demonstrations, real-world applications, or visual concepts, ALWAYS include a video prompt with a 2D or 3D animation example. Videos are completely FREE with a daily limit of 10 per user.\n\nUse this format exactly:\n\n[VIDEO_PROMPT] Create a 10-second animation showing [brief description of the concept in action, e.g., "a car accelerating using Newton's laws" or "photosynthesis in a plant cell"].\n\nInclude a video prompt when the answer is about:\n- Science experiments, processes, or systems\n- Mathematical concepts with visual representations\n- Historical events in motion\n- Language examples, pronunciation, or grammar in context\n- Social studies concepts like geography, economics, or daily life\n- Coding concepts, algorithms, data structures, or programming logic\n\nOnly skip the video prompt for very short factual definitions or where the concept cannot reasonably be shown visually.\n\n## 🗣️ Voice Tool\nWhen the student asks how to pronounce a word or phrase, add a voice output marker with the exact phrase to speak.\n\nUse this format exactly:\n\n[VOICE_TEXT] [word or phrase]\n\nExample:\n[VOICE_TEXT] elephant\n\nAlso explain the pronunciation in text in the same response.\n\n---\n\nQUIZ FORMAT — When quizzing or the student asks to be quizzed, use this EXACT format:\n\n## 🧠 Quick Quiz\n\n**Question:** [Your question here]\n\n- **A)** [Option A]\n- **B)** [Option B]\n- **C)** [Option C]\n- **D)** [Option D]\n\n💡 **Hint:** [Optional hint]\n\nWhen the student answers, respond with the structured format showing whether they were correct, the right answer, and an explanation.\n\n---\n\nOFF-TOPIC DETECTION:\nIf a student asks something that is NOT related to ${subjectDisplay}, you MUST respond with EXACTLY this format (no other text before it):\n\n[OFF_TOPIC]\nThat question is about {detected_subject}. Let's stay focused on ${subjectDisplay}!\n\nWhere {detected_subject} must be one of: english, hindi, math, science, social, language.\nDo NOT answer the off-topic question at all. Just output the [OFF_TOPIC] tag and the message.\n\n---\n\nSTRICT RULES:\n1. ONLY answer questions related to ${subjectDisplay}.\n2. Use simple, easy-to-understand language. Avoid confusing or overly technical terms.\n3. When quizzing, ALWAYS use the Quick Quiz format above with the 🧠 Quick Quiz heading.\n4. Be encouraging and supportive. Use emojis sparingly to keep things friendly.\n5. Format responses with markdown: **bold** for key terms, bullet lists for steps, proper headings.\n6. Use markdown tables whenever presenting structured data, comparisons, or formulas.\n7. For coding questions, ALWAYS provide working code examples with clear explanations.\n8. Guide students through progressive learning paths from basics to advanced concepts.\n9. Include practical projects and real-world applications in coding lessons.\n${subject === "language" && languageName ? `10. When appropriate, include examples and text in ${languageName} script/language to help the student learn.` : ""}`;
}

function createVideoPromptFromQuestion(question: string, subject: string): string {
  const cleanQuestion = question.trim().replace(/\s+/g, " ");
  return `Create a 10-second animation showing ${cleanQuestion} in a real-life ${subject} context.`;
}

function createImagePromptFromQuestion(question: string, subject: string): string {
  const cleanQuestion = question.trim().replace(/\s+/g, " ");
  return `Generate a unique illustrative image for ${cleanQuestion} as a real-life ${subject} scene.`;
}

const NEWS_API_KEY = Deno.env.get("NEWS_API_KEY");

async function fetchCurrentAffairsContext(): Promise<string | null> {
  if (!NEWS_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?language=en&pageSize=6&category=general",
      {
        headers: {
          "X-Api-Key": NEWS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles.slice(0, 6) : [];
    if (!articles.length) {
      return null;
    }

    const items = articles
      .map((article: any) => {
        const published = article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "Unknown date";
        const title = article.title?.trim() || "Untitled headline";
        const source = article.source?.name || "Unknown source";
        const description = article.description?.trim() || "";
        const url = article.url || "";

        return `- ${title} (${source}, ${published})${description ? ` — ${description}` : ""}${
          url ? `\n  ${url}` : ""
        }`;
      })
      .join("\n");

    return `As of ${new Date().toISOString().slice(0, 10)}, use only the following latest current affairs headlines when answering current affairs questions. Do not invent any events beyond these items unless explicitly asked to provide general background:\n${items}`;
  } catch {
    return null;
  }
}

const NEWS_API_KEY = Deno.env.get("NEWS_API_KEY");

async function fetchCurrentAffairsContext(): Promise<string | null> {
  if (!NEWS_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?language=en&pageSize=6&category=general",
      {
        headers: {
          "X-Api-Key": NEWS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles.slice(0, 6) : [];
    if (!articles.length) {
      return null;
    }

    const items = articles
      .map((article: any) => {
        const published = article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "Unknown date";
        const title = article.title?.trim() || "Untitled headline";
        const source = article.source?.name || "Unknown source";
        const description = article.description?.trim() || "";
        const url = article.url || "";

        return `- ${title} (${source}, ${published})${description ? ` — ${description}` : ""}${
          url ? `\n  ${url}` : ""
        }`;
      })
      .join("\n");

    return `As of ${new Date().toISOString().slice(0, 10)}, use only the following latest current affairs headlines when answering current affairs questions. Do not invent any events beyond these items unless explicitly asked to provide general background:\n${items}`;
  } catch {
    return null;
  }
}

async function generateVideo(prompt: string, subject: string): Promise<string | null> {
  // Mock video generation - FREE with daily limits
  // In production, integrate with a real text-to-video API or self-hosted video generator.
  const sampleVideos = [
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4",
  ];

  const hash = Array.from(prompt)
    .reduce((acc, char) => (acc + char.charCodeAt(0)) % sampleVideos.length, 0);
  const baseUrl = sampleVideos[hash];
  const uniqueId = encodeURIComponent(prompt.slice(0, 40));
  return `${baseUrl}?prompt=${uniqueId}`;
}

function generateImage(prompt: string, subject: string): string {
  const seed = Array.from(prompt + subject)
    .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 10000, 0);
  return `https://picsum.photos/seed/${seed}/640/360`;
}

function isPronunciationRequest(question: string): boolean {
  return /\b(pronounce|pronunciation|how do i say|how to say|say it|sound of)\b/i.test(question);
}

function extractVoiceText(question: string): string | null {
  const matchers = [
    /pronounce\s+['"]?([^'"\s]+)['"]?/i,
    /pronunciation of\s+['"]?([^'"\s]+)['"]?/i,
    /how do i say\s+(.+?)(?:\?|$)/i,
    /how to say\s+(.+?)(?:\?|$)/i,
    /say\s+(.+?)(?:\?|$)/i,
  ];
  for (const regex of matchers) {
    const match = question.match(regex);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, subject, languageName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = buildSystemPrompt(
      subject || "general",
      languageName
    );

    const attachmentLines = (messages || [])
      .flatMap((m: any) => m.attachments?.map((a: any) => `- ${a.name} (${a.type}, ${Math.round(a.size / 1024)} KB)`))
      .filter(Boolean)
      .join("\n");

    const extraSystemMessages = attachmentLines
      ? [
          {
            role: "system",
            content: `The student uploaded the following files. Use these names and types as context when answering, but do not guess the exact contents:\n${attachmentLines}`,
          },
        ]
      : [];

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...extraSystemMessages,
            ...(messages || []),
          ],
          stream: false, // Change to false to get full response
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    let data: any;

    if (contentType.includes("text/event-stream") && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let result = "";
      let done = false;

      while (!done) {
        const { value, done: readDone } = await reader.read();
        if (readDone) {
          done = true;
          break;
        }
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(raw);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (typeof delta === "string") {
              result += delta;
            }
          } catch {
            // ignore malformed event
          }
        }
      }

      data = { choices: [{ message: { content: result } }] };
    } else {
      data = await response.json();
    }

    let content = data?.choices?.[0]?.message?.content || "";

    // Check for video prompt
    const videoPromptMatch = content.match(/\[VIDEO_PROMPT\]\s*([^\n\r]+)/i);
    let videoUrl = null;
    if (videoPromptMatch) {
      const prompt = videoPromptMatch[1].trim();
      videoUrl = await generateVideo(prompt, subject);
      content = content.replace(/\[VIDEO_PROMPT\]\s*([^\n\r]+)/i, '').trim();
    }

    const lastUserMessage = (messages || [])
      .slice()
      .reverse()
      .find((message: any) => message.role === "user")?.content;

    const isVisualQuestion = typeof lastUserMessage === "string" && lastUserMessage.length > 10;
    let imageUrl = null;
    if (isVisualQuestion) {
      const imagePrompt = createImagePromptFromQuestion(lastUserMessage, subject || "topic");
      imageUrl = generateImage(imagePrompt, subject);
      if (!content.includes("Image Explanation")) {
        content += "\n\n## 🖼️ Image Explanation\nSee the illustration below for a quick visual summary.";
      }
    }

    let voiceText: string | null = null;
    const voiceTextMatch = content.match(/\[VOICE_TEXT\]\s*([^\n\r]+)/i);
    if (voiceTextMatch) {
      voiceText = voiceTextMatch[1].trim();
      content = content.replace(/\[VOICE_TEXT\]\s*([^\n\r]+)/i, '').trim();
    }

    if (!voiceText && typeof lastUserMessage === "string" && isPronunciationRequest(lastUserMessage)) {
      voiceText = extractVoiceText(lastUserMessage) || lastUserMessage;
      if (!content.includes("Voice Explanation")) {
        content += "\n\n## 🗣️ Voice Explanation\nClick the button below to hear the pronunciation.";
      }
    }

    if (!videoUrl && isVisualQuestion) {
      const fallbackPrompt = createVideoPromptFromQuestion(lastUserMessage, subject || "topic");
      videoUrl = await generateVideo(fallbackPrompt, subject);
      if (!content.includes("Video Explanation")) {
        content += "\n\n## 🎥 Video Explanation\nWatch the animation below to see the concept in action.";
      }
    }

    return new Response(
      JSON.stringify({ content, videoUrl, imageUrl, voiceText }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

    return new Response(
      JSON.stringify({ content, videoUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
