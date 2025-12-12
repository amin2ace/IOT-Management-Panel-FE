/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SensorConfigDto } from './SensorConfigDto';
export type PublishSetDeviceConfigDto = {
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
    deviceId: string;
    /**
     * Time of the request in epoch milli second
     */
    timestamp: number;
    /**
     * Device configuration
     */
    configuration: SensorConfigDto;
};

