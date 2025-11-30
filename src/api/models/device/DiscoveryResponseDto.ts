/* generated from NestJS DTO - do not edit */
/* Discovery response data transfer objects */

import { AdditionalInfoDto } from "../extra/AdditionalInfoDto";
import { ConnectionState } from "../enums/ConnectionStateEnum";
import { DeviceCapabilities } from "../extra/DeviceCapabilities";
import { DeviceLocationDto } from "../extra/DeviceLocationDto";
import { Protocol } from "../extra/Protocol";

/**
 * Discovery response data transfer object
 *
 * @example
 * {
 *   "userId": "user-001",
 *   "responseId": "fw-20251104-status",
 *   "responseCode": 200,
 *   "requestId": "req-d-79",
 *   "deviceId": "sensor-67890",
 *   "timestamp": 1762379573804,
 *   "capabilities": ["temperature", "humidity", "pressure"],
 *   "deviceHardware": "ESP32-DevKitC",
 *   "topicPrefix": "sensors/lab01/temperature/sensor-67890",
 *   "connectionState": "online",
 *   "firmware": "v2.3.7",
 *   "mac": "00:1B:44:11:3A:B7",
 *   "ip": "192.168.1.45",
 *   "uptime": 1762379500000,
 *   "location": {
 *     "site": "main",
 *     "floor": 1,
 *     "unit": "tomato"
 *   },
 *   "protocol": "MQTT",
 *   "broker": "mqtt://broker.lab.local",
 *   "additionalInfo": {
 *     "manufacturer": "IoTTech Inc.",
 *     "model": "TX-9000"
 *   }
 * }
 */
export type DiscoveryResponseDto = {
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
   * @example 200
   */
  responseCode: number;

  /**
   * Unique identifier for the request
   * @example "req-d-79"
   */
  requestId: string;

  /**
   * Device ID that performed the diagnostic
   * @example "sensor-67890"
   */
  deviceId: string;

  /**
   * Time of diagnostic completion in epoch milliseconds
   * @example 1762379573804
   */
  timestamp: number;

  /**
   * Device capabilities
   * @example ["temperature", "humidity", "pressure"]
   */
  capabilities: DeviceCapabilities[];

  /**
   * Device hardware information
   * @example "ESP32-DevKitC"
   */
  deviceHardware: string;

  /**
   * Topic prefix for MQTT communications
   * @example "sensors/lab01/temperature/sensor-67890"
   */
  topicPrefix: string;

  /**
   * Current connection state of the device
   * @example "online"
   */
  connectionState: ConnectionState;

  /**
   * Firmware version
   * @example "v2.3.7"
   */
  firmware: string;

  /**
   * MAC address of the device
   * @example "00:1B:44:11:3A:B7"
   */
  mac: string;

  /**
   * IP address of the device
   * @example "192.168.1.45"
   */
  ip: string;

  /**
   * Device uptime in epoch milliseconds
   * @example 1762379500000
   */
  uptime: number;

  /**
   * Device location information
   */
  location: DeviceLocationDto;

  /**
   * Communication protocol used
   * @example "MQTT"
   */
  protocol: Protocol;

  /**
   * MQTT broker address
   * @example "mqtt://broker.lab.local"
   */
  broker: string;

  /**
   * Additional device information
   */
  additionalInfo?: AdditionalInfoDto;
};
