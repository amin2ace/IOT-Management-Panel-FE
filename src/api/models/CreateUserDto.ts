/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from "./Role";
export type CreateUserDto = {
  username: string;
  email: string;
  password: string;
  /**
   * User role for RBAC
   */
  roles: Array<Role>;
};
