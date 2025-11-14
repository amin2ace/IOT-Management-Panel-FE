/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TopicsService {
    /**
     * Get all topics for device
     * @param id
     * @returns any Returns list of device's topics
     * @throws ApiError
     */
    public static topicControllerGetDeviceTopicsByDeviceId(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/topic/device/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all subscribed topics
     * @returns any Returns list of subscribed topics
     * @throws ApiError
     */
    public static topicControllerGetSubscribedTopics(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/topic/subscribed',
        });
    }
}
