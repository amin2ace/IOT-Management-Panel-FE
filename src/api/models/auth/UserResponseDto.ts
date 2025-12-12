/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
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
  roles: Array<"viewer" | "test" | "engineer" | "admin" | "super-admin">;
  /**
   * User registration date
   */
  createdAt: string;
  /**
   * Last profile update date
   */
  updatedAt: string;
};
