import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Trash2 } from "lucide-react";
import { subjects, getSubject } from "@/config/subjects";
import { Button } from "@/components/ui/button";

interface ChatEntry {
  subject: string;
  languageName?: string;
  preview: string;
  messageCount: number;
  storageKey: string;
}

function getChatHistory(): ChatEntry[] {
  const entries: ChatEntry[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("edualyve_chat_")) continue;
    try {
      const messages = JSON.parse(localStorage.getItem(key) || "[]");
      if (!messages.length) continue;

      const parts = key.replace("edualyve_chat_", "").split("_");
      const subject = parts[0];
      const languageName = parts.length > 1 ? parts.slice(1).join("_") : undefined;

      const firstUserMsg = messages.find((m: { role: string }) => m.role === "user");
      const preview = firstUserMsg?.content?.slice(0, 80) || "Chat started";

      entries.push({
        subject,
        languageName,
        preview,
        messageCount: messages.length,
        storageKey: key,
      });
    } catch {}
  }
  return entries;
}

interface ChatHistoryProps {
  onNavigate?: () => void;
}

const ChatHistory = ({ onNavigate }: ChatHistoryProps) => {
  const navigate = useNavigate();
  const history = useMemo(() => getChatHistory(), []);

  const handleClick = (entry: ChatEntry) => {
    const params = entry.languageName ? `?lang=${encodeURIComponent(entry.languageName)}` : "";
    navigate(`/chat/${entry.subject}${params}`);
    onNavigate?.();
  };

  const handleDelete = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem(key);
    window.location.reload();
  };

  if (!history.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
        <p className="text-sm">No chat history yet</p>
        <p className="text-xs mt-1">Start a conversation to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((entry, i) => {
        const subjectConfig = getSubject(entry.subject);
        const displayName = entry.languageName || subjectConfig?.name || entry.subject;
        const Icon = subjectConfig?.icon || MessageSquare;

        return (
          <motion.div
            key={entry.storageKey}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleClick(entry)}
            className="group flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm cursor-pointer transition-all"
          >
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: subjectConfig ? `hsl(${subjectConfig.accentHsl})` : "hsl(220 70% 50%)" }}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{entry.preview}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{entry.messageCount} msgs</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                onClick={(e) => handleDelete(entry.storageKey, e)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ChatHistory;
