import { sendPost } from './internal/httpHelpers';
import Urls from './urls';
import JwtToken from './types/jwtToken';

/**
 * Generates an API token.
 *
 * To make any API call, you must acquire a JWT (JSON Web Token) format API token.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-api-token
 * @link https://docs.dolby.io/media-apis/reference/get-api-token
 *
 * @param appKey Your Dolby.io App Key.
 * @param appSecret Your Dolby.io App Secret.
 * @param expiresIn API token expiration time in seconds. If no value is specified, the default is 1800, indicating 30 minutes. The maximum value is 86,400, indicating 24 hours.
 * @param scope A list of case-sensitive strings allowing you to control what scope of access the API token should have. If not specified, the API token will possess unrestricted access to all resources and actions. The API supports the following scopes:
 * * `comms:client_access_token:create`: Allows requesting a client access token.
 * * `comms:conf:create`: Allows creating a new conference.
 * * `comms:conf:admin`: Allows administrating a conference, including actions such as Invite, Kick, Send Message, Set Spatial Listener's Audio, and Update Permissions.
 * * `comms:conf:destroy`: Allows terminating a live conference.
 * * `comms:monitor:delete`: Allows deleting data from the Monitor API, for example, deleting recordings.
 * * `comms:monitor:read`: Allows reading data through the Monitor API.
 * * `comms:monitor:download`: Allows generating download URLs for data (e.g. recording) through the Monitor API.
 * * `comms:stream:write`: Allows starting and stopping RTMP or Real-Time streaming.
 * * `comms:remix:write`: Allows remixing recordings.
 * * `comms:remix:read`: Allows reading the remix status.
 * * `comms:record:write`: Allows starting and stopping recordings.
 * Incorrect values are omitted. If you want to give the token access to all Communications REST APIs, you can use a wildcard, such as comms:*
 *
 * @returns A {@link JwtToken} object through a {@link Promise}.
 */
export const getApiAccessToken = async (appKey: string, appSecret: string, expiresIn?: number, scope?: string[]): Promise<JwtToken> => {
    const body = new URLSearchParams({
        grant_type: 'client_credentials',
    });
    if (expiresIn) {
        body.append('expires_in', expiresIn.toFixed(0));
    }
    if (scope?.length) {
        body.append('scope', scope.join(' '));
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
