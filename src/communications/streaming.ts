import { sendPost } from '../internal/httpHelpers';
import JwtToken from './types/jwtToken';

/**
 * Starts an RTMP live stream. Once the Dolby.io Communication API service started streaming to the target url,
 * a `Stream.Rtmp.InProgress` Webhook event will be sent. You must use this API if the conference is protected
 * using enhanced conference access control.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-rtmp
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param rtmpUrls List of the RTMP endpoints where to send the RTMP stream to.
 */
export const startRtmp = async (accessToken: JwtToken, conferenceId: string, rtmpUrls: string | Array<string>): Promise<void> => {
    const uri = typeof rtmpUrls === 'string' ? rtmpUrls : rtmpUrls.join('|');
    const body = JSON.stringify({ uri: uri });

    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/mix/${conferenceId}/rtmp/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body,
    };

    await sendPost(options);
};

/**
 * Stops an RTMP stream. You must use this API if the conference is protected using enhanced conference access control.
 *
 * @link https://docs.dolby.io/communications-apis/reference/stop-rtmp
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stopRtmp = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: 'api.voxeet.com',
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
 * Starts a Low Latency Stream to Millicast.
 *
 * @link https://docs.dolby.io/communications-apis/reference/start-lls
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 * @param streamName The Millicast stream name to which the conference will broadcasted.
 * @param publishingToken The Millicast publishing token used to identify the broadcaster.
 */
 export const startLls = async (accessToken: JwtToken, conferenceId: string, streamName: string, publishingToken: string): Promise<void> => {
    const body = JSON.stringify({
        streamName: streamName,
        publishingToken: publishingToken,
    });

    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/mix/${conferenceId}/lls/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
        body,
    };

    await sendPost(options);
};

/**
 * Stops an existing Low Latency Stream to Millicast.
 *
 * @link https://docs.dolby.io/communications-apis/reference/stop-lls
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
 export const stopLls = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/mix/${conferenceId}/lls/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};
