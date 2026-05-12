import { regionalLanguages } from "@/config/subjects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "@/contexts/TranslationContext";

interface LanguageSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (lang: string) => void;
}

const LanguageSelector = ({ open, onClose, onSelect }: LanguageSelectorProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[Space_Grotesk] text-xl">
            {t("language.select")}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {regionalLanguages.map((lang, i) => (
            <motion.div
              key={lang}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-base h-12 hover:bg-teal-50 hover:border-teal-400 hover:text-teal-700 transition-colors"
                onClick={() => onSelect(lang)}
              >
                {lang}
              </Button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelector;
