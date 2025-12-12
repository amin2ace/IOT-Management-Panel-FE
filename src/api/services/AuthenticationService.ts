/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RequestChangePasswordDto } from "../models/auth/RequestChangePasswordDto";
import type { RequestForgetPasswordDto } from "../models/auth/RequestForgetPasswordDto";
import type { RequestLoginInputDto } from "../models/auth/RequestLoginInputDto";
import type { RequestResetPasswordDto } from "../models/auth/RequestResetPasswordDto";
import type { RequestSignupInputDto } from "../models/auth/RequestSignupInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { ResponseAuditDto } from "../models/auth/ResponseAuditDto";
export class AuthenticationService {
  /**
   * Register a new user
   * @param requestBody
   * @returns any User registered successfully
   * @throws ApiError
   */
  public static authControllerSignup(
    requestBody: RequestSignupInputDto
  ): CancelablePromise<ResponseAuditDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/signup",
      body: requestBody,
      mediaType: "application/json",
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
    requestBody: RequestLoginInputDto
  ): CancelablePromise<ResponseAuditDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/login",
      body: requestBody,
      mediaType: "application/json",
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
      method: "POST",
      url: "/auth/logout",
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
    requestBody: RequestChangePasswordDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/change-password",
      body: requestBody,
      mediaType: "application/json",
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
    requestBody: RequestForgetPasswordDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/forget-password",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Reset password with reset token
   * @param requestBody
   * @returns any Password reset successfully
   * @throws ApiError
   */
  public static authControllerResetPassword(
    requestBody: RequestResetPasswordDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/reset-password",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        401: `Invalid or expired token`,
      },
    });
  }

  public static authControllerRefresh() {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/refresh",
      errors: {
        401: `Invalid or expired token`,
      },
    });
  }
}
