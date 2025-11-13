/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignRolesDto } from '../models/AssignRolesDto';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create a new user (Admin only)
     * @param requestBody
     * @returns any User created successfully
     * @throws ApiError
     */
    public static usersControllerCreate(
        requestBody: CreateUserDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users',
            body: requestBody,
            mediaType: 'application/json',
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
    public static usersControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users',
            errors: {
                403: `Insufficient permissions`,
            },
        });
    }
    /**
     * Get user by ID
     * @param id
     * @returns any User details
     * @throws ApiError
     */
    public static usersControllerFindById(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{id}',
            path: {
                'id': id,
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
     * @returns any User updated successfully
     * @throws ApiError
     */
    public static usersControllerUpdate(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
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
    public static usersControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{id}',
            path: {
                'id': id,
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
     * @returns any User roles updated successfully
     * @throws ApiError
     */
    public static usersControllerAssignRoles(
        id: string,
        requestBody: AssignRolesDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/{id}/roles',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
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
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{id}/roles',
            path: {
                'id': id,
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
     * @returns any Roles added successfully
     * @throws ApiError
     */
    public static usersControllerAddRoles(
        id: string,
        requestBody: AssignRolesDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/{id}/roles/add',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Roles removed successfully
     * @throws ApiError
     */
    public static usersControllerRemoveRoles(
        id: string,
        requestBody: AssignRolesDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/{id}/roles/remove',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Cannot remove all roles - user must have at least one role`,
                403: `Insufficient permissions`,
                404: `User not found`,
            },
        });
    }
}
