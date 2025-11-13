/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MqttConfigDto = {
    /**
     * MQTT broker hostname or IP address
     */
    host: string;
    /**
     * MQTT broker port number
     */
    port: number;
    /**
     * Protocol to use for connection (mqtt, mqtts, tcp, ws, wss)
     */
    protocol?: MqttConfigDto.protocol;
    /**
     * Username for MQTT broker authentication
     */
    username?: string;
    /**
     * Password for MQTT broker authentication
     */
    password?: string;
    /**
     * Client ID for the MQTT connection
     */
    clientId?: string;
    /**
     * Keep alive interval in seconds
     */
    keepalive?: number;
    /**
     * Enable SSL/TLS encryption
     */
    ssl?: boolean;
    /**
     * Path to CA certificate file (for SSL)
     */
    ca?: string;
    /**
     * Path to client certificate file
     */
    cert?: string;
    /**
     * Path to client key file
     */
    key?: string;
    /**
     * Connection timeout in milliseconds
     */
    connectTimeout?: number;
    /**
     * Reconnection interval in milliseconds
     */
    reconnectPeriod?: number;
    /**
     * Clean session flag
     */
    clean?: boolean;
    /**
     * Auto reconnect on connection failure
     */
    autoReconnect?: boolean;
    /**
     * Maximum number of reconnection attempts
     */
    maxReconnectAttempts?: number;
    /**
     * Will topic for last will message
     */
    willTopic?: string;
    /**
     * Will message content
     */
    willMessage?: string;
    /**
     * Will message QoS
     */
    willQos?: number;
    /**
     * Will message retain flag
     */
    willRetain?: boolean;
};
export namespace MqttConfigDto {
    /**
     * Protocol to use for connection (mqtt, mqtts, tcp, ws, wss)
     */
    export enum protocol {
        MQTT = 'mqtt',
        MQTTS = 'mqtts',
        TCP = 'tcp',
        WS = 'ws',
        WSS = 'wss',
    }
}

