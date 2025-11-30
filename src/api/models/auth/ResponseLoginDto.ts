import { Role } from "../enums/RoleEnum";

export type ResponseLoginDto = {
  userId: string;
  username: string;
  roles: Role[];
};
