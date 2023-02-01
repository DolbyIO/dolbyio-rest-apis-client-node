import { sendPost } from './internal/httpHelpers';
import { SAPI_DIRECTOR_HOSTNAME } from './internal/urls';
import { PublishResponse, SubscribeResponse } from './types/director';

/**
 * Request for url and authorization to publish a stream.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/director_publish
 *
 * @param publishingToken The publishing token.
 * @param streamName The name of the stream.
 *
 * @returns A `PublishResponse` object through a `Promise`.
 */
export const publish = async (publishingToken: string, streamName: string): Promise<PublishResponse> => {
    const body = {
        streamName: streamName,
    };

    const options = {
        hostname: SAPI_DIRECTOR_HOSTNAME,
        path: '/api/director/publish',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publishingToken}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPost<PublishResponse>(options);
};

/**
 * Request for url and authorization to subscribe to a stream.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/director_subscribe
 *
 * @param streamName The name of the stream.
 * @param streamAccountId Optional - The account identifier. Required only for published streams which have `subscribeRequiresAuth=false`.
 * @param subscribeToken Optional - The subscribe token.
 *
 * @returns A `SubscribeResponse` object through a `Promise`.
 */
export const subscribe = async (streamName: string, streamAccountId?: string, publishingToken?: string): Promise<SubscribeResponse> => {
    const body = {
        streamName: streamName,
    };
    if (streamAccountId) body['streamAccountId'] = streamAccountId;

    const options = {
        hostname: SAPI_DIRECTOR_HOSTNAME,
        path: '/api/director/subscribe',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: publishingToken ? `Bearer ${publishingToken}` : 'NoAuth',
        },
        body: JSON.stringify(body),
    };

    return await sendPost<SubscribeResponse>(options);
};
