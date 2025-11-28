import { ConnectionState } from "./ConnectionStateEnum";
import { DeviceCapabilities } from "./DeviceCapabilities";
import { Protocol } from "./Protocol";
import { ProvisionState } from "./ProvisionState";

export interface DeviceLocation {
  room?: string;
  floor?: number;
  unit?: string;
}

export type ResponseGetDevice = {
  deviceId: string;
  capabilities: DeviceCapabilities[];
  deviceHardware: string;
  assignedFunctionality?: DeviceCapabilities[];
  deviceBaseTopic?: string;
  location: DeviceLocation;
  provisionState: ProvisionState;
  clientId?: string;
  lastValue: number;
  lastValueAt?: number;
  connectionState?: ConnectionState;
  isActuator: boolean;
  highSetPoint: number;
  lowSetPoint: number;
  interval: number;
  hasError: boolean;
  firmware?: string;
  mac?: string;
  ip?: string;
  protocol: Protocol;
  broker: string;
  isDeleted: boolean;
  lastReboot?: Date | string;
  lastUpgrade?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
