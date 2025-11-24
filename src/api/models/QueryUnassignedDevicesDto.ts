import { RequestMessageCode } from "./MessageCode";

export type QueryUnassignedDevicesDto = {
  userId: string;
  requestId: string;
  requestCode: RequestMessageCode;
  deviceId: string;
  timestamp: number;
};
