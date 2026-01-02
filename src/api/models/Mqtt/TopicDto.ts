/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TopicUseCaseEnum } from "../enums/TopicUseCaseEnum";

export type TopicDto = {
  /**
   * MQTT broker URL
   */
  brokerUrl: string;
  /**
   * Device ID associated with the topic
   */
  deviceId: string;
  /**
   * MQTT topic name
   */
  topic: string;
  /**
   * Use case for this topic
   */
  useCase: TopicUseCaseEnum;
  /**
   * Whether the topic is subscribed
   */
  isSubscribed: boolean;
  /**
   * Topic creation timestamp
   */
  createdAt: string;
  /**
   * Topic last update timestamp
   */
  // updatedAt: string;
};
