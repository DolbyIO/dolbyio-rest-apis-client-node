import { sendPost } from '../internal/httpHelpers';
import { COMMS_HOSTNAME } from './internal/urls';
import JwtToken from '../types/jwtToken';

/**
 * Starts the RTMP live stream for the specified conference.
 *
 * Once the Dolby.io Communication API service started streaming to the target url,
 * a `Stream.Rtmp.InProgress` Webhook event will be sent.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-rtmp
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param rtmpUrl The destination URI provided by the RTMP service.
 * @param layoutUrl Overwrites the layout URL configuration:
 *      - `null`: uses the layout URL configured in the dashboard (if no URL is set in the dashboard, then uses the Dolby.io default);
 *      - `default`: uses the Dolby.io default layout;
 *      - URL string: uses this layout URL
 * @param layoutName Defines a name for the given layout URL, which makes layout identification easier for customers especially when the layout URL is not explicit.
 */
export const startRtmp = async (accessToken: JwtToken, conferenceId: string, rtmpUrl: string, layoutUrl?: string, layoutName?: string): Promise<void> => {
    const body = { uri: rtmpUrl };
    if (layoutUrl) body['layoutUrl'] = layoutUrl;
    if (layoutName) body['layoutName'] = layoutName;

    const options = {
        hostname: COMMS_HOSTNAME,
        path: `/v2/conferences/mix/${conferenceId}/rtmp/start`,
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
 * Stops the RTMP stream of the specified conference.
 *
 * @link https://docs.dolby.io/communications-apis/reference/stop-rtmp
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stopRtmp = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: COMMS_HOSTNAME,
        path: `/v2/conferences/mix/${conferenceId}/rtmp/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};

/**
 * Starts real-time streaming using Dolby.io Real-time Streaming services (formerly Millicast).
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-rts
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param streamName The Millicast stream name to which the conference is broadcasted.
 * @param publishingToken The Millicast publishing token used to identify the broadcaster.
 * @param layoutUrl Overwrites the layout URL configuration:
 *      - `null`: uses the layout URL configured in the dashboard (if no URL is set in the dashboard, then uses the Dolby.io default);
 *      - `default`: uses the Dolby.io default layout;
 *      - URL string: uses this layout URL
 * @param layoutName Defines a name for the given layout URL, which makes layout identification easier for customers especially when the layout URL is not explicit.
 */
export const startRts = async (
    accessToken: JwtToken,
    conferenceId: string,
    streamName: string,
    publishingToken: string,
    layoutUrl?: string,
    layoutName?: string
): Promise<void> => {
    const body = {
        streamName: streamName,
        publishingToken: publishingToken,
    };
    if (layoutUrl) body['layoutUrl'] = layoutUrl;
    if (layoutName) body['layoutName'] = layoutName;

    const options = {
        hostname: COMMS_HOSTNAME,
        path: `/v2/conferences/mix/${conferenceId}/rts/start`,
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
 * Stops real-time streaming to Dolby.io Real-time Streaming services.
 *
 * @link https://docs.dolby.io/communications-apis/reference/stop-rts
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stopRts = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: COMMS_HOSTNAME,
        path: `/v2/conferences/mix/${conferenceId}/rts/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};
