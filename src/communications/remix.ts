import { sendPost, sendGet } from '../internal/httpHelpers';
import { COMMS_HOSTNAME } from './internal/urls';
import JwtToken from '../types/jwtToken';
import RemixStatus from './types/remixStatus';

/**
 * Use this API to trigger a remix and regenerate a recording of a previously recorded conference using
 * the current mixer layout. The `Recording.MP4.Available` event is sent if the customer has configured
 * the webhook in the developer portal.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-conference-remix
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param layoutUrl Overwrites the layout URL configuration:
 *      - `null`: uses the layout URL configured in the dashboard (if no URL is set in the dashboard, then uses the Dolby.io default);
 *      - `default`: uses the Dolby.io default layout;
 *      - URL string: uses this layout URL
 *
 * @returns A `RemixStatus` object through a `Promise`.
 */
export const start = async (accessToken: JwtToken, conferenceId: string, layoutUrl?: string): Promise<RemixStatus> => {
    const body = {};
    if (layoutUrl) body['layoutUrl'] = layoutUrl;

    const options = {
        hostname: COMMS_HOSTNAME,
        path: `/v2/conferences/mix/${conferenceId}/remix/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body: JSON.stringify(body),
    };

    const response = await sendPost(options);
    return response as RemixStatus;
};

/**
 * Gets the status of a current mixing job.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-conference-remix-status
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 *
 * @returns A `RemixStatus` object through a `Promise`.
 */
export const getStatus = async (accessToken: JwtToken, conferenceId: string): Promise<RemixStatus> => {
    const options = {
        hostname: COMMS_HOSTNAME,
        path: `/v2/conferences/mix/${conferenceId}/remix/status`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(options);
    return response as RemixStatus;
};
