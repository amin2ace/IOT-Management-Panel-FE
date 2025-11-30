import { RequestMessageCode } from "../enums/MessageCodeEnum";

export type QueryUnassignedDevicesDto = {
  userId: string;
  requestId: string;
  requestCode: RequestMessageCode;
  deviceId: string;
  timestamp: number;
};
