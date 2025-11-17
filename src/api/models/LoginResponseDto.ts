import { Role } from "./Role";

export type LoginResponseDto = {
  userId: string;
  username: string;
  roles: Role[];
};
