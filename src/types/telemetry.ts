export interface TelemetryMeta {
  firmwareVersion?: string;
  location?: {
    site?: string;
    floor?: number;
    unit?: string;
  };
  comment?: string;
}

export type TelemetryMetric =
  | "temperature"
  | "humidity"
  | "pressure"
  | "airQuality"
  | "co2"
  | "voc"
  | "noise"
  | "light";

export interface TelemetryResponse {
  userId: string;
  responseId: string;
  responseCode: number;
  requestId: string;
  deviceId: string;
  metric: TelemetryMetric;
  value: number;
  timestamp: number;
  meta?: TelemetryMeta;
}
