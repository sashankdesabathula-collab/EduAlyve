import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, History } from "lucide-react";
import edualyveLogo from "@/assets/edualyve-logo.jpeg";
import { subjects } from "@/config/subjects";
import SubjectCard from "@/components/SubjectCard";
import LanguageSelector from "@/components/LanguageSelector";
import ChatHistory from "@/components/ChatHistory";
import ThemeToggle from "@/components/ThemeToggle";
import GlobalLanguageSelector from "@/components/GlobalLanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/TranslationContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleSubjectClick = (slug: string) => {
    if (slug === "language") {
      setLangOpen(true);
    } else {
      navigate(`/chat/${slug}`);
    }
  };

  const handleLanguageSelect = (lang: string) => {
    setLangOpen(false);
    navigate(`/chat/language?lang=${encodeURIComponent(lang)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={edualyveLogo} alt={t("app.name")} className="h-10 w-10 rounded-xl shadow-md object-cover" />
            <div>
              <h1 className="text-xl font-bold font-[Space_Grotesk] text-foreground tracking-tight">
                {t("app.name")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("app.creator")}
              </p>
              {user && (
                <p className="text-xs text-muted-foreground">Hi, {user.name} 👋</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" title={t("nav.chatHistory")}>
                  <History className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-[Space_Grotesk]">{t("nav.chatHistory")}</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ChatHistory onNavigate={() => setHistoryOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <GlobalLanguageSelector />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title={t("nav.logout")}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold font-[Space_Grotesk] text-foreground"
        >
          {t("index.welcome")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {t("index.subtitle")}
        </motion.p>
      </div>

      {/* Subject Grid */}
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {subjects.map((subject, i) => (
            <SubjectCard
              key={subject.slug}
              subject={subject}
              index={i}
              onClick={() => handleSubjectClick(subject.slug)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-16">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t("app.creator")}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("index.footer")}
            </p>
          </div>
        </div>
      </footer>

      <LanguageSelector
        open={langOpen}
        onClose={() => setLangOpen(false)}
        onSelect={handleLanguageSelect}
      />
    </div>
  );
};

export default Index;
