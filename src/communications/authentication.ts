import { sendPost } from '../internal/httpHelpers';
import JwtToken from './types/jwtToken';

/**
 * Gets a JWT token for authorization.
 *
 * @param appKey Your Dolby.io App Key.
 * @param appSecret Your Dolby.io App Secret.
 * @param hostname
 * @param path
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
const getAccessToken = async (appKey: string, appSecret: string, hostname: string, path: string, expiresIn: number | undefined): Promise<JwtToken> => {
    let body = 'grant_type=client_credentials';
    if (expiresIn) {
        body += `&expires_in=${expiresIn}`;
    }

    const authz = Buffer.from(`${appKey}:${appSecret}`).toString('base64');

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
        Authorization: `Basic ${authz}`,
    };

    return sendPost({ hostname, path, headers, body }) as Promise<JwtToken>;
};

/**
 * Generates an API token.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-api-token
 *
 * @param appKey Your Dolby.io App Key.
 * @param appSecret Your Dolby.io App Secret.
 * @param expiresIn API token expiration time in seconds. The maximum value is 2,592,000, indicating 30 days. If no value is specified, the default is 1800, indicating 30 minutes.
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
export const getApiAccessToken = async (appKey: string, appSecret: string, expiresIn: number | undefined): Promise<JwtToken> => {
    return getAccessToken(appKey, appSecret, 'api.dolby.io', '/v1/auth/token', expiresIn);
};

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
    return getAccessToken(appKey, appSecret, 'session.voxeet.com', '/v1/oauth2/token', expiresIn);
};
