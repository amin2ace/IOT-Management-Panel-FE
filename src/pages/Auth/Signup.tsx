import { SignupInputDto } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useSignup } from "@/hooks/useSignup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Component: Signup
export function SignupPage() {
  const signupMutation = useSignup();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const payload: SignupInputDto = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      username: String(form.get("username") ?? ""),
    };
    try {
      const res = await signupMutation.mutateAsync(payload);
      // If backend returns user object
      const user = res.data ?? null;
      if (user) setUser(user);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-br from-slate-200 to-slate-400 dark:from-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <input
          type="email"
          placeholder={t("Email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />

        <input
          type="username"
          placeholder={t("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />

        <input
          type="password"
          placeholder={t("Password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />

        <button
          type="submit"
          className="w-full py-2 bg-primary-700 text-white rounded hover:bg-primary-500"
        >
          {t("Signup")}
        </button>
      </form>
    </div>
  );
}
