/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ControlDeviceDto } from "../models/ControlDeviceDto";
import type { DeviceCapabilities } from "../models/DeviceCapabilities";
import type { DiscoveryRequestDto } from "../models/DiscoveryRequestDto";
import type { HardwareStatusRequestDto } from "../models/HardwareStatusRequestDto";
import type { ProvisionState } from "../models/ProvisionState";
import type { SensorConfigRequestDto } from "../models/SensorConfigRequestDto";
import type { SensorFunctionalityRequestDto } from "../models/SensorAssignRequestDto";
import type { TelemetryRequestDto } from "../models/TelemetryRequestDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { QueryDeviceDto } from "../models/QueryDeviceDto";
import { DiscoveryResponseDto } from "../models/DiscoveryResponseDto";
export class DevicesService {
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
      url: "/api/devices",
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
    requestBody: DiscoveryRequestDto
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
    requestBody: DiscoveryRequestDto
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
    requestBody: HardwareStatusRequestDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/devices/hardware-status",
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
    requestBody: SensorFunctionalityRequestDto
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
      url: "/api/devices/{id}",
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
    requestBody: SensorConfigRequestDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/devices/config",
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
      url: "/api/devices/{id}/history",
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
      url: "/api/devices/{id}/control",
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
      url: "/api/devices/{id}/status",
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
    requestBody: TelemetryRequestDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/devices/telemetry",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
