/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MqttConfigDto } from "../models/configuration/MqttConfigDto";
import type { MqttPublishDto } from "../models/configuration/MqttPublishDto";
import type { MqttSubscribeDto } from "../models/configuration/MqttSubscribeDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class MqttService {
  /**
   * Get current MQTT configuration
   * Retrieves the current MQTT broker connection configuration settings
   * @returns any Returns the current MQTT configuration
   * @throws ApiError
   */
  public static mqttManagementControllerGetConfig(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/mqtt/config",
      errors: {
        500: `Internal server error - Failed to retrieve configuration`,
      },
    });
  }
  /**
   * Update MQTT configuration
   * Updates the MQTT broker connection configuration. Connection will be re-established with new settings.
   * @param requestBody
   * @returns any MQTT configuration updated successfully
   * @throws ApiError
   */
  public static mqttManagementControllerUpdateConfig(
    requestBody: MqttConfigDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/mqtt/config",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad request - Invalid configuration parameters`,
        500: `Internal server error - Failed to update configuration`,
      },
    });
  }
  /**
   * Validate MQTT configuration
   * Validates the provided MQTT configuration without applying changes
   * @param requestBody
   * @returns any Configuration is valid
   * @throws ApiError
   */
  public static mqttManagementControllerValidateConfig(
    requestBody: MqttConfigDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/mqtt/config/validate",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Configuration validation failed`,
      },
    });
  }
  /**
   * Test MQTT connection
   * Tests the connection to the MQTT broker with the provided configuration without establishing permanent connection
   * @param requestBody
   * @returns any Connection test successful
   * @throws ApiError
   */
  public static mqttManagementControllerTestConnection(
    requestBody: MqttConfigDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/mqtt/config/test-connection",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Connection test failed - Invalid configuration`,
        503: `Service unavailable - Cannot connect to broker`,
      },
    });
  }
  /**
   * Connect to MQTT broker
   * Establishes a connection to the MQTT broker using configured settings
   * @param broker MQTT broker URL to connect to
   * @returns any Successfully connected to the MQTT broker
   * @throws ApiError
   */
  public static mqttManagementControllerConnect(
    broker: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/mqtt/connect/{broker}",
      path: {
        broker: broker,
      },
      errors: {
        500: `Internal server error - Failed to connect to MQTT broker`,
      },
    });
  }
  /**
   * Get MQTT connection status
   * Retrieves the current status of the MQTT broker connection
   * @returns any Returns MQTT connection details including connection state and broker info
   * @throws ApiError
   */
  public static mqttManagementControllerGetMqttStatus(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/mqtt/status",
      errors: {
        500: `Internal server error - Failed to retrieve connection status`,
      },
    });
  }
  /**
   * Publish message to MQTT topic
   * Publishes a message to a specified MQTT topic with configurable QoS and retain flags
   * @param requestBody
   * @returns any Message published successfully
   * @throws ApiError
   */
  public static mqttManagementControllerPublish(
    requestBody: MqttPublishDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/mqtt/publish",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad request - Invalid topic or message format`,
        500: `Internal server error - Failed to publish message`,
      },
    });
  }
  /**
   * Subscribe to MQTT topics
   * Subscribes to one or more MQTT topics for a specific device. Supports wildcard patterns.
   * @param requestBody
   * @returns any Successfully subscribed to one or more topics
   * @throws ApiError
   */
  public static mqttManagementControllerSubscribe(
    requestBody: MqttSubscribeDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/mqtt/subscribe",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Bad request - Invalid topics or device ID`,
        500: `Internal server error - Failed to subscribe`,
      },
    });
  }
  /**
   * Unsubscribe from MQTT topic
   * Removes subscription to a specified MQTT topic
   * @param topic
   * @returns any Successfully unsubscribed from the topic
   * @throws ApiError
   */
  public static mqttManagementControllerUnsubscribe(
    topic: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/mqtt/unsubscribe/{topic}",
      path: {
        topic: topic,
      },
      errors: {
        400: `Bad request - Invalid topic`,
        404: `Topic not found - Not subscribed to this topic`,
        500: `Internal server error - Failed to unsubscribe`,
      },
    });
  }
  /**
   * Reconnect to MQTT broker
   * Forces a reconnection to the MQTT broker. Useful for recovering from connection failures.
   * @returns any Reconnection initiated successfully
   * @throws ApiError
   */
  public static mqttManagementControllerReconnect(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/mqtt/reconnect",
      errors: {
        500: `Internal server error - Failed to initiate reconnection`,
      },
    });
  }
}
