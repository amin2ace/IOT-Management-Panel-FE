import { useState } from "react";
import { SignupInputDto } from "@/api";
import { useSignup } from "@/hooks/useSignup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, User, Lock, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import AuthCard from "@/components/Auth/AuthCard";
import { TextField } from "@/components/UI/FormFields";

export function SignupPage() {
  const signupMutation = useSignup();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setConfirmError(t("auth.passwordMismatch", "Passwords do not match"));
      return;
    }
    setConfirmError(null);

    const payload: SignupInputDto = {
      email: String(form.get("email") ?? ""),
      password,
      username: String(form.get("username") ?? ""),
    };

    try {
      await signupMutation.mutateAsync(payload);
      navigate("/dashboard", { replace: true });
      toast.success(t("auth.signupSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("auth.signupFailed"));
    }
  };

  return (
    <AuthCard
      title={t("auth.createAccount")}
      footer={
        <>
          {t("auth.alreadyHaveAccount")}{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {t("auth.login")}
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
          name="username"
          type="text"
          label={t("auth.username")}
          icon={User}
          required
          autoComplete="username"
        />

        <TextField
          name="password"
          type={showPassword ? "text" : "password"}
          label={t("auth.password")}
          icon={Lock}
          required
          autoComplete="new-password"
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

        <TextField
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          label={t("auth.confirmPassword", "Confirm password")}
          icon={Lock}
          required
          autoComplete="new-password"
          error={confirmError ?? undefined}
          onChange={() => confirmError && setConfirmError(null)}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-gray-400 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label={
                showConfirm
                  ? t("common.hide", "Hide password")
                  : t("common.show", "Show password")
              }
              tabIndex={-1}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        <motion.button
          type="submit"
          disabled={signupMutation.isPending}
          whileHover={!signupMutation.isPending ? { y: -1 } : undefined}
          whileTap={!signupMutation.isPending ? { scale: 0.98 } : undefined}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {signupMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          {signupMutation.isPending
            ? t("common.creatingAccount", "Creating account...")
            : t("auth.signup")}
        </motion.button>
      </form>
    </AuthCard>
  );
}
