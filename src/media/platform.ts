import { sendPost } from '../internal/httpHelpers';
import JwtToken from './types/jwtToken';

/**
 * Generates OAuth2 access token.
 *
 * Generates an access token to be used for Bearer Authentication for Media API calls.
 * The token will expire in 12 hours.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-oauth2-post
 *
 * @param apiKey Your Dolby.io API Key.
 * @param apiSecret Your Dolby.io API Secret.
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
export const getAccessToken = async (apiKey: string, apiSecret: string): Promise<JwtToken> => {
    let body = 'grant_type=client_credentials';

    const authz = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const options = {
        hostname: 'api.dolby.com',
        path: '/media/oauth2/token',
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
