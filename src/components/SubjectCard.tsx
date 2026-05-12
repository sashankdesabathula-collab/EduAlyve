import { motion } from "framer-motion";
import { useTranslation } from "@/contexts/TranslationContext";
import type { SubjectConfig } from "@/config/subjects";

interface SubjectCardProps {
  subject: SubjectConfig;
  onClick: () => void;
  index: number;
}

const SubjectCard = ({ subject, onClick, index }: SubjectCardProps) => {
  const { t } = useTranslation();
  const Icon = subject.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${subject.gradient} p-6 text-left text-white shadow-lg transition-shadow hover:shadow-2xl aspect-[4/3] flex flex-col justify-between group`}
    >
      {/* decorative circle */}
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-700" />

      <Icon className="h-10 w-10 drop-shadow-md" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold font-[Space_Grotesk]">{t(subject.name as keyof import("@/contexts/TranslationContext").TranslationData)}</h3>
      </div>
    </motion.button>
  );
};

export default SubjectCard;
