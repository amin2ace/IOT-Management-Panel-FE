import { Role } from "../enums/RoleEnum";

export type SignupResponseDto = {
  userId: string;
  username: string;
  roles: Role[];
};
