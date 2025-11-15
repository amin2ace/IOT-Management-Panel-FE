// src/pages/Auth/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginInputDto } from "@/api";
import { useLogin } from "@/hooks/useLogin";

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
    } catch (err) {
      console.error(err);
      alert(t("Login failed"));
    }
  };

  return (
    <div className="auth-page-bg">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">
          {t("login")}
        </h2>

        <input
          name="email"
          type="email"
          placeholder={t("email")}
          required
          className="form-input"
        />

        <input
          name="password"
          type="password"
          placeholder={t("password")}
          required
          className="form-input"
        />

        <button type="submit" className="form-submit">
          {loginMutation.isPending ? "Signing in..." : t("login")}
        </button>
        <p className="text-center text-sm text-gray-400 p-4">
          {t("dontHaveAccount")}{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {t("signUp")}
          </button>
        </p>
      </form>
    </div>
  );
}
