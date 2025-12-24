/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import { Role } from "../enums/RoleEnum";

/* eslint-disable */
export type UserResponseDto = {
  /**
   * Unique user identifier
   */
  userId: string;
  /**
   * User email address
   */
  email: string;
  /**
   * User display name
   */
  username: string;
  /**
   * User first name
   */
  firstName?: string;
  /**
   * User last name
   */
  lastName?: string;
  /**
   * Profile photo URL
   */
  photoUrl?: string;
  /**
   * User active status
   */
  isActive: boolean;
  /**
   * User roles for RBAC
   */
  roles: Role[];
  /**
   * User registration date
   */
  createdAt: string;
  /**
   * Last profile update date
   */
  updatedAt: string;
};
