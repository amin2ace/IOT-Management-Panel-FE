import { Role } from "@/api";
import { useAuth } from "@/context/AuthContext";
export function useHasRole(role: Role) {
  const { user } = useAuth();
  return !!user && user.roles.includes(role);
}
