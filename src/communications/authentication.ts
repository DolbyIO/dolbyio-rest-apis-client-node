import { sendPost } from '../internal/httpHelpers';
import Urls from '../urls';
import JwtToken from '../types/jwtToken';
import { GetClientAccessTokenOptions } from './types/authentication';

/**
 * Gets a client access token to authenticate a session.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-client-access-token-v1
 *
 * @param appKey Your Dolby.io App Key.
 * @param appSecret Your Dolby.io App Secret.
 * @param expiresIn Access token expiration time in seconds. If no value is specified, the default is 3,600, indicating one hour. The maximum value is 86,400, indicating 24 hours.
 *
 * @returns A {@link JwtToken} object through a {@link Promise}.
 *
 * @deprecated This function is now deprecated and will be removed in the next release of this SDK. Please start using {@link getClientAccessTokenV2} instead.
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
        hostname: Urls.getCommsSessionHostname(),
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

/**
 * Generates a client access token.
 *
 * This API returns a client access token that your backend can request on behalf of a client to initialize the Dolby.io SDK in a secure way.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-client-access-token
 *
 * @param options Options to generate a client access token.
 *
 * @returns A {@link JwtToken} object through a {@link Promise}.
 */
export const getClientAccessTokenV2 = async (options: GetClientAccessTokenOptions): Promise<JwtToken> => {
    const body = {
        sessionScope: options.sessionScope.join(' '),
    };
    if (options.externalId) body['externalId'] = options.externalId;
    if (options.expiresIn) body['expiresIn'] = options.expiresIn;

    const postOptions = {
        hostname: Urls.getCommsHostname(),
        path: '/v2/client-access-token',
        headers: {
            'Cache-Control': 'no-cache',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${options.accessToken.token_type} ${options.accessToken.access_token}`,
        },
        body: JSON.stringify(body),
    };

    const response = await sendPost(postOptions);
    return response as JwtToken;
};
