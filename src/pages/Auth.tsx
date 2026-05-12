import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import edualyveLogo from "@/assets/edualyve-logo.jpeg";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/TranslationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalLanguageSelector from "@/components/GlobalLanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountNotFound, setAccountNotFound] = useState(false);
  const { login, signup } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError(t("auth.missingCredentials"));
      setAccountNotFound(false);
      setIsLoading(false);
      return;
    }

    // First try to login
    let err = login(email, password);

    // If login fails and no name provided, ask for name
    if (err && !name.trim()) {
      setAccountNotFound(true);
      setIsLoading(false);
      return;
    }

    setAccountNotFound(false);

    // If login fails but name is provided, try to create account
    if (err && name.trim()) {
      err = signup(name, email, password);
    }

    if (err) {
      setError(err);
      setIsLoading(false);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <GlobalLanguageSelector />
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={edualyveLogo} alt={t("app.name")} className="mx-auto h-16 w-16 rounded-2xl shadow-lg mb-4 object-cover" />
            <h1 className="text-3xl font-bold font-[Space_Grotesk] text-foreground">
              {t("app.name")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("app.tagline")}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold font-[Space_Grotesk] text-foreground mb-6 text-center">
              {t("auth.welcome")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {accountNotFound && (
                <div className="space-y-2">
                  <Label htmlFor="name">{t("auth.fullName")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("auth.enterName")}
                    className="rounded-xl"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    className="rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && !accountNotFound && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}

              {accountNotFound && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                    {t("auth.accountNotFound")}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full rounded-xl h-11 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? t("auth.creatingAccount") : t("auth.continue")}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                {t("auth.helpText")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          {t("app.creator")}
        </p>
      </div>
    </div>
  );
};

export default Auth;
