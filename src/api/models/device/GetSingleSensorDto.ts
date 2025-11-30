/* generated from NestJS DTO - do not edit */
/* Sensor response data transfer object */

import { ConnectionState } from "../enums/ConnectionStateEnum";
import { DeviceCapabilities } from "../extra/DeviceCapabilities";
import { DeviceLocationDto } from "../extra/DeviceLocationDto";
import { Protocol } from "../extra/Protocol";
import { ProvisionState } from "../enums/ProvisionStateEnum";

/**
 * Sensor Response DTO
 * Used for serializing device/sensor data in API responses
 * Maps from Sensor entity to a clean response format
 *
 * @example
 * {
 *   "deviceId": "sensor-67890",
 *   "capabilities": ["TEMPERATURE", "HUMIDITY"],
 *   "deviceHardware": "ESP32-WROOM",
 *   "assignedFunctionality": ["TEMPERATURE"],
 *   "deviceBaseTopic": "greenHouse_jolfa/tomato-section/sensor/temperature",
 *   "location": {
 *     "room": "Greenhouse",
 *     "floor": 1,
 *     "unit": "tomato-section"
 *   },
 *   "provisionState": "ACTIVE",
 *   "clientId": "client-123",
 *   "lastValue": 25.5,
 *   "lastValueAt": 1762379573804,
 *   "connectionState": "ONLINE",
 *   "isActuator": false,
 *   "highSetPoint": 30,
 *   "lowSetPoint": 15,
 *   "hasError": false,
 *   "firmware": "v2.1.0",
 *   "mac": "5C:CF:7F:12:34:56",
 *   "ip": "192.168.1.50",
 *   "protocol": "MQTT",
 *   "broker": "mqtt.example.com:1883",
 *   "isDeleted": false,
 *   "lastReboot": "2025-11-14T10:30:00Z",
 *   "lastUpgrade": "2025-11-10T14:20:00Z",
 *   "createdAt": "2025-01-15T08:00:00Z",
 *   "updatedAt": "2025-11-14T10:35:00Z"
 * }
 */
export type GetSingleSensorDto = {
  /**
   * Unique sensor identifier (ESP MAC or custom ID)
   * @example "sensor-67890"
   */
  deviceId: string;

  /**
   * Device capabilities/supported functionalities
   * @example ["TEMPERATURE", "HUMIDITY"]
   */
  capabilities: DeviceCapabilities[];

  /**
   * Device hardware model or type
   * @example "ESP32-WROOM"
   */
  deviceHardware: string;

  /**
   * Assigned functionalities selected from capabilities
   * @example ["TEMPERATURE"]
   */
  assignedFunctionality?: DeviceCapabilities[];

  /**
   * Base MQTT topic for publishing device data
   * @example "greenHouse_jolfa/tomato-section/sensor/temperature"
   */
  deviceBaseTopic?: string;

  /**
   * Device location metadata
   * @example { "room": "Greenhouse", "floor": 1, "unit": "tomato-section" }
   */
  location?: DeviceLocationDto;

  /**
   * Current provisioning state of the device
   * @example "ACTIVE"
   */
  provisionState: ProvisionState;

  /**
   * Client/tenant identifier for multi-tenant support
   * @example "client-123"
   */
  clientId?: string;

  /**
   * Last measured/reported value from the device
   * @example 25.5
   */
  lastValue: number;

  /**
   * Timestamp of the last value update (epoch milliseconds)
   * @example 1762379573804
   */
  lastValueAt?: number;

  /**
   * Current connection state of the device
   * @example "ONLINE"
   */
  connectionState?: ConnectionState;

  /**
   * Whether the device is an actuator (controller) or sensor
   * @example false
   */
  isActuator: boolean;

  /**
   * High setpoint threshold
   * @example 30
   */
  highSetPoint: number;

  /**
   * Low setpoint threshold
   * @example 15
   */
  lowSetPoint: number;

  /**
   * Whether the device has an error state
   * @example false
   */
  hasError: boolean;

  /**
   * Firmware version
   * @example "v2.1.0"
   */
  firmware?: string;

  /**
   * Device MAC address
   * @example "5C:CF:7F:12:34:56"
   */
  mac?: string;

  /**
   * Device IP address
   * @example "192.168.1.50"
   */
  ip?: string;

  /**
   * Communication protocol used
   * @example "MQTT"
   */
  protocol: Protocol;

  /**
   * MQTT broker address
   * @example "mqtt.example.com:1883"
   */
  broker: string;

  /**
   * Whether the device is marked as deleted
   * @example false
   */
  isDeleted: boolean;

  /**
   * Timestamp of last device reboot
   * @example "2025-11-14T10:30:00Z"
   */
  lastReboot?: Date;

  /**
   * Timestamp of last firmware upgrade
   * @example "2025-11-10T14:20:00Z"
   */
  lastUpgrade?: Date;

  /**
   * Record creation timestamp
   * @example "2025-01-15T08:00:00Z"
   */
  createdAt: Date;

  /**
   * Record last update timestamp
   * @example "2025-11-14T10:35:00Z"
   */
  updatedAt: Date;
};
