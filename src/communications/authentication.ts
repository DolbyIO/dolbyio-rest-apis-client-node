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
 * @param expiresIn Access token expiration time in seconds. The maximum value is 86,400, indicating 24 hours. If no value is specified, the default is 3,600, indicating one hour.
 *
 * @returns A {@link JwtToken} object through a {@link Promise}.
 */
export const getClientAccessToken = async (appKey: string, appSecret: string, expiresIn?: number): Promise<JwtToken> => {
    const body = new URLSearchParams({
        grant_type: 'client_credentials',
    });
    if (expiresIn) {
        body.append('expires_in', expiresIn.toFixed(0));
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
        body: body.toString(),
    };

    const response = await sendPost(options);
    return response as JwtToken;
};
