/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { ForgetPasswordDto } from '../models/ForgetPasswordDto';
import type { loginInputDto } from '../models/loginInputDto';
import type { ResetPasswordDto } from '../models/ResetPasswordDto';
import type { SignupInputDto } from '../models/SignupInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register a new user
     * @param requestBody
     * @returns any User registered successfully
     * @throws ApiError
     */
    public static authControllerSignup(
        requestBody: SignupInputDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                409: `Email already exists`,
            },
        });
    }
    /**
     * Login with email and password
     * @param requestBody
     * @returns any Login successful
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: loginInputDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
            },
        });
    }
    /**
     * Logout current user
     * @returns any Logout successful
     * @throws ApiError
     */
    public static authControllerLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
            errors: {
                401: `Invalid session`,
            },
        });
    }
    /**
     * Change password for authenticated user
     * @param requestBody
     * @returns any Password changed successfully
     * @throws ApiError
     */
    public static authControllerChangePassword(
        requestBody: ChangePasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid session or incorrect password`,
            },
        });
    }
    /**
     * Request password reset token
     * @param requestBody
     * @returns any Reset token generated
     * @throws ApiError
     */
    public static authControllerForgetPassword(
        requestBody: ForgetPasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/forget-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reset password with reset token
     * @param requestBody
     * @returns any Password reset successfully
     * @throws ApiError
     */
    public static authControllerResetPassword(
        requestBody: ResetPasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired token`,
            },
        });
    }
}
