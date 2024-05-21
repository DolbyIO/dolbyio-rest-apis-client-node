import { sendPost } from '../internal/httpHelpers';
import * as Urls from '../urls';
import { JwtToken } from './types/jwtToken';

/**
 * Generates an API token.
 *
 * To make any API call, you must acquire a JWT (JSON Web Token) format API token.
 *
 * @link https://docs.dolby.io/media-apis/reference/get-api-token
 *
 * @param appKey Your Dolby.io App Key.
 * @param appSecret Your Dolby.io App Secret.
 * @param expiresIn API token expiration time in seconds. If no value is specified, the default is 1800, indicating 30 minutes. The maximum value is 86,400, indicating 24 hours.
 *
 * @returns A {@link JwtToken} object through a {@link Promise}.
 */
export const getApiAccessToken = async (appKey: string, appSecret: string, expiresIn?: number): Promise<JwtToken> => {
    const body = new URLSearchParams({
        grant_type: 'client_credentials',
    });
    if (expiresIn) {
        body.append('expires_in', expiresIn.toFixed(0));
    }

    const authz = Buffer.from(`${appKey}:${appSecret}`).toString('base64');

    const options = {
        hostname: Urls.getApiHostname(),
        path: '/v1/auth/token',
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
