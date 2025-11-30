/* generated from NestJS DTO - do not edit */
/* Telemetry metadata transfer object */

import { DeviceLocationDto } from "./DeviceLocationDto";

/**
 * Telemetry metadata transfer object
 *
 * @example
 * {
 *   "firmwareVersion": "v1.2.3",
 *   "location": {
 *     "latitude": 37.7749,
 *     "longitude": -122.4194,
 *     "altitude": 15
 *   },
 *   "comment": "Near greenhouse"
 * }
 */
export type TelemetryMetaDto = {
  /**
   * Firmware version of the device
   * @example "v1.2.3"
   */
  firmwareVersion?: string;

  /**
   * Device location
   */
  location?: DeviceLocationDto;

  /**
   * Optional comment
   * @example "Near greenhouse"
   */
  comment?: string;
};
