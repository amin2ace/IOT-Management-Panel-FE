import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationService, loginInputDto, UserResponseDto } from "@/api";

export interface AuthContextValue {
  user: UserResponseDto | null;
  loading: boolean;
  login: (payload: loginInputDto) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: UserResponseDto | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage at startup
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (payload: loginInputDto) => {
    const res = await AuthenticationService.authControllerLogin(payload);
    const userData = res.data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await AuthenticationService.authControllerLogout();
    } catch {}
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
