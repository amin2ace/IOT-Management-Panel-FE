import { Role } from "../enums/RoleEnum";

export type ResponseSignupDto = {
  userId: string;
  username: string;
  roles: Role[];
};
