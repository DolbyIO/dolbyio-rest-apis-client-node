import { sendPost } from './internal/httpHelpers';
import * as Urls from '../urls';
import { disableToken } from './publishToken';
import { ReprioritizeOptions, StreamStopResponse } from './types/stream';
import { listTokensByName } from './publishToken';

/**
 * Stops an active stream.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/stream-stop-stream/}
 * @remarks Prior to stopping the stream, you must call {@link disableToken}.
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
 * @see {@link https://optiview.dolby.com/docs/millicast/api/stream-stop-by-account/}
 * @remarks Prior to stopping a stream, you must call {@link disableToken}.
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

/**
 * ## Reprioritize an active stream
 * 
 * Update stream priority specified in token and restart stream to re-assign priority.
 * 
 * Use {@link listTokensByName | List Tokens By Name} and filter by StreamName to identify the tokenId associated with the target stream.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/stream-reprioritize-stream/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options The options to reprioritize the stream.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link StreamStopResponse} object.
 */
export const reprioritize = async (apiSecret: string, options: ReprioritizeOptions): Promise<StreamStopResponse> => {
    const body = {
        tokenId: options.tokenId,
        updatePriority: options.updatePriority,
    };

    const reqOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/stream/reprioritize',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPost<StreamStopResponse>(reqOptions);
};
