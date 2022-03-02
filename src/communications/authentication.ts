import { sendPost } from '../internal/httpHelpers';
import JwtToken from './types/jwtToken';

/**
 * Gets a JWT token for authorization.
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param hostname
 * @param path
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
const getAccessToken = async (
    consumerKey: string,
    consumerSecret: string,
    hostname: string,
    path: string,
    expiresIn: number | undefined
): Promise<JwtToken> => {
    let body = 'grant_type=client_credentials';
    if (expiresIn) {
        body += `&expires_in=${expiresIn}`;
    }

    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
        Authorization: `Basic ${authz}`,
    };

    return sendPost({ hostname, path, headers, body }) as Promise<JwtToken>;
};

/**
 * Gets an access token to authenticate for API calls.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-bearer-token
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param expiresIn Access token expiration time in seconds. The maximum value is 2,592,000, indicating 30 days. If no value is specified, the default is 600, indicating ten minutes.
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
export const getApiAccessToken = async (consumerKey: string, consumerSecret: string, expiresIn: number | undefined): Promise<JwtToken> => {
    return getAccessToken(consumerKey, consumerSecret, 'api.voxeet.com', '/v1/auth/token', expiresIn);
};

/**
 * Gets a client access token to authenticate a session.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-client-access-token
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param expiresIn Access token expiration time in seconds. The maximum value is 2,592,000, indicating 30 days. If no value is specified, the default is 600, indicating ten minutes.
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
export const getClientAccessToken = async (consumerKey: string, consumerSecret: string, expiresIn: number | undefined): Promise<JwtToken> => {
    return getAccessToken(consumerKey, consumerSecret, 'session.voxeet.com', '/v1/oauth2/token', expiresIn);
};
