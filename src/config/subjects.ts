import {
  BookOpen,
  Languages,
  Calculator,
  FlaskConical,
  Globe,
  MessageSquare,
  Lightbulb,
} from "lucide-react";

export type SubjectSlug =
  | "english"
  | "hindi"
  | "math"
  | "science"
  | "social"
  | "language";

export interface SubjectConfig {
  slug: SubjectSlug;
  name: string;
  tagline: string;
  icon: typeof BookOpen;
  gradient: string;
  accentHsl: string; // for inline style
  bgClass: string;
}

export const subjects: SubjectConfig[] = [
  {
    slug: "english",
    name: "subjects.english.name",
    tagline: "subjects.english.tagline",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-700",
    accentHsl: "217 91% 60%",
    bgClass: "bg-blue-500",
  },
  {
    slug: "hindi",
    name: "subjects.hindi.name",
    tagline: "subjects.hindi.tagline",
    icon: Languages,
    gradient: "from-orange-400 to-orange-600",
    accentHsl: "25 95% 53%",
    bgClass: "bg-orange-500",
  },
  {
    slug: "math",
    name: "subjects.math.name",
    tagline: "subjects.math.tagline",
    icon: Calculator,
    gradient: "from-emerald-400 to-emerald-600",
    accentHsl: "142 71% 45%",
    bgClass: "bg-emerald-500",
  },
  {
    slug: "science",
    name: "subjects.science.name",
    tagline: "subjects.science.tagline",
    icon: FlaskConical,
    gradient: "from-violet-500 to-violet-700",
    accentHsl: "258 90% 66%",
    bgClass: "bg-violet-500",
  },
  {
    slug: "social",
    name: "subjects.social.name",
    tagline: "subjects.social.tagline",
    icon: Globe,
    gradient: "from-amber-400 to-amber-600",
    accentHsl: "38 92% 50%",
    bgClass: "bg-amber-500",
  },
  {
    slug: "language",
    name: "subjects.language.name",
    tagline: "subjects.language.tagline",
    icon: MessageSquare,
    gradient: "from-teal-400 to-teal-600",
    accentHsl: "173 80% 40%",
    bgClass: "bg-teal-500",
  },
];

export const regionalLanguages = [
  "Tamil",
  "Kannada",
  "Telugu",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Odia",
  "Assamese",
  "Urdu",
];

export function getSubject(slug: string): SubjectConfig | undefined {
  return subjects.find((s) => s.slug === slug);
}
