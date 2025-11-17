import { DeviceCapabilities } from "./DeviceCapabilities";
import { ProvisionState } from "./ProvisionState";

export type QueryDeviceDto = {
  // e.g. "device-1234"
  deviceId?: string; // Request from specific device

  // e.g. "assigned"
  provisionState?: ProvisionState;

  // e.g. ["temperature", "humidity"]
  functionality?: DeviceCapabilities; // e.g. ["temperature", "humidity"]
};
