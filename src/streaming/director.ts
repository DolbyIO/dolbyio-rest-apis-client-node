import { sendPost } from './internal/httpHelpers';
import * as Urls from '../urls';
import { PublishResponse, SubscribeResponse } from './types/director';

/**
 * Request for url and authorization to publish a stream.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/director/director-publish/}
 *
 * @param publishingToken The publishing token.
 * @param streamName The name of the stream.
 *
 * @returns A {@link PublishResponse} object through a {@link Promise}.
 */
export const publish = async (publishingToken: string, streamName: string): Promise<PublishResponse> => {
    const body = {
        streamName: streamName,
    };

    const options = {
        hostname: Urls.getRtsDirectorHostname(),
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
 * @see {@link https://optiview.dolby.com/docs/millicast/api/director/director-subscribe/}
 *
 * @param streamName The name of the stream.
 * @param streamAccountId The account identifier. Required only for published streams which have `subscribeRequiresAuth=false`.
 * @param publishingToken The publish token.
 *
 * @returns A {@link SubscribeResponse} object through a {@link Promise}.
 */
export const subscribe = async (streamName: string, streamAccountId?: string, publishingToken?: string): Promise<SubscribeResponse> => {
    const body = {
        streamName: streamName,
    };
    if (streamAccountId) body['streamAccountId'] = streamAccountId;

    const options = {
        hostname: Urls.getRtsDirectorHostname(),
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
