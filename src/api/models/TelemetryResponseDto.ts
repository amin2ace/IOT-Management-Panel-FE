/* generated from NestJS DTO - do not edit */
/* Telemetry response data transfer object */

import { TelemetryMetaDto } from "./TelemetryMetaDto";
import { TelemetryMetric } from "./TelemetryMetrics";

/**
 * Telemetry response data transfer object
 *
 * @example
 * {
 *   "userId": "user-001",
 *   "responseId": "fw-20251104-status",
 *   "responseCode": 211,
 *   "requestId": "fw-t-43",
 *   "deviceId": "sensor-67890",
 *   "metric": "Temperature",
 *   "value": 24.5,
 *   "timestamp": 1762379573804,
 *   "meta": {
 *     "firmwareVersion": "1.0.3",
 *     "location": {
 *       "latitude": 37.7749,
 *       "longitude": -122.4194,
 *       "altitude": 15
 *     },
 *     "comment": "Initial reading from device"
 *   }
 * }
 */
export type TelemetryResponseDto = {
  /**
   * Unique identifier of the user who initiated the request
   * @example "user-001"
   */
  userId: string;

  /**
   * Unique identifier for the response
   * @example "fw-20251104-status"
   */
  responseId: string;

  /**
   * Response code from the device or system
   * @example 211
   */
  responseCode: number;

  /**
   * Unique identifier for the request
   * @example "fw-t-43"
   */
  requestId: string;

  /**
   * Device ID that performed the diagnostic
   * @example "sensor-67890"
   */
  deviceId: string;

  /**
   * Telemetry metric type
   * @example "Temperature"
   */
  metric: TelemetryMetric;

  /**
   * Measured value
   * @example 24.5
   */
  value: number;

  /**
   * Time of the response in epoch milli second
   * @example 1762379573804
   */
  timestamp: number;

  /**
   * Optional metadata
   */
  meta?: TelemetryMetaDto;
};
