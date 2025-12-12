/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { LoggingConfigDto } from "../configuration/LoggingConfigDto";
import { NetworkConfigDto } from "../configuration/NetworkConfigDto";
import { OtaConfigDto } from "../configuration/OtaConfigDto";
import { ThresholdDto } from "../configuration/ThresholdDto";
import { Protocol } from "../enums/ProtocolEnum";
import { DeviceLocationDto } from "../extra/DeviceLocationDto";

export type RequestSensorConfigDto = {
  /**
   * Unique identifier of the sensor
   */
  deviceId: string;
  /**
   * Device high and low set points
   */
  threshold: ThresholdDto;
  /**
   * Base MQTT topic for the device
   */
  baseTopic: string;
  /**
   * Network configuration
   */
  network?: NetworkConfigDto;
  /**
   * Device timezone
   */
  timezone?: string;
  /**
   * Logging configuration
   */
  logging?: LoggingConfigDto;
  /**
   * OTA configuration
   */
  ota?: OtaConfigDto;
  /**
   * Data publishing interval in milliseconds
   */
  interval?: number;
  /**
   * Device location
   */
  location?: DeviceLocationDto;
  /**
   * Protocol name to use
   */
  protocol?: Protocol;
  /**
   * Configuration version for update tracking
   */
  configVersion?: number;
};
