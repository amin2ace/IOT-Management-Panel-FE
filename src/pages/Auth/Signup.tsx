import { useAuth } from "@/context/useAuth";
import { useSignup } from "@/hooks/useSignup";
import { useState } from "react";

export function Signup() {
  const { signup } = useSignup();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password, username);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-br from-slate-200 to-slate-400 dark:from-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />

        <input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />

        <button
          type="submit"
          className="w-full py-2 bg-primary-700 text-white rounded hover:bg-primary-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
