import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { authApi } from "../api/authApi";

export function useAuthBootstrap() {
  const setUser = useAuthStore((s) => s.setUser);
  useEffect(() => {
    (async () => {
      try {
        const res = await authApi.refresh();
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    })();
  }, []);
}
