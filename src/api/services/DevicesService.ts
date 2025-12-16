/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ControlDeviceDto } from "../models/additionals/ControlDeviceDto";
import type { RequestDiscoveryDto } from "../models/device/RequestDiscoveryDto";
import type { RequestHardwareStatusDto } from "../models/configuration/RequestHardwareStatusDto";
import type { RequestSensorAssignDto } from "../models/device/RequestSensorAssignDto";
import type { RequestTelemetryDto } from "../models/device/RequestTelemetryDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { QueryDeviceDto } from "../models/device/QueryDeviceDto";
import { SensorConfigDto } from "../models/device/SensorConfigDto";
import { SensorDto } from "../models/device/SensorDto";
export class DevicesService {
  /**
   * Get all devices
   * @returns any List of devices
   * @throws ApiError
   */
  public static deviceControllerGetAllSensors(): CancelablePromise<
    SensorDto[]
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/devices/all",
    });
  }

  /**
   * Get all devices
   * @param provisionState The state of provisioning for device
   * @param functionality The provisioning state of the device
   * @param deviceId Unique identifier of the device
   * @returns any List of devices
   * @throws ApiError
   */
  public static deviceControllerGetSensors(
    query: QueryDeviceDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/devices/query",
      query: {
        provisionState: query.provisionState,
        functionality: query.functionality,
        deviceId: query.deviceId,
      },
    });
  }
  /**
   * Discover devices via broadcast
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerDiscoverDevicesBroadcast(
    requestBody: RequestDiscoveryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/devices/discover-broadcast",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Discover devices via unicast
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerDiscoverDeviceUnicast(
    requestBody: RequestDiscoveryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/devices/discover-unicast",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get unassigned devices
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerGetUnassignedSensor(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/devices/unassigned",
    });
  }
  /**
   * Get device hardware status
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerGetHardwareStatus(
    requestBody: RequestHardwareStatusDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/devices/hardware-status",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Provision device
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerProvisionDevice(
    requestBody: RequestSensorAssignDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/devices/provision",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Delete device
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static deviceControllerDeleteSensor(
    id: string
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/devices/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * Reconfigure device
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerReconfigureDevice(
    requestBody: SensorConfigDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/devices/config",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get device history
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerGetHistory(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/devices/{id}/history",
      path: {
        id: id,
      },
    });
  }
  /**
   * Control device
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerControlDevice(
    id: string,
    requestBody: ControlDeviceDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/devices/{id}/control",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Get device status
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerGetDeviceStatus(
    id: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/devices/{id}/status",
      path: {
        id: id,
      },
    });
  }
  /**
   * Get device telemetry
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static deviceControllerGetDeviceTelemetry(
    requestBody: RequestTelemetryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/devices/telemetry",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
