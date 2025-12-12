/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogLevel } from "../enums/LogLevelEnum";
export type LoggingConfigDto = {
  /**
   * Logging level
   */
  level?: LogLevel;

  /**
   * Enable serial debug output
   */
  enableSerial?: boolean;

  /**
   * Enable serial debug output
   */
  buadrate?: number;

  /**
   * EExternal log server address
   */
  externalServer?: string;
};
