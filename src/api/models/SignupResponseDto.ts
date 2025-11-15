import { Role } from "./Role";

export type SignupResponseDto = {
  userId: string;
  username: string;
  roles: Role[];
};
