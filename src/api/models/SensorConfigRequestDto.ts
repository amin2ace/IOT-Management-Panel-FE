/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeviceLocationDto } from './DeviceLocationDto';
import type { LoggingConfigDto } from './LoggingConfigDto';
import type { NetworkConfigDto } from './NetworkConfigDto';
import type { OtaConfigDto } from './OtaConfigDto';
import type { Protocol } from './Protocol';
export type SensorConfigRequestDto = {
    /**
     * Unique identifier of the user who initiated the request
     */
    userId: string;
    /**
     * Unique identifier for the request
     */
    requestId: string;
    /**
     * Numeric code representing the request type
     */
    requestCode: number;
    /**
     * Unique identifier of the device
     */
    sensorId: string;
    /**
     * Time of the request in epoch milli second
     */
    timestamp: number;
    /**
     * Base MQTT topic for the device
     */
    baseTopic: string;
    /**
     * Network configuration
     */
    network: NetworkConfigDto;
    /**
     * Device timezone
     */
    timezone?: string;
    /**
     * Logging configuration
     */
    logging?: LoggingConfigDto;
    /**
     * OTA configuration
     */
    ota?: OtaConfigDto;
    /**
     * Data publishing interval in milliseconds
     */
    interval: number;
    /**
     * Device location
     */
    location?: DeviceLocationDto;
    /**
     * Protocol name to use
     */
    protocol?: Protocol;
    apSsid: string;
    apPassword: string;
    /**
     * Configuration version for update tracking
     */
    configVersion?: number;
};

