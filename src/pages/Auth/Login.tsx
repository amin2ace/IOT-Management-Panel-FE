// src/pages/Auth/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginInputDto } from "@/api";
import { useLogin } from "@/hooks/useLogin";
import toast from "react-hot-toast";
import DashboardHeader from "@/components/DashboardHeader";

// Componenet: Login Page 'READ_ONLY', 'The function name for component MUST start with uppercase'
export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const payload: loginInputDto = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    try {
      await loginMutation.mutateAsync(payload);
      // If backend returns user object
      // const user = res.data ?? null;
      // if (user) setUser(user);
      navigate("/dashboard", { replace: true, viewTransition: true });
      toast.success(t("auth.loginSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("auth.loginFailed"));
    }
  };

  return (
    <div>
      <div>
        <DashboardHeader showProfile={false} />
      </div>
      <div className="auth-page-bg">
        {/* <DashboardHeader showProfile={false} /> */}

        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-950 dark:text-indigo-100">
            {t("auth.login")}
          </h2>

          <input
            name="email"
            type="email"
            placeholder={t("auth.email")}
            required
            className="form-input"
          />

          <input
            name="password"
            type="password"
            placeholder={t("auth.password")}
            required
            className="form-input"
          />

          <button type="submit" className="form-submit">
            {loginMutation.isPending ? "Signing in..." : t("auth.login")}
          </button>
          <p className="text-center text-sm text-indigo-950 dark:text-indigo-100 p-4">
            {t("auth.dontHaveAccount")}{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 font-medium"
            >
              {t("auth.signup")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
