/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { Role } from "./Role";
export type UserResponseDto = {
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
