import {
  RequestMessageCode,
  SensorType,
  Protocol,
  ProvisionState,
} from "./enums";
import { NetworkConfig, LoggingConfig, OtaConfig, Filter } from "./common";

export interface DiscoveryRequest {
  userId: string;
  requestId: string;
  requestCode: RequestMessageCode;
  deviceId: string;
  timestamp: number;
  isBroadcast: boolean;
  filters?: Filter;
}

export interface SensorFunctionalityRequest {
  userId: string;
  requestId: string;
  requestCode: RequestMessageCode;
  deviceId: string;
  timestamp: number;
  functionality: SensorType[];
  publishTopic: string;
  interval: number;
  highSetPoint: string;
  lowSetPoint: string;
  ackRequired: boolean;
  signature: string;
}

export interface SensorConfigRequest {
  userId: string;
  requestId: string;
  requestCode: RequestMessageCode;
  sensorId: string;
  timestamp: number;
  baseTopic?: string;
  network?: NetworkConfig;
  timezone?: string;
  logging?: LoggingConfig;
  ota?: OtaConfig;
  interval?: number;
  location?: DeviceLocation;
  protocol?: Protocol;
  apSsid?: string;
  apPassword?: string;
  configVersion?: number;
}

// Responses
// enums.ts
export enum ConnectionState {
  ONLINE = "online",
  OFFLINE = "offline",
  ERROR = "error",
}

// device-location.ts
export interface DeviceLocation {
  site?: string;
  floor?: number;
  unit?: string;
}

// additional-info.ts
export interface AdditionalInfo {
  manufacturer?: string;
  model?: string;
}

// discovery-response.ts
export interface DiscoveryResponse {
  _id: string;
  sensorId: string;
  capabilities: string[]; // e.g. ["temperature", "humidity", "pressure"]
  deviceHardware: string;
  assignedFunctionality: string[]; // e.g. ["humidity"]
  deviceBaseTopic: string;
  location: DeviceLocation;
  provisionState: ProvisionState;
  clientId?: string | null;
  lastValue?: string | number | boolean | null;
  lastValueAt?: number | null;
  connectionState: ConnectionState;
  isActuator: boolean;
  highSetPoint?: number | null;
  lowSetPoint?: number | null;
  hasError?: boolean | null;
  firmware: string;
  mac: string;
  ip: string;
  protocol: Protocol;
  broker: string;
  isDeleted: boolean;
  lastReboot?: number | null;
  lastUpgrade?: number | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
