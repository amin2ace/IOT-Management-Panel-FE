/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDto } from "../models/auth/ChangePasswordDto";
import type { ForgetPasswordDto } from "../models/auth/ForgetPasswordDto";
import type { loginInputDto } from "../models/auth/loginInputDto";
import type { ResetPasswordDto } from "../models/auth/ResetPasswordDto";
import type { SignupInputDto } from "../models/auth/SignupInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { LoginResponseDto } from "../models/auth/LoginResponseDto";
import { SignupResponseDto } from "../models/auth/SignupResponseDto";
export class AuthenticationService {
  /**
   * Register a new user
   * @param requestBody
   * @returns any User registered successfully
   * @throws ApiError
   */
  public static authControllerSignup(
    requestBody: SignupInputDto
  ): CancelablePromise<SignupResponseDto> {
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
    requestBody: loginInputDto
  ): CancelablePromise<LoginResponseDto> {
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
    requestBody: ChangePasswordDto
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
    requestBody: ForgetPasswordDto
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
    requestBody: ResetPasswordDto
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
