/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RequestAssignRolesDto } from "../models/auth/RequestAssignRolesDto";
import type { RequestCreateUserDto } from "../models/auth/RequestCreateUserDto";
import type { RequestUpdateUserDto } from "../models/auth/RequestUpdateUserDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { UserResponseDto } from "../models/auth/UserResponseDto";
export class UsersService {
  public static usersControllerGetUserProfile(): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/profile",
      errors: {
        404: `User not found`,
      },
    });
  }

  /**
   * Update user details
   * @param id
   * @param requestBody
   * @returns UserResponseDto User updated successfully
   * @throws ApiError
   */
  public static usersControllerUpdateUserProfile(
    requestBody: RequestUpdateUserDto
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/users/{id}",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `User not found`,
      },
    });
  }

  /**
   * Upload profile photo for the authenticated user
   * @param fileData FormData containing the photo file
   * @returns UserResponseDto Updated user with new profile photo
   * @throws ApiError
   */
  public static usersControllerUploadProfilePhoto(
    fileData: FormData
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/profile/photo",
      body: fileData,
      mediaType: "multipart/form-data",
      errors: {
        400: `Invalid file`,
        401: `Unauthorized`,
        500: `Server error`,
      },
    });
  }

  /**
   * Create a new user (Admin only)
   * @param requestBody
   * @returns UserResponseDto User created successfully
   * @throws ApiError
   */
  public static usersControllerCreate(
    requestBody: RequestCreateUserDto
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Insufficient permissions`,
      },
    });
  }
  /**
   * Get all users (Admin only)
   * @returns any List of users
   * @throws ApiError
   */
  public static usersControllerFindAll(): CancelablePromise<UserResponseDto[]> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users",
      errors: {
        403: `Insufficient permissions`,
      },
    });
  }
  /**
   * Get user by ID
   * @param id
   * @returns UserResponseDto User details
   * @throws ApiError
   */
  public static usersControllerFindById(
    id: string
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{id}",
      path: {
        id: id,
      },
      errors: {
        404: `User not found`,
      },
    });
  }
  /**
   * Update user details
   * @param id
   * @param requestBody
   * @returns UserResponseDto User updated successfully
   * @throws ApiError
   */
  public static usersControllerUpdate(
    id: string,
    requestBody: RequestUpdateUserDto
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/users/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `User not found`,
      },
    });
  }
  /**
   * Delete user (SuperAdmin only)
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static usersControllerRemove(id: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/users/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Insufficient permissions`,
      },
    });
  }
  /**
   * Assign/Override user roles (SuperAdmin only)
   * Completely replaces the user's existing roles with the provided ones. Useful for role reassignment.
   * @param id
   * @param requestBody
   * @returns UserResponseDto User roles updated successfully
   * @throws ApiError
   */
  public static usersControllerAssignRoles(
    id: string,
    requestBody: RequestAssignRolesDto
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/users/{id}/roles",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Insufficient permissions`,
        404: `User not found`,
      },
    });
  }
  /**
   * Get user roles (Admin only)
   * Returns the list of roles assigned to a specific user
   * @param id
   * @returns any User roles retrieved successfully
   * @throws ApiError
   */
  public static usersControllerGetUserRoles(
    id: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/users/{id}/roles",
      path: {
        id: id,
      },
      errors: {
        403: `Insufficient permissions`,
        404: `User not found`,
      },
    });
  }
  /**
   * Add roles to user (SuperAdmin only)
   * Appends new roles to the user's existing roles without removing others. Duplicates are automatically handled.
   * @param id
   * @param requestBody
   * @returns UserResponseDto Roles added successfully
   * @throws ApiError
   */
  public static usersControllerAddRoles(
    id: string,
    requestBody: RequestAssignRolesDto
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/{id}/roles/add",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `Insufficient permissions`,
        404: `User not found`,
      },
    });
  }
  /**
   * Remove roles from user (SuperAdmin only)
   * Removes specified roles from the user. User must retain at least one role.
   * @param id
   * @param requestBody
   * @returns UserResponseDto Roles removed successfully
   * @throws ApiError
   */
  public static usersControllerRemoveRoles(
    id: string,
    requestBody: RequestAssignRolesDto
  ): CancelablePromise<UserResponseDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/users/{id}/roles/remove",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Cannot remove all roles - user must have at least one role`,
        403: `Insufficient permissions`,
        404: `User not found`,
      },
    });
  }
}
