/**
 * React Type definition for SensorConfigDto
 * Represents all configuration parameters for a sensor device.
 */

import { LoggingConfigDto } from "../configuration/LoggingConfigDto";
import { NetworkConfigDto } from "../configuration/NetworkConfigDto";
import { OtaConfigDto } from "../configuration/OtaConfigDto";
import { ThresholdDto } from "../configuration/ThresholdDto";
import { Protocol } from "../enums/ProtocolEnum";
import { DeviceLocationDto } from "../extra/DeviceLocationDto";

export type SensorConfigDto = {
  /** Unique identifier of the sensor */
  deviceId: string;

  /** Device high and low setpoint thresholds */
  threshold?: ThresholdDto;

  /** Base MQTT topic used for publishing sensor data */
  baseTopic?: string;

  /** Network-related configurations such as WiFi and IP settings */
  network?: NetworkConfigDto;

  /** Device timezone (IANA format) */
  timezone?: string;

  /** Logging behavior and output settings */
  logging?: LoggingConfigDto;

  /** OTA (over-the-air firmware update) configuration */
  ota?: OtaConfigDto;

  /** Interval in milliseconds for publishing sensor data */
  interval?: number;

  /** Location metadata describing where the device is installed */
  location?: DeviceLocationDto;

  /** Protocol used by the device for communication */
  protocol?: Protocol;

  /** Configuration version used for update/change tracking */
  configVersion?: number;
};
