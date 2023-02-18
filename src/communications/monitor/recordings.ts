import { sendGet, sendDelete, download } from '../../internal/httpHelpers';
import { getAll } from '../internal/httpHelpers';
import { COMMS_HOSTNAME } from '../internal/urls';
import JwtToken from '../../types/jwtToken';
import { GetRecordingsOptions, GetAllRecordingsOptions, GetRecordingsResponse, Recording, GetRecordingOptions, DolbyVoiceRecording } from '../types/recordings';

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks only the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns A {@link GetRecordingsResponse} object through a {@link Promise}.
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
        hostname: COMMS_HOSTNAME,
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
 * @link https://docs.dolby.io/communications-apis/reference/get-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns An array of {@link Recording} objects through a {@link Promise}.
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
        hostname: COMMS_HOSTNAME,
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
 * @link https://docs.dolby.io/communications-apis/reference/get-conference-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recording.
 *
 * @returns An array of {@link Recording} objects through a {@link Promise}.
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
        hostname: COMMS_HOSTNAME,
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
 * @link https://docs.dolby.io/communications-apis/reference/delete-conference-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param confId Identifier of the conference.
 */
export const deleteRecording = async (accessToken: JwtToken, confId: string): Promise<void> => {
    const requestOptions = {
        hostname: COMMS_HOSTNAME,
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
 * @link https://docs.dolby.io/communications-apis/reference/get-dolby-voice-audio-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param confId Identifier of the conference.
 *
 * @returns A {@link DolbyVoiceRecording} object through a {@link Promise}.
 */
export const getDolbyVoiceRecording = async (accessToken: JwtToken, confId: string): Promise<DolbyVoiceRecording> => {
    const requestOptions = {
        hostname: COMMS_HOSTNAME,
        path: `/v1/monitor/conferences/${confId}/recordings/audio`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as DolbyVoiceRecording;
};
