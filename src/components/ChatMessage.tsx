import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useAnimation } from "framer-motion";
import { Bot, User, BookOpen, Lightbulb, Globe, CheckCircle, Brain, Video, Volume2, VolumeX, Paperclip, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TranslateButton } from "@/components/TranslateButton";
import { useTranslation } from "@/contexts/TranslationContext";

interface Attachment {
  name: string;
  type: string;
  size: number;
  url: string;
  isImage: boolean;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  accentHsl: string;
  videoUrl?: string;
  imageUrl?: string;
  voiceText?: string;
  attachments?: Attachment[];
  isStreaming?: boolean;
  onEdit?: (newContent: string) => void;
}

interface Section {
  type: "topic" | "explanation" | "example" | "takeaway" | "quiz" | "video" | "other";
  title: string;
  body: string;
  videoUrl?: string;
}

const sectionMeta = {
  topic: {
    icon: BookOpen,
    label: "Topic",
    bg: "bg-blue-500/10 dark:bg-blue-400/10",
    border: "border-blue-500/30 dark:border-blue-400/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    headerBg: "bg-blue-500/15 dark:bg-blue-400/15",
  },
  explanation: {
    icon: Lightbulb,
    label: "Explanation",
    bg: "bg-amber-500/10 dark:bg-amber-400/10",
    border: "border-amber-500/30 dark:border-amber-400/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    headerBg: "bg-amber-500/15 dark:bg-amber-400/15",
  },
  example: {
    icon: Globe,
    label: "Real-Life Example",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    border: "border-emerald-500/30 dark:border-emerald-400/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    headerBg: "bg-emerald-500/15 dark:bg-emerald-400/15",
  },
  takeaway: {
    icon: CheckCircle,
    label: "Key Takeaway",
    bg: "bg-violet-500/10 dark:bg-violet-400/10",
    border: "border-violet-500/30 dark:border-violet-400/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    headerBg: "bg-violet-500/15 dark:bg-violet-400/15",
  },
  quiz: {
    icon: Brain,
    label: "Quick Quiz",
    bg: "bg-pink-500/10 dark:bg-pink-400/10",
    border: "border-pink-500/30 dark:border-pink-400/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    headerBg: "bg-pink-500/15 dark:bg-pink-400/15",
  },
  video: {
    icon: Video,
    label: "Video Explanation",
    bg: "bg-red-500/10 dark:bg-red-400/10",
    border: "border-red-500/30 dark:border-red-400/30",
    iconColor: "text-red-600 dark:text-red-400",
    headerBg: "bg-red-500/15 dark:bg-red-400/15",
  },
  other: {
    icon: BookOpen,
    label: "",
    bg: "bg-muted/50",
    border: "border-border",
    iconColor: "text-muted-foreground",
    headerBg: "bg-muted/30",
  },
};

function classifySection(heading: string): Section["type"] {
  const h = heading.toLowerCase();
  if (h.includes("quiz")) return "quiz";
  if (h.includes("topic")) return "topic";
  if (h.includes("explanation")) return "explanation";
  if (h.includes("example")) return "example";
  if (h.includes("takeaway")) return "takeaway";
  return "other";
}

function parseSections(content: string): Section[] | null {
  const parts = content.split(/^## /m);
  if (parts.length < 2) return null;

  const sections: Section[] = [];

  const preamble = parts[0].trim();
  if (preamble) {
    sections.push({ type: "other", title: "", body: preamble });
  }

  for (let i = 1; i < parts.length; i++) {
    const lineBreak = parts[i].indexOf("\n");
    const title = lineBreak === -1 ? parts[i].trim() : parts[i].substring(0, lineBreak).trim();
    const body = lineBreak === -1 ? "" : parts[i].substring(lineBreak + 1).trim();
    const type = classifySection(title);
    const cleanTitle = title.replace(/^[^\w]*/u, "").replace(/^[\p{Emoji}\p{Emoji_Component}\s]*/u, "").trim();
    sections.push({ type, title: cleanTitle, body });
  }

  return sections;
}

const markdownPlugins = [remarkGfm];

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 20); // Adjust speed here

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
    >
      <ReactMarkdown remarkPlugins={markdownPlugins} components={markdownComponents}>{displayText}</ReactMarkdown>
      {!isComplete && <span className="animate-pulse">|</span>}
    </motion.div>
  );
};

/* Premium table components for ReactMarkdown */
const markdownComponents = {
  table: ({ children, ...props }: any) => (
    <div className="my-4 rounded-xl overflow-hidden shadow-lg border-2 border-primary/20 dark:border-primary/30">
      {/* Gradient top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500" />
      <table
        className="w-full text-sm border-collapse"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead
      className="bg-gradient-to-r from-primary/15 via-primary/10 to-violet-500/10 dark:from-primary/25 dark:via-primary/15 dark:to-violet-500/15"
      {...props}
    >
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="px-4 py-3 text-left font-bold text-xs uppercase tracking-widest text-primary dark:text-primary border-b-2 border-primary/20 dark:border-primary/30 first:rounded-tl-none last:rounded-tr-none"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="px-4 py-3 text-foreground/90 border-b border-border/60 dark:border-border/40"
      {...props}
    >
      {children}
    </td>
  ),
  tr: ({ children, ...props }: any) => (
    <tr
      className="transition-colors duration-200 hover:bg-primary/5 dark:hover:bg-primary/10 even:bg-muted/30 dark:even:bg-muted/20"
      {...props}
    >
      {children}
    </tr>
  ),
};

const SectionBox = ({ section, index }: { section: Section; index: number }) => {
  const { t } = useTranslation();
  const meta = sectionMeta[section.type];
  const Icon = meta.icon;

  if (section.type === "video" && section.videoUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: index * 0.15,
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
        className={`rounded-xl border-2 ${meta.border} overflow-hidden`}
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.1 }}
          className={`${meta.headerBg} px-4 py-2.5 flex items-center gap-2 border-b ${meta.border}`}
        >
          <Icon className={`h-4 w-4 ${meta.iconColor} shrink-0`} />
          <h3 className={`font-semibold text-sm ${meta.iconColor} font-[Space_Grotesk]`}>
            {section.title}
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.3 }}
          className={`${meta.bg} p-4`}
        >
          <div className="prose prose-sm max-w-none dark:prose-invert text-foreground/90 mb-3">
            <Typewriter text={section.body} delay={index * 150 + 300} />
            <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
              🎁 Completely FREE • Daily limit: 10 videos
            </div>
          </div>
          <div className="relative">
            <video
              controls
              className="w-full h-auto rounded-lg"
              preload="metadata"
            >
              <source src={section.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: index * 0.15 + 1, duration: 0.8 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"
            />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const isQuiz = section.type === "quiz";

  const getAnimationVariants = () => {
    switch (section.type) {
      case "quiz":
        return {
          initial: { opacity: 0, scale: 0.8, rotateY: -90 },
          animate: { opacity: 1, scale: 1, rotateY: 0 },
          transition: { delay: index * 0.15, type: "spring", stiffness: 200, damping: 20 }
        };
      case "example":
        return {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: index * 0.15, type: "spring", stiffness: 300 }
        };
      case "takeaway":
        return {
          initial: { opacity: 0, scale: 0.9, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { delay: index * 0.15, type: "spring", stiffness: 250 }
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.95, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { delay: index * 0.15, type: "spring", stiffness: 300, damping: 25 }
        };
    }
  };

  const animation = getAnimationVariants();

  return (
    <motion.div
      {...animation}
      className={`rounded-xl border-2 ${meta.border} overflow-hidden`}
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.1 }}
        className={`${meta.headerBg} px-4 py-2.5 flex items-center gap-2 border-b ${meta.border}`}
      >
        <Icon className={`h-4 w-4 ${meta.iconColor} shrink-0`} />
        <h3 className={`font-semibold text-sm ${meta.iconColor} font-[Space_Grotesk]`}>
          {section.title || meta.label}
        </h3>
        {isQuiz && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
            className="ml-auto text-[10px] font-bold uppercase tracking-widest text-pink-500 dark:text-pink-400 bg-pink-500/10 dark:bg-pink-400/10 px-2 py-0.5 rounded-full"
          >
            {t("message.testYourself")}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.3 }}
        className={`${meta.bg} px-4 py-3`}
      >
        <div className="prose prose-sm max-w-none dark:prose-invert text-foreground/90">
          <Typewriter text={section.body} delay={index * 150 + 300} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ChatMessage = ({ role, content, accentHsl, videoUrl, imageUrl, voiceText, attachments, isStreaming, onEdit }: ChatMessageProps) => {
  const { t } = useTranslation();
  const isBot = role === "assistant";
  const [isEditing, setIsEditing] = useState(false);
  const [draftMessage, setDraftMessage] = useState(content);
  const [canParseSections, setCanParseSections] = useState(false);
  const [translatedContent, setTranslatedContent] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    setDraftMessage(content);
    setTranslatedContent("");
    setShowOriginal(false);
  }, [content]);

  useEffect(() => {
    if (!isStreaming && isBot) {
      const timer = setTimeout(() => setCanParseSections(true), 300); // Small delay to ensure content is stable
      return () => clearTimeout(timer);
    } else {
      setCanParseSections(false);
    }
  }, [isStreaming, isBot]);

  const displayContent = showOriginal || !translatedContent ? content : translatedContent;
  let sections = !translatedContent && canParseSections ? parseSections(content) : null;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playVoice = () => {
    const textToSpeak = voiceText?.trim() || content.trim();
    if (!textToSpeak || !speechSupported || typeof window === "undefined") return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopVoice = () => {
    if (typeof window === "undefined" || !speechSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const renderAttachmentList = () => {
    if (!attachments?.length) return null;

    return (
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t("message.attachedFiles")}
        </div>
        <div className="grid gap-3">
          {attachments.map((file, index) => (
            <div key={index} className="rounded-2xl border border-border bg-background p-3">
              <div className="flex items-center gap-3">
                {file.isImage ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Paperclip className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.type || t("message.document")} · {Math.round(file.size / 1024)} KB
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSpeechButton = () => (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={playVoice}
          disabled={!speechSupported || isSpeaking}
        >
          <Volume2 className="h-4 w-4" />
          {voiceText ? t("message.playPronunciation") : t("message.readAloud")}
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={stopVoice}
          disabled={!speechSupported || !isSpeaking}
        >
          <VolumeX className="h-4 w-4" />
          {t("message.stop")}
        </Button>
        <TranslateButton text={content} onTranslated={(text) => {
          setTranslatedContent(text);
          setShowOriginal(false);
        }} />
        {translatedContent && (
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowOriginal((prev) => !prev)}
          >
            {showOriginal ? t("message.showTranslated") : t("message.showOriginal")}
          </Button>
        )}
      </div>
      {!speechSupported && (
        <p className="text-xs text-muted-foreground">{t("message.noSpeechSupport")}</p>
      )}
    </div>
  );

  // Add video section if videoUrl exists
  if (isBot && videoUrl) {
    const videoSection: Section = {
      type: "video",
      title: "Video Explanation",
      body: "Watch this AI-generated video to see the concept in action!",
      videoUrl,
    };
    sections = sections ? [...sections, videoSection] : [videoSection];
  }

  const messageAnimation = isBot
    ? { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } };

  const renderEditControls = () => {
    if (isBot || !onEdit) return null;

    if (isEditing) {
      return (
        <div className="flex gap-2 mt-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            {t("chat.cancel")}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const trimmed = draftMessage.trim();
              if (trimmed) {
                onEdit(trimmed);
              }
              setIsEditing(false);
            }}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            {t("chat.save")}
          </Button>
        </div>
      );
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditing(true)}
        title={t("chat.editQuery")}
        className="ml-auto"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    );
  };

  return (
    <motion.div
      {...messageAnimation}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white shadow-md mt-1"
          style={{ backgroundColor: `hsl(${accentHsl})` }}
        >
          <motion.div
            animate={sections ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, delay: 0.5, repeat: sections ? 1 : 0 }}
          >
            <Bot className="h-4 w-4" />
          </motion.div>
        </motion.div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isBot
            ? "bg-card text-card-foreground border border-border rounded-tl-md"
            : "text-white rounded-tr-md"
        }`}
        style={!isBot ? { backgroundColor: `hsl(${accentHsl})` } : undefined}
      >
        {isBot && isStreaming ? (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={markdownPlugins} components={markdownComponents}>
              {content}
            </ReactMarkdown>
          </div>
        ) : isBot && sections ? (
          <div className="space-y-3">
            {sections.map((sec, i) => (
              <SectionBox key={i} section={sec} index={i} />
            ))}
            {renderAttachmentList()}
            {imageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="rounded-2xl overflow-hidden border border-border bg-card"
              >
                <img
                  src={imageUrl}
                  alt={t("message.aiGeneratedImageAlt")}
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 text-sm text-muted-foreground text-center">
                  {t("message.aiGeneratedImage")}
                </div>
              </motion.div>
            )}
            {!isStreaming && renderSpeechButton()}
          </div>
        ) : isBot ? (
          <div className="space-y-3">
            {translatedContent && !showOriginal && (
              <div className="rounded-2xl px-3 py-2 bg-muted text-muted-foreground text-xs">
                {t("message.translatedResponse")}
              </div>
            )}
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <Typewriter text={displayContent} delay={0} />
            </div>
            {renderAttachmentList()}
            {imageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="rounded-2xl overflow-hidden border border-border bg-card"
              >
                <img
                  src={imageUrl}
                  alt={t("message.aiGeneratedImageAlt")}
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 text-sm text-muted-foreground text-center">
                  {t("message.aiGeneratedImage")}
                </div>
              </motion.div>
            )}
            {!isStreaming && renderSpeechButton()}
          </div>
        ) : (
          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={draftMessage}
                  onChange={(e) => setDraftMessage(e.target.value)}
                  className="min-h-[100px]"
                  rows={4}
                />
                {renderEditControls()}
              </div>
            ) : (
              <>
                <p>{content}</p>
                {renderAttachmentList()}
                {renderEditControls()}
              </>
            )}
          </div>
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
