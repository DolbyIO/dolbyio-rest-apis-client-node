import { sendPost, sendGet } from '../internal/httpHelpers';
import { Expand, ExpandRecursively } from '../internal/utils';
import * as Urls from '../urls';
import { JwtToken } from '../types/jwtToken';
import RemixStatus from './types/remixStatus';
import { MixOptionsBase, MixOptionsComplex, MixOptions } from './types/mixOptions';

/**
 * Triggers a remix and regenerates a recording of a previously recorded conference using a [mixer layout](https://docs.dolby.io/communications-apis/docs/guides-mixer-layout).
 * You can remix only one conference at a time.
 * The `Recordings.Available` event is sent if the customer has configured the webhook in the developer portal.
 * For more information, see the [Recording Conferences](https://docs.dolby.io/communications-apis/docs/guides-recording-conferences) and [Multiple Layout Mixes](https://docs.dolby.io/communications-apis/docs/guides-multiple-layout-mixes) documents.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-conference-remix
 *
 * @param options Remix options.
 *
 * @returns A {@link RemixStatus} object through a {@link Promise}.
 */
export async function start(options: Expand<MixOptionsBase>): Promise<RemixStatus>;

/**
 * Triggers a remix and regenerates a recording of a previously recorded conference using a [mixer layout](https://docs.dolby.io/communications-apis/docs/guides-mixer-layout).
 * You can remix only one conference at a time.
 * The `Recordings.Available` event is sent if the customer has configured the webhook in the developer portal.
 * For more information, see the [Recording Conferences](https://docs.dolby.io/communications-apis/docs/guides-recording-conferences) and [Multiple Layout Mixes](https://docs.dolby.io/communications-apis/docs/guides-multiple-layout-mixes) documents.
 *
 * You can also specify the resolution of the remix.
 * The default mixer layout application supports both 1920x1080 (16:9 aspect ratio) and 1080x1920 (9:16 aspect ratio).
 * If the {@link MixOptionsComplex.resolution} parameter is not specified, then the system defaults to 1920x1080.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-conference-remix
 *
 * @param options Remix options.
 *
 * @returns A {@link RemixStatus} object through a {@link Promise}.
 */
export async function start(options: ExpandRecursively<MixOptionsComplex>): Promise<RemixStatus>;

export async function start(options: ExpandRecursively<MixOptions>): Promise<RemixStatus> {
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
        path: `/v2/conferences/mix/${options.conferenceId}/remix/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${options.accessToken.token_type} ${options.accessToken.access_token}`,
        },
        body: JSON.stringify(body),
    };

    const response = await sendPost(requestOptions);
    return response as RemixStatus;
}

/**
 * Gets the status of a current mixing job.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-conference-remix-status
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 *
 * @returns A {@link RemixStatus} object through a {@link Promise}.
 */
export const getStatus = async (accessToken: JwtToken, conferenceId: string): Promise<RemixStatus> => {
    const options = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/conferences/mix/${conferenceId}/remix/status`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(options);
    return response as RemixStatus;
};
