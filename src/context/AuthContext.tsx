import React from "react";
import {  useState, useEffect, ReactNode } from "react";
import { authApi } from "@/api/authApi";
import Cookies from "js-cookie";
import { AuthContext, User } from "./useAuth";



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("refreshToken");
    if (token) {
      authApi.refresh().then((res) => setUser(res.data.user)).catch(() => setUser(null));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    Cookies.set("refreshToken", res.data.refreshToken);
    setUser(res.data.user);
  };

  const signup = async (username: string, email: string, password: string) => {
    const res = await authApi.signup({ username, email, password });
    Cookies.set("refreshToken", res.data.refreshToken);
    setUser(res.data.user);
  };

  const logout = async () => {
    await authApi.logout();
    Cookies.remove("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
