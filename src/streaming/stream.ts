import { sendPost } from './internal/httpHelpers';
import * as Urls from '../urls';
import { disable } from './publishToken';
import { StreamStopResponse } from './types/stream';

/**
 * Stops an active stream.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/stream_stopstream
 * @note Prior to stopping the stream, you must call {@link disable}.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param streamId Identifier of the stream to stop.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link StreamStopResponse} object.
 */
export const stop = async (apiSecret: string, streamId: string): Promise<StreamStopResponse> => {
    const body = {
        streamId,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/stream/stop',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPost<StreamStopResponse>(options);
};

/**
 * Stops all currently active streams associated with your account.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/stream_stopbyaccount
 * @note Prior to stopping a stream, you must call {@link disable}.
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link StreamStopResponse} object.
 */
export const stopAll = async (apiSecret: string): Promise<StreamStopResponse> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/stream/stop/all',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendPost<StreamStopResponse>(options);
};
