/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Role } from "../enums/RoleEnum";
export type RequestGetUserDto = {
  userId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  isActive: boolean;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
};
