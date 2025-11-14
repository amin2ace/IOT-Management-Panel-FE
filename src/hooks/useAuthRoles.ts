import { useAuth } from "@/context/useAuth";
export function useHasRole(role: string) {
  const { user } = useAuth();
  return !!user && user.role === role;
}
