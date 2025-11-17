// import { createContext, useContext } from "react";
// import { AuthContextValue } from "./AuthContext";
// import { UserResponseDto } from "@/api";

// interface AuthContextType {
//   user: UserResponseDto | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (username: string, email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export function useAuth(): AuthContextValue {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }
