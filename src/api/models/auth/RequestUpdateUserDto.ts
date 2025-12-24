/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from "../enums/RoleEnum";
export type RequestUpdateUserDto = {
  /**
   * Username must be unique and 3-20 characters
   * @pattern ^[a-zA-Z0-9_]{3,20}$
   */
  username?: string;

  /**
   * First name (2-50 characters)
   * @minLength 2
   * @maxLength 50
   */
  firstName?: string;

  /**
   * Last name (2-50 characters)
   * @minLength 2
   * @maxLength 50
   */
  lastName?: string;

  /**
   * Valid URL for profile photo
   * @format uri
   */
  photoUrl?: string;

  /**
   * User roles for RBAC
   * @minItems 1
   */
  roles?: Array<Role>;
};
