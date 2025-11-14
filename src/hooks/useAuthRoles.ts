import { Role } from "@/api";
import { useAuth } from "@/context/useAuth";
export function useHasRole(role: Role) {
  const { user } = useAuth();
  return !!user && user.roles.includes(role);
}
