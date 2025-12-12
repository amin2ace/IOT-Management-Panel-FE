/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUserDto = {
  username: string;
  email: string;
  password: string;
  /**
   * User role for RBAC
   */
  roles: Array<any[]>;
  /**
   * User first name
   */
  firstName?: string;
  /**
   * User last name
   */
  lastName?: string;
};
