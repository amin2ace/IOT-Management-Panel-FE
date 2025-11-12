import api from "@/api/axios";
import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ check successful login
      if (response.status === 200) {
        navigate("/dashboard"); // redirect to dashboard
      } else {
        setError("Login failed. Please check your credentials.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-200">
          Login
        </h2>

        {error && (
          <div className="text-red-400 bg-red-900/30 p-2 rounded mb-3">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
