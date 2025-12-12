import { AdditionalInfoDto } from "../extra/AdditionalInfoDto";
import { SensorDto } from "./SensorDto";

/**
 * Discovery response payload sent from backend
 */
export type ResponseDiscoveryDto = {
  /** Unique identifier of the user who initiated the request */
  userId: string;

  /** Unique identifier for the response */
  responseId: string;

  /** System/device response code */
  responseCode: number;

  /** Unique identifier for the request */
  requestId: string;

  /** Whether this was a broadcast discovery response */
  isBroadcast: boolean;

  /** Timestamp of response completion (epoch ms) */
  timestamp: number;

  /** Full sensor/device data returned from the system */
  sensorData?: SensorDto;

  /** Device uptime in epoch milliseconds */
  uptime: number;

  /** Additional metadata about device manufacturer/model */
  additionalInfo?: AdditionalInfoDto;
};
