import { SignupInputDto } from "@/api";
import DashboardHeader from "@/components/DashboardHeader";
import { useSignup } from "@/hooks/useSignup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Component: Signup
export function SignupPage() {
  const signupMutation = useSignup();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
      await signupMutation.mutateAsync(payload);
      // If backend returns user object
      // const user = res.data ?? null;
      // if (user) setUser(user);
      navigate("/dashboard", { replace: true });
      toast.success(t("signupSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("signupFailed"));
    }
  };

  return (
    <div>
      <div>
        <DashboardHeader showProfile={false} />
      </div>

      <div className="auth-page-bg">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="text-2xl font-bold mb-6 text-center text-indigo-950 dark:text-indigo-100">
            {t("createAccount")}
          </h1>

          <input
            name="email"
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />

          <input
            name="username"
            type="username"
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />

          <input
            name="password"
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />

          <button type="submit" className="form-submit">
            {t("signup")}
          </button>

          <p className="text-center text-sm text-indigo-950 dark:text-indigo-100 p-4">
            {t("alreadyHaveAccount")}{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="cursor-pointer text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 font-medium"
            >
              {t("login")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
