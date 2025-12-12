import { Role } from "../enums/RoleEnum";

export type ResponseAuditDto = {
  userId: string;
  username: string;
  roles: Role[];
};
