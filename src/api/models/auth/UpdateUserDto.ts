/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
  /**
   * User display name (3-20 characters)
   */
  username?: string;
  /**
   * User email address
   */
  email?: string;
  /**
   * User password (min 8 characters)
   */
  password?: string;
  /**
   * User first name (2-50 characters)
   */
  firstName?: string;
  /**
   * User last name (2-50 characters)
   */
  lastName?: string;
  /**
   * Profile photo URL
   */
  photoUrl?: string;
  /**
   * User roles for RBAC
   */
  roles?: Array<any[]>;
};
