import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationService, loginInputDto, SignupInputDto } from "@/api";
import { ResponseLoginDto } from "@/api/models/auth/ResponseLoginDto";
import { ResponseSignupDto } from "@/api/models/auth/ResponseSignupDto";

export interface AuthContextValue {
  user: ResponseLoginDto | ResponseSignupDto | null;
  loading: boolean;
  login: (payload: loginInputDto) => Promise<void>;
  signup: (payload: SignupInputDto) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: ResponseLoginDto | ResponseSignupDto | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ResponseLoginDto | ResponseSignupDto | null>(
    null
  );
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
    const userData = await AuthenticationService.authControllerLogin(payload);
    setUser(userData);
    console.log({ userData });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signup = async (payload: SignupInputDto) => {
    const userData = await AuthenticationService.authControllerSignup(payload);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await AuthenticationService.authControllerLogout();
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
