import { sendGet, sendDelete, download } from '../../internal/httpHelpers';
import { getAll } from '../internal/httpHelpers';
import JwtToken from '../types/jwtToken';
import { GetRecordingsOptions, GetAllRecordingsOptions, GetRecordingsResponse, Recording, GetRecordingOptions, DolbyVoiceRecording } from '../types/recordings';

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks only the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * @link https://docs.dolby.io/interactivity/reference/getrecordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns A `GetRecordingsResponse` object through a `Promise`.
 */
export const getRecordings = async (accessToken: JwtToken, options: GetRecordingsOptions): Promise<GetRecordingsResponse> => {
    const optionsDefault: GetRecordingsOptions = {
        from: 0,
        to: 9999999999999,
        max: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.max.toString(),
    };

    if (opts.start) {
        params['start'] = opts.start;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: '/v1/monitor/recordings',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as GetRecordingsResponse;
};

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks only the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * @link https://docs.dolby.io/interactivity/reference/getrecordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns An array of `Recording` objects through a `Promise`.
 */
export const getAllRecordings = async (accessToken: JwtToken, options: GetAllRecordingsOptions): Promise<Array<Recording>> => {
    const optionsDefault: GetAllRecordingsOptions = {
        from: 0,
        to: 9999999999999,
        page_size: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.page_size.toString(),
    };

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: '/v1/monitor/recordings',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    return await getAll<Recording>(requestOptions, 'recordings');
};

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * @link https://docs.dolby.io/interactivity/reference/getconferencerecordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the webhooks.
 *
 * @returns An array of `Recording` objects through a `Promise`.
 */
export const getRecording = async (accessToken: JwtToken, options: GetRecordingOptions): Promise<Array<Recording>> => {
    const optionsDefault: GetRecordingsOptions = {
        from: 0,
        to: 9999999999999,
        max: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.max.toString(),
    };

    if (opts.start) {
        params['start'] = opts.start;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: `/v1/monitor/conferences/${opts.confId}/recordings`,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return (response as GetRecordingsResponse).recordings;
};

/**
 * Delete all recording data related to a specific conference.
 *
 * **Warning**: After deleting the recording, it is not possible to restore the recording data.
 *
 * @link https://docs.dolby.io/interactivity/reference/deleteconferencerecordings
 *
 * @param accessToken Access token to use for authentication.
 * @param confId Identifier of the conference.
 */
export const deleteRecording = async (accessToken: JwtToken, confId: string): Promise<void> => {
    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: `/v1/monitor/conferences/${confId}/recordings`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendDelete(requestOptions);
};

/**
 * Get details of all Dolby Voice-based audio recordings, and associated split recordings,
 * for a given conference and download the conference recording in the MP3 audio format.
 *
 * @link https://docs.dolby.io/interactivity/reference/getconferenceaudiorecording
 *
 * @param accessToken Access token to use for authentication.
 * @param confId Identifier of the conference.
 *
 * @returns A `DolbyVoiceRecording` object through a `Promise`.
 */
export const getDolbyVoiceRecording = async (accessToken: JwtToken, confId: string): Promise<DolbyVoiceRecording> => {
    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: `/v1/monitor/conferences/${confId}/recordings/audio`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as DolbyVoiceRecording;
};

/**
 * Download the conference recording in the MP4 video format.
 * For more information, see the [Recording](https://docs.dolby.io/interactivity/docs/recording) document.
 *
 * @link https://docs.dolby.io/interactivity/reference/getconferencemp4recording
 *
 * @param accessToken Access token to use for authentication.
 * @param confId Identifier of the conference.
 * @param filepath Where to save the file.
 */
export const downloadMp4Recording = async (accessToken: JwtToken, confId: string, filepath: string): Promise<void> => {
    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: `/v1/monitor/conferences/${confId}/recordings/mp4`,
        headers: {
            Accept: 'video/mp4',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await download(filepath, requestOptions);
};

/**
 * Download the conference recording in the MP3 audio format.
 * For more information, see the [Recording](https://docs.dolby.io/interactivity/docs/recording) document.
 *
 * @link https://docs.dolby.io/interactivity/reference/getconferencemp3recording
 *
 * @param accessToken Access token to use for authentication.
 * @param confId Identifier of the conference.
 * @param filepath Where to save the file.
 */
export const downloadMp3Recording = async (accessToken: JwtToken, confId: string, filepath: string): Promise<void> => {
    const requestOptions = {
        hostname: 'api.voxeet.com',
        path: `/v1/monitor/conferences/${confId}/recordings/mp3`,
        headers: {
            Accept: 'video/mpeg',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await download(filepath, requestOptions);
};
