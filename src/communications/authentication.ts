import { sendPost } from '../internal/httpHelpers';
import * as Urls from '../urls';
import { JwtToken } from '../types/jwtToken';
import { GetClientAccessTokenOptions } from './types/authentication';

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
