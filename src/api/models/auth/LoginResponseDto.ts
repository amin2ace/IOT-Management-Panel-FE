import { Role } from "../enums/RoleEnum";

export type LoginResponseDto = {
  userId: string;
  username: string;
  roles: Role[];
};
