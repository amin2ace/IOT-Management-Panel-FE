export interface User {
  userId: string;
  email: string;
  userName: string;
  isActive: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SensorData {
  sensorId: string;
  sensorType: string;
  value: number | string;
  unit: string;
  quality: "good" | "fair" | "poor" | "error";
  location: string;
  battery?: number;
  signalStrength?: number;
  timestamp: string;
  additionalData?: Record<string, string>;
}

export interface MQTTStatus {
  connected: boolean;
  brokerUrl: string;
  subscribedTopics: string[];
  lastActivity: Date;
}

export interface WebSocketMessage {
  type: string;
  data: JSON;
  timestamp: Date;
}

export interface Command {
  deviceId: string;
  command: string;
  parameters?: CmdParams;
}

export interface SystemAlert {
  type: "warning" | "error" | "info";
  message: string;
  sensorId?: string;
  severity: "low" | "medium" | "high";
  timestamp: Date;
}

export interface SubscriptionConfirmed {
  sensorId: string;
  topics: string[];
  timestamp: Date;
}

export interface WebSocketError {
  error: string;
  timestamp: Date;
}

export interface CommandSent {
  deviceId: string;
  command: string;
  parameters?: CmdParams;
  sentBy: string;
  timestamp: Date;
}

export interface CmdParams {
  param: string;
  value: string;
}
