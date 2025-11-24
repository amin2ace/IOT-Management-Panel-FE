/* generated from NestJS DTO - do not edit */
/* Get all devices response data transfer object */

import { GetSingleSensorDto } from "./GetSingleSensorDto";

/**
 * Get All Devices Response DTO
 * Used for serializing the response when fetching all devices/sensors
 * Includes array of devices and optional pagination metadata
 *
 * @example
 * {
 *   "data": [
 *     {
 *       "deviceId": "sensor-67890",
 *       "capabilities": ["TEMPERATURE", "HUMIDITY"],
 *       "deviceHardware": "ESP32-WROOM",
 *       "assignedFunctionality": ["TEMPERATURE"],
 *       "deviceBaseTopic": "greenHouse_jolfa/tomato-section/sensor/temperature",
 *       "location": {
 *         "room": "Greenhouse",
 *         "floor": 1,
 *         "unit": "tomato-section"
 *       },
 *       "provisionState": "ACTIVE",
 *       "clientId": "client-123",
 *       "lastValue": 25.5,
 *       "lastValueAt": 1762379573804,
 *       "connectionState": "ONLINE",
 *       "isActuator": false,
 *       "highSetPoint": 30,
 *       "lowSetPoint": 15,
 *       "hasError": false,
 *       "firmware": "v2.1.0",
 *       "mac": "5C:CF:7F:12:34:56",
 *       "ip": "192.168.1.50",
 *       "protocol": "MQTT",
 *       "broker": "mqtt.example.com:1883",
 *       "isDeleted": false,
 *       "lastReboot": "2025-11-14T10:30:00Z",
 *       "lastUpgrade": "2025-11-10T14:20:00Z",
 *       "createdAt": "2025-01-15T08:00:00Z",
 *       "updatedAt": "2025-11-14T10:35:00Z"
 *     }
 *   ],
 *   "total": 42,
 *   "page": 1,
 *   "limit": 10,
 *   "totalPages": 5,
 *   "hasMore": false
 * }
 */
export type GetAllSensorsDto = {
  /**
   * Array of device/sensor records
   */
  data: GetSingleSensorDto[];

  /**
   * Total number of devices in the system
   * @example 42
   */
  total?: number;

  /**
   * Current page number (for pagination)
   * @example 1
   */
  page?: number;

  /**
   * Number of devices per page
   * @example 10
   */
  limit?: number;

  /**
   * Total number of pages
   * @example 5
   */
  totalPages?: number;

  /**
   * Whether there are more pages available
   * @example false
   */
  hasMore?: boolean;
};
