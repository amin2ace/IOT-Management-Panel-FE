// src/pages/Auth/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/useAuth";
import { loginInputDto } from "@/api";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const payload: loginInputDto = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    try {
      const res = await loginMutation.mutateAsync(payload);
      // If backend returns user object
      const user = res.data ?? null;
      if (user) setUser(user);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 to-gray-800 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">
          {t("login")}
        </h2>

        <label className="block mb-2 text-sm">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-2 rounded bg-gray-700 mb-4"
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          name="password"
          type="password"
          required
          className="w-full p-2 rounded bg-gray-700 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 py-2 rounded font-semibold"
        >
          {loginMutation.isPending ? "Signing in..." : t("login")}
        </button>
      </form>
    </div>
  );
}
