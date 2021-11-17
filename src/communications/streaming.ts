import { sendPost } from '../internal/httpHelpers';
import JwtToken from './types/jwtToken';

/**
 * Starts an RTMP live stream. Once the Dolby.io Communication API service started streaming to the target url,
 * a `Stream.Rtmp.InProgress` Webhook event will be sent. You must use this API if the conference is protected
 * using enhanced conference access control.
 *
 * @link https://docs.dolby.io/interactivity/reference/postrtmpstart
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
    };

    await sendPost(options);
};

/**
 * @deprecated
 * Starts an RTMP live stream. Once the Dolby.io Communication API service started streaming to the target url,
 * a `Stream.Rtmp.InProgress` Webhook event will be sent.
 *
 * @link https://docs.dolby.io/interactivity/reference/postrtmpstartv1
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param conferenceId Identifier of the conference.
 * @param rtmpUrls List of the RTMP endpoints where to send the RTMP stream to.
 */
export const startRtmpBasicAuth = async (
    consumerKey: string,
    consumerSecret: string,
    conferenceId: string,
    rtmpUrls: string | Array<string>
): Promise<void> => {
    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const uri = typeof rtmpUrls === 'string' ? rtmpUrls : rtmpUrls.join('|');
    const body = JSON.stringify({ uri: uri });

    const options = {
        hostname: 'session.voxeet.com',
        path: `/v1/api/conferences/mix/${conferenceId}/live/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authz}`,
        },
    };

    await sendPost(options);
};

/**
 * Stops an RTMP stream. You must use this API if the conference is protected using enhanced conference access control.
 *
 * @link https://docs.dolby.io/interactivity/reference/postrtmpstop
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
 * @deprecated
 * Stops an RTMP stream.
 *
 * @link https://docs.dolby.io/interactivity/reference/postrtmpstopv1
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param conferenceId Identifier of the conference.
 */
export const stopRtmpBasicAuth = async (consumerKey: string, consumerSecret: string, conferenceId: string): Promise<void> => {
    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const options = {
        hostname: 'session.voxeet.com',
        path: `/v1/api/conferences/mix/${conferenceId}/live/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authz}`,
        },
    };

    await sendPost(options);
};

/**
 * Starts an HTTP Live Stream (HLS). The HLS URL is included in the Stream.Hls.InProgress Webhook event.
 * You must use this API if the conference is protected using enhanced conference access control.
 *
 * @link https://docs.dolby.io/interactivity/reference/posthlsstart
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const startHls = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/mix/${conferenceId}/hls/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};

/**
 * @deprecated
 * Starts an HTTP Live Stream (HLS). The HLS URL is included in the Stream.Hls.InProgress Webhook event.
 *
 * @link https://docs.dolby.io/interactivity/reference/posthlsstartv1
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param conferenceId Identifier of the conference.
 */
export const startHlsBasicAuth = async (consumerKey: string, consumerSecret: string, conferenceId: string): Promise<void> => {
    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const options = {
        hostname: 'session.voxeet.com',
        path: `/v1/api/conferences/mix/${conferenceId}/hls/start`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authz}`,
        },
    };

    await sendPost(options);
};

/**
 * Stops an HTTP Live Stream (HLS). You must use this API if the conference is protected using enhanced conference access control.
 *
 * @link https://docs.dolby.io/interactivity/reference/posthlsstop
 *
 * @param accessToken Access token to use for authentication.
 * @param conferenceId Identifier of the conference.
 */
export const stopHls = async (accessToken: JwtToken, conferenceId: string): Promise<void> => {
    const options = {
        hostname: 'api.voxeet.com',
        path: `/v2/conferences/mix/${conferenceId}/hls/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendPost(options);
};

/**
 * @deprecated
 * Stops an HTTP Live Stream (HLS).
 *
 * @link https://docs.dolby.io/interactivity/reference/posthlsstopv1
 *
 * @param consumerKey Your Dolby.io Consumer Key.
 * @param consumerSecret Your Dolby.io Consumer Secret.
 * @param conferenceId Identifier of the conference.
 */
export const stopHlsBasicAuth = async (consumerKey: string, consumerSecret: string, conferenceId: string): Promise<void> => {
    const authz = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const options = {
        hostname: 'session.voxeet.com',
        path: `/v1/api/conferences/mix/${conferenceId}/hls/stop`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${authz}`,
        },
    };

    await sendPost(options);
};
