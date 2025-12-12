import { ConnectionState } from "../enums/ConnectionStateEnum";
import { DeviceCapabilities } from "../enums/DeviceCapabilities";
import { ProvisionState } from "../enums/ProvisionStateEnum";
import { SensorConfigDto } from "./SensorConfigDto";

export interface SensorDto {
  /** Unique sensor identifier (ESP MAC or custom ID) */
  deviceId: string;

  /** Supported device capabilities/functionality types */
  capabilities: DeviceCapabilities[];

  /** Hardware model or device type (e.g., ESP32-WROOM) */
  deviceHardware: string;

  /** Complete device configuration data */
  configuration: SensorConfigDto;

  /** Related controllers assigned to this device */
  controllers?: string[];

  /** Selected functionalities derived from capabilities */
  assignedFunctionality?: DeviceCapabilities[];

  /** Current provisioning state of the device */
  provisionState: ProvisionState;

  /** Current connection state (online/offline/error) */
  connectionState: ConnectionState;

  /** Whether the device acts as an actuator (controller) */
  isActuator: boolean;

  /** Whether the device is currently in an error state */
  hasError: boolean;

  /** Optional error description if device has issues */
  errorMessage?: string;

  /** Last measured numeric value reported by the device */
  lastValue?: number;

  /** Timestamp of the last reported value (epoch ms) */
  lastValueAt?: number;

  /** Current firmware version */
  firmware?: string;

  /** MQTT broker address the device connects to */
  broker: string;

  /** Whether the device is marked as deleted (soft delete) */
  isDeleted: boolean;

  /** Timestamp of last device reboot */
  lastReboot?: Date;

  /** Timestamp of last firmware upgrade */
  lastUpgrade?: Date;
}
