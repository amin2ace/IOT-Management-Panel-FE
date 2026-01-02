/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import type { TopicDto } from "../models/Mqtt/TopicDto";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class TopicsService {
  /**
   * Get all topics for device
   * @param id
   * @returns TopicDto Returns list of device's topics
   * @throws ApiError
   */
  public static topicControllerGetDeviceTopicsByDeviceId(
    id: string
  ): CancelablePromise<Array<TopicDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/topic/device/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * Get all subscribed topics
   * @returns TopicDto Returns list of subscribed topics
   * @throws ApiError
   */
  public static topicControllerGetSubscribedTopics(): CancelablePromise<
    Array<TopicDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/topic/subscribed",
    });
  }
}
