import { sendPost, sendGet, AuthRequestOptions } from './internal/httpHelpers';
import { API_HOSTNAME } from './internal/urls';
import JwtToken from '../types/jwtToken';
import { EnhanceJob } from './types/enhance';

/**
 * Starts enhancing to improve your media.
 *
 * The input location for your source media file as well as the output location for the processed result are required.
 *
 * This is an asynchronous operation so you will receive a job_id where you can retrieve the results when enhancement is complete.
 *
 * There are additional optional parameters that can be provided to control and select the type of enhancements made. See the samples for some examples of what requests and responses look like.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-enhance-post
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-enhance-post
 *
 * @returns The job identifier through a `Promise`.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    const requestOptions: AuthRequestOptions = {
        hostname: API_HOSTNAME,
        path: '/media/enhance',
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
 * Gets Enhance Results
 *
 * For a given job_id, this method will check if the processing task has completed and return the enhanced results.
 *
 * When the status is Success you'll be able to retrieve your result from the output location you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-enhance-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The `EnhanceJob` object through a `Promise`.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<EnhanceJob> => {
    const requestOptions: AuthRequestOptions = {
        hostname: API_HOSTNAME,
        path: '/media/enhance',
        params: {
            job_id: jobId,
        },
        headers: {},
        accessToken,
    };

    const response = await sendGet(requestOptions);
    return response as EnhanceJob;
};
