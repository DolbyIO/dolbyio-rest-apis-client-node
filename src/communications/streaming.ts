import { sendPost } from '../internal/httpHelpers';
import { Expand, ExpandRecursively } from '../internal/utils';
import * as Urls from '../urls';
import { JwtToken } from '../types/jwtToken';
import { RtmpMixOptionsBase, RtmpMixOptionsComplex, RtmpMixOptions, MixOptionsBase, MixOptionsComplex, MixOptions } from './types/mixOptions';
import RtsStream from './types/rtsStream';

/**
 * Starts the RTMP live stream for the specified conference.
 *
 * Once the Dolby.io Communications APIs service starts streaming to the target URL,
 * the platform sends the `Stream.Rtmp.InProgress` webhook event.
 * Providing multiple destination URIs in a requests does not cause sending multiple webhook events.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-rtmp
 *
 * @param options RTMP options.
 */
export async function startRtmp(options: Expand<RtmpMixOptionsBase>): Promise<void>;

/**
 * Starts the RTMP live stream for the specified conference.
 *
 * Once the Dolby.io Communications APIs service starts streaming to the target URL,
 * the platform sends the `Stream.Rtmp.InProgress` webhook event.
 * Providing multiple destination URIs in a requests does not cause sending multiple webhook events.
 *
 * You can also specify the resolution of the RTMP stream.
 * The default mixer layout application supports both 1920x1080 (16:9 aspect ratio) and 1080x1920 (9:16 aspect ratio).
 * If the {@link RtmpMixOptionsComplex.resolution} parameter is not specified, then the system defaults to 1920x1080.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-rtmp
 *
 * @param options RTMP options.
 */
export async function startRtmp(options: ExpandRecursively<RtmpMixOptionsComplex>): Promise<void>;

export async function startRtmp(options: ExpandRecursively<RtmpMixOptions>): Promise<void> {
    const body = { uri: options.uri };
    const optionsExt = options as RtmpMixOptionsComplex;
    if (optionsExt.layoutUrl) body['layoutUrl'] = optionsExt.layoutUrl;
    if (optionsExt.resolution) {
        body['height'] = optionsExt.resolution.height;
        body['width'] = optionsExt.resolution.width;
    }
    if (optionsExt.mixId) body['mixId'] = optionsExt.mixId;

    const requestOptions = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/conferences/mix/${options.conferenceId}/rtmp/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${options.accessToken.token_type} ${options.accessToken.access_token}`,
        },
        body: JSON.stringify(body),
    };

    await sendPost(requestOptions);
}

/**
 * Stops the RTMP stream of the specified conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/stop-rtmp
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stopRtmp = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/conferences/mix/${conferenceId}/rtmp/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};

/**
 * Starts real-time streaming using Dolby.io Real-time Streaming services (formerly Millicast).
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-rts
 *
 * @param options RTS streaming options.
 *
 * @returns A {@link RtsStream} object through a {@link Promise}.
 */
export async function startRts(options: Expand<MixOptionsBase>): Promise<RtsStream>;

/**
 * Starts real-time streaming using Dolby.io Real-time Streaming services (formerly Millicast).
 *
 * You can also specify the resolution of the RTS stream.
 * The default mixer layout application supports both 1920x1080 (16:9 aspect ratio) and 1080x1920 (9:16 aspect ratio).
 * If the {@link MixOptionsComplex.resolution} parameter is not specified, then the system defaults to 1920x1080.
 *
 * Starting multiple streams is currently not supported, even after proving multiple identifiers.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-rts
 *
 * @param options RTS streaming options.
 *
 * @returns A {@link RtsStream} object through a {@link Promise}.
 */
export async function startRts(options: ExpandRecursively<MixOptionsComplex>): Promise<RtsStream>;

export async function startRts(options: ExpandRecursively<MixOptions>): Promise<RtsStream> {
    const body = {};
    const optionsExt = options as MixOptionsComplex;
    if (optionsExt.layoutUrl) body['layoutUrl'] = optionsExt.layoutUrl;
    if (optionsExt.resolution) {
        body['height'] = optionsExt.resolution.height;
        body['width'] = optionsExt.resolution.width;
    }
    if (optionsExt.mixId) body['mixId'] = optionsExt.mixId;

    const requestOptions = {
        hostname: Urls.getCommsHostname(),
        path: `/v3/conferences/mix/${options.conferenceId}/rts/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${options.accessToken.token_type} ${options.accessToken.access_token}`,
        },
        body: JSON.stringify(body),
    };

    const response = await sendPost(requestOptions);
    return response as RtsStream;
}

/**
 * Stops real-time streaming to Dolby.io Real-time Streaming services.
 *
 * @link https://docs.dolby.io/communications-apis/reference/stop-rts
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stopRts = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: Urls.getCommsHostname(),
        path: `/v3/conferences/mix/${conferenceId}/rts/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};
