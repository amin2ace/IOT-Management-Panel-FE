/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceCapabilities } from "./DeviceCapabilities";
export type SensorFunctionalityRequestDto = {
  /**
   * Unique identifier of the user who initiated the request
   */
  userId: string;
  /**
   * Unique identifier for the request
   */
  requestId: string;
  /**
   * Numeric code representing the request type
   */
  requestCode: number;
  /**
   * Unique identifier of the device
   */
  deviceId: string;
  /**
   * Time of the request in epoch milli second
   */
  timestamp: number;
  /**
   * The provisioning state of the device
   */
  functionality: Array<DeviceCapabilities>;
  /**
   * MQTT topic to publish sensor data to
   */
  publishTopic: string;
  /**
   * Data publishing interval in milliseconds
   */
  interval: number;
  /**
   * High set point for the sensor
   */
  highSetPoint: string;
  /**
   * Low set point for the sensor
   */
  lowSetPoint: string;
  /**
   * Whether acknowledgment is required
   */
  ackRequired: boolean;
  /**
   * Digital signature for security
   */
  signature: string;
};
