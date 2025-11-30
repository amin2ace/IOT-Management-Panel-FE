/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MqttPublishDto = {
    topic: string;
    /**
     * Message payload - can be plain text or JSON formatted string/object
     */
    message: (string | Record<string, any>);
    qos: MqttPublishDto.qos;
    retain: boolean;
};
export namespace MqttPublishDto {
    export enum qos {
        '_0' = 0,
        '_1' = 1,
        '_2' = 2,
    }
}

