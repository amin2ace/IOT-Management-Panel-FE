import { DeviceCapabilities } from "../extra/DeviceCapabilities";
import { ProvisionState } from "../enums/ProvisionStateEnum";

export type QueryDeviceDto = {
  // e.g. "device-1234"
  deviceId?: string; // Request from specific device

  // e.g. "assigned"
  provisionState?: ProvisionState;

  // e.g. ["temperature", "humidity"]
  functionality?: DeviceCapabilities; // e.g. ["temperature", "humidity"]
};
