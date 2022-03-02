import { sendPost, sendGet } from '../internal/httpHelpers';
import JwtToken from './types/jwtToken';
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
 *
 * @returns A `RemixStatus` object through a `Promise`.
 */
export const start = async (accessToken: JwtToken, conferenceId: string): Promise<RemixStatus> => {
    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/mix/${conferenceId}/remix/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendPost(options);
    return response as RemixStatus;
};

/**
 * @deprecated
 * Use this API to trigger a remix and regenerate a recording of a previously recorded conference using
 * the current mixer layout. The `Recording.MP4.Available` event is sent if the customer has configured
 * the webhook in the developer portal.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-conference-remix-v1
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param conferenceId Identifier of the conference.
 *
 * @returns A `RemixStatus` object through a `Promise`.
 */
export const startBasicAuth = async (consumerKey: string, consumerSecret: string, conferenceId: string): Promise<RemixStatus> => {
    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const options = {
        hostname: 'session.voxeet.com',
        path: `/v1/api/conferences/mix/${conferenceId}/record`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authz}`,
        },
    };

    const response = await sendPost(options);
    return response as RemixStatus;
};

/**
 * Gets the status of a current mixing job. You must use this API if the conference is protected using enhanced conference access control.
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
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/mix/${conferenceId}/remix/status`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(options);
    return response as RemixStatus;
};

/**
 * @deprecated
 * Gets the status of a current mixing job.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-conference-remix-status-v1
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param conferenceId Identifier of the conference.
 *
 * @returns A `RemixStatus` object through a `Promise`.
 */
export const getStatusBasicAuth = async (consumerKey: string, consumerSecret: string, conferenceId: string): Promise<RemixStatus> => {
    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const options = {
        hostname: 'session.voxeet.com',
        path: `/v1/api/conferences/mix/${conferenceId}/status`,
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${authz}`,
        },
    };

    const response = await sendGet(options);
    return response as RemixStatus;
};
