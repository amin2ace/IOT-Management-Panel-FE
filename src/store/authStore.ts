import create from "zustand";

type User = { id: string; username: string; roles: string[] } | null;

export const useAuthStore = create<{
  user: User;
  setUser: (u: User) => void;
  clear: () => void;
}>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  clear: () => set({ user: null }),
}));
