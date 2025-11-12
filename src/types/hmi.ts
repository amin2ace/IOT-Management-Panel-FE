export interface RelayState {
  id: string;
  name: string;
  state: boolean;
  lastUpdated: number;
}

export interface DeviceStatus {
  deviceId: string;
  mode: "manual" | "auto";
  relays: RelayState[];
  telemetry: Record<string, number>;
}
