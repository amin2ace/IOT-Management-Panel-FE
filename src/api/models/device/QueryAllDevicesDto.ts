import { ResponseGetSensorDto } from "./ResponseGetSensorDto";

// Main response type matching GetAllDevicesResponseDto
export interface GetAllDevicesResponse {
  /** Array of device/sensor records */
  data: ResponseGetSensorDto[];

  /** Total number of devices in the system */
  total?: number;

  /** Current page number (for pagination) */
  page?: number;

  /** Number of devices per page */
  limit?: number;

  /** Total number of pages */
  totalPages?: number;

  /** Whether there are more pages available */
  hasMore?: boolean;
}
