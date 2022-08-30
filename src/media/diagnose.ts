import { sendPost, sendGet, AuthRequestOptions } from './internal/httpHelpers';
import { API_HOSTNAME } from './internal/urls';
import JwtToken from '../types/jwtToken';
import { DiagnoseJob } from './types/diagnose';

/**
 * Starts diagnosing to learn about the audio quality of your media.
 *
 * The `input` location of your source media file is required.
 *
 * This is an asynchronous operation so you will receive a `job_id` to be used to get the job status and result.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-diagnose-post
 *
 * Beta API
 * This API is being made available as an early preview.
 * If you have feedback on how you'd like to use the API please reach out to share your feedback with our team.
 * https://dolby.io/contact
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-diagnose-post
 *
 * @returns The job identifier through a `Promise`.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    const requestOptions: AuthRequestOptions = {
        hostname: API_HOSTNAME,
        path: '/media/diagnose',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        accessToken,
        body: jobContent,
    };

    const response = await sendPost(requestOptions);
    if (response.hasOwnProperty('job_id')) {
        return response['job_id'];
    }

    return null;
};

/**
 * Gets Diagnose Results.
 *
 * For a given job_id, this method will check if the processing task has completed.
 *
 * The `progress` attribute provides a percentage of job progress.
 *
 * If the `status` is Success then the json result will be returned in the response.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-diagnose-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The `DiagnoseJob` object through a `Promise`.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<DiagnoseJob> => {
    const requestOptions: AuthRequestOptions = {
        hostname: API_HOSTNAME,
        path: '/media/diagnose',
        params: {
            job_id: jobId,
        },
        headers: {},
        accessToken,
    };

    const response = await sendGet(requestOptions);
    return response as DiagnoseJob;
};
