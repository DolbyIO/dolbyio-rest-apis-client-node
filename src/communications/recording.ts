import { sendPost } from '../internal/httpHelpers';
import { Expand, ExpandRecursively } from '../internal/utils';
import * as Urls from '../urls';
import JwtToken from '../types/jwtToken';
import { MixOptionsBase, MixOptionsComplex, MixOptions } from './types/mixOptions';

/**
 * Starts recording for the specified conference.
 *
 * You can specify a custom layout URL per a recording request.
 * The {@link MixOptionsComplex.layoutUrl} parameter overrides the layout URL configured in the dashboard.
 *
 * @link https://docs.dolby.io/communications-apis/reference/api-recording-start
 *
 * @param options Recording options.
 */
export async function start(options: Expand<MixOptionsBase>): Promise<void>;

/**
 * Starts recording for the specified conference.
 *
 * You can specify a custom layout URL per a recording request.
 * The {@link MixOptionsComplex.layoutUrl} parameter overrides the layout URL configured in the dashboard.
 *
 * You can also specify the resolution of the recording.
 * The default mixer layout application supports both 1920x1080 (16:9 aspect ratio) and 1080x1920 (9:16 aspect ratio).
 * If the {@link MixOptionsComplex.resolution} parameter is not specified, then the system defaults to 1920x1080.
 *
 * Using the {@link MixOptionsComplex.mixId} parameter you can uniquely identify individual mixed recordings.
 * For example, `landscape-stage` and `portrait-audience` as mixId can help you identify the purpose of the recording
 * when you receive the webhook notification or use the Monitor API to retrieve the recordings.
 * You may start only one recording per mixId.
 *
 * @link https://docs.dolby.io/communications-apis/reference/api-recording-start
 *
 * @param options Recording options.
 */
export async function start(options: ExpandRecursively<MixOptionsComplex>): Promise<void>;

export async function start(options: ExpandRecursively<MixOptions>): Promise<void> {
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
        path: `/v2/conferences/mix/${options.conferenceId}/recording/start`,
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
 * Stops recording the specified conference.
 * Calling this API while recoding multiple mixed recordings stops all recordings.
 *
 * @link https://docs.dolby.io/communications-apis/reference/api-recording-stop
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stop = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/conferences/mix/${conferenceId}/recording/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};
