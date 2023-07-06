import { sendPost } from '../internal/httpHelpers';
import * as Urls from '../urls';
import JwtToken from '../types/jwtToken';

/**
 * Starts recording for the specified conference.
 *
 * You can specify a custom layout URL per recording request.
 * The {@link layoutUrl} parameter overrides the layout URL configured in the dashboard.
 *
 * @link https://docs.dolby.io/communications-apis/reference/api-recording-start
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param layoutUrl Overwrites the layout URL configuration.
 *      This field is ignored if it is not relevant regarding recording configuration,
 *      for example if live_recording set to false or if the recording is MP3 only.
 *      - `null`: uses the layout URL configured in the dashboard (if no URL is set in the dashboard, then uses the Dolby.io default);
 *      - `default`: uses the Dolby.io default layout;
 *      - URL string: uses this layout URL
 */
export const start = async (accessToken: JwtToken, conferenceId: string, layoutUrl?: string): Promise<void> => {
    const body = {};
    if (layoutUrl) body['layoutUrl'] = layoutUrl;

    const options = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/conferences/mix/${conferenceId}/recording/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body: JSON.stringify(body),
    };

    await sendPost(options);
};

/**
 * Stops the recording of the specified conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/api-recording-stop
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stop = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/conferences/mix/${conferenceId}/recording/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};
