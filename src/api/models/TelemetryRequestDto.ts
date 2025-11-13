/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TelemetryRequestDto = {
    /**
     * Unique identifier of the user who initiated the request
     */
    userId: string;
    /**
     * Numeric code representing the request type
     */
    requestCode: number;
    /**
     * Unique identifier for the request
     */
    requestId: string;
    /**
     * Device ID that performed the diagnostic
     */
    deviceId: string;
    /**
     * Time of the request in epoch milli second
     */
    timestamp: number;
};

