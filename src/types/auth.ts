export type Role = "SUPER_USER" | "ADMIN" | "OPERATOR" | "VIEWER" | "TEST";
export interface User {
  id: string;
  username: string;
  email?: string;
  roles: Role[];
}
