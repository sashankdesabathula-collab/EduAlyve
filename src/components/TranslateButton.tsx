import { useState } from "react";
import { Languages, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "@/contexts/TranslationContext";

const indianLanguages = [
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
  { code: "mai", name: "Maithili", native: "मैथिली" },
  { code: "bho", name: "Bhojpuri", native: "भोजपुरी" },
  { code: "raj", name: "Rajasthani", native: "राजस्थानी" },
  { code: "doi", name: "Dogri", native: "डोगरी" },
  { code: "mni", name: "Manipuri", native: "মৈতৈলোন্" },
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "kok", name: "Konkani", native: "कोंकणी" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
];

interface TranslationPanelProps {
  text: string;
  onClose: () => void;
  onTranslated?: (translatedText: string) => void;
}

export function TranslationPanel({ text, onClose, onTranslated }: TranslationPanelProps) {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async (targetLang: string) => {
    if (!text.trim() || !targetLang) return;

    setIsTranslating(true);
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );

      if (response.ok) {
        const data = await response.json();
        const translated = data[0][0][0];
        setTranslatedText(translated);
        if (onTranslated) {
          onTranslated(translated);
        }
      } else {
        setTranslatedText(t("translate.failure"));
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText(t("translate.failure"));
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    translateText(langCode);
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Languages className="h-4 w-4" />
          {t("translate.title")}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            {t("translate.selectLanguage")}
          </label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder={t("translate.chooseLanguage")} />
            </SelectTrigger>
            <SelectContent>
              {indianLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name} ({lang.native})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedLanguage && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t("translate.originalText")}
            </label>
            <div className="text-sm p-2 bg-muted rounded border min-h-[40px]">
              {text}
            </div>
          </div>
        )}

        {isTranslating && (
          <div className="text-sm text-muted-foreground">{t("translate.translating")}</div>
        )}

        {translatedText && !isTranslating && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t("translate.translatedText")}
            </label>
            <div className="text-sm p-2 bg-muted rounded border min-h-[40px]">
              {translatedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface TranslateButtonProps {
  text: string;
  className?: string;
  onTranslated?: (translatedText: string) => void;
}

export function TranslateButton({ text, className, onTranslated }: TranslateButtonProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  if (!text.trim()) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${className}`}
          title={t("translate.title")}
        >
          <Languages className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top">
        <TranslationPanel text={text} onClose={() => setIsOpen(false)} onTranslated={onTranslated} />
      </PopoverContent>
    </Popover>
  );
}