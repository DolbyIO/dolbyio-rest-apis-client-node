import { sendPost } from '../internal/httpHelpers';
import { SESSION_HOSTNAME } from './internal/urls';
import JwtToken from '../types/jwtToken';

/**
 * Gets a client access token to authenticate a session.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-client-access-token
 *
 * @param appKey Your Dolby.io App Key.
 * @param appSecret Your Dolby.io App Secret.
 * @param expiresIn Access token expiration time in seconds. The maximum value is 2,592,000, indicating 30 days. If no value is specified, the default is 3,600, indicating one hour.
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
export const getClientAccessToken = async (appKey: string, appSecret: string, expiresIn: number | undefined): Promise<JwtToken> => {
    let body = 'grant_type=client_credentials';
    if (expiresIn) {
        body += `&expires_in=${expiresIn}`;
    }

    const authz = Buffer.from(`${appKey}:${appSecret}`).toString('base64');

    const options = {
        hostname: SESSION_HOSTNAME,
        path: '/v1/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            Authorization: `Basic ${authz}`,
        },
        body,
    };

    const response = await sendPost(options);
    return response as JwtToken;
};
