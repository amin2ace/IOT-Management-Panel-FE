import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { loginInputDto } from "@/api";
import { useLogin } from "@/hooks/useLogin";
import toast from "react-hot-toast";
import AuthCard from "@/components/Auth/AuthCard";
import { TextField } from "@/components/UI/FormFields";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const payload: loginInputDto = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    try {
      await loginMutation.mutateAsync(payload);
      navigate("/dashboard", { replace: true, viewTransition: true });
      toast.success(t("auth.loginSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("auth.loginFailed"));
    }
  };

  return (
    <AuthCard
      title={t("auth.login")}
      footer={
        <>
          {t("auth.dontHaveAccount")}{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t("auth.signup")}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <TextField
          name="email"
          type="email"
          label={t("auth.email")}
          icon={Mail}
          required
          autoComplete="email"
        />

        <TextField
          name="password"
          type={showPassword ? "text" : "password"}
          label={t("auth.password")}
          icon={Lock}
          required
          autoComplete="current-password"
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-gray-400 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label={
                showPassword
                  ? t("common.hide", "Hide password")
                  : t("common.show", "Show password")
              }
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        <motion.button
          type="submit"
          disabled={loginMutation.isPending}
          whileHover={!loginMutation.isPending ? { y: -1 } : undefined}
          whileTap={!loginMutation.isPending ? { scale: 0.98 } : undefined}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {loginMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {loginMutation.isPending
            ? t("common.signingIn", "Signing in...")
            : t("auth.login")}
        </motion.button>
      </form>
    </AuthCard>
  );
}
