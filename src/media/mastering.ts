import { sendPost, sendGet, AuthRequestOptions } from './internal/httpHelpers';
import JwtToken from './types/jwtToken';
import { MasteringPreviewJob, MasteringJob } from './types/mastering';

/**
 * Starts mastering preview to improve your music.
 * 
 * The `inputs` location for your source media file as well as the `outputs` location for the processed media file are required.
 * 
 * A `preset` applies dynamic EQ processing to shape your music to match a desired sound. There are also additional optional parameters that can be provided to control the mastering output.
 * 
 * A `segment` object specifying preview `start` may optionally be provided.
 * 
 * This is an asynchronous operation. You receive a `job_id` that you use to retrieve the results when the mastering is complete.
 * 
 * To learn more, see the example requests and responses.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-post
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-music-mastering-post
 *
 * @returns The job identifier through a `Promise`.
 */
 export const startPreview = async (auth: string | JwtToken, jobContent: string): Promise<string | null> => {
    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/master/preview',
        headers: {},
        auth,
        body: jobContent,
    };

    const response = await sendPost(requestOptions);
    if (response.hasOwnProperty('job_id')) {
        return response['job_id'];
    }

    return null;
};

/**
 * Gets Mastering Preview Results
 *
 * For a given job_id, this method will check if the mastering task has completed.
 * When the status is Success you'll be able to retrieve your results from the outputs locations you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-preview-get
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The `MasteringPreviewJob` object through a `Promise`.
 */
 export const getPreviewResults = async (auth: string | JwtToken, jobId: string): Promise<MasteringPreviewJob> => {
    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/master/preview',
        params: {
            job_id: jobId,
        },
        headers: {},
        auth,
    };

    const response = await sendGet(requestOptions);
    return response as MasteringPreviewJob;
};

/**
 * Starts mastering to improve your music.
 * 
 * The `inputs` location for your source media file as well as the `outputs` location for the processed media file are required.
 * 
 * A `preset` applies dynamic EQ processing to shape your music to match a desired sound. There are also additional optional parameters that can be provided to control the mastering output.
 * 
 * This is an asynchronous operation. You receive a `job_id` that you use to retrieve the results when the mastering is complete.
 * 
 * To learn more, see the example requests and responses.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-post
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-music-mastering-post
 *
 * @returns The job identifier through a `Promise`.
 */
export const start = async (auth: string | JwtToken, jobContent: string): Promise<string | null> => {
    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/master',
        headers: {},
        auth,
        body: jobContent,
    };

    const response = await sendPost(requestOptions);
    if (response.hasOwnProperty('job_id')) {
        return response['job_id'];
    }

    return null;
};

/**
 * Gets Mastering Results
 *
 * For a given job_id, this method will check if the mastering task has completed.
 * When the status is Success you'll be able to retrieve your results from the outputs locations you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-get
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The `MasteringJob` object through a `Promise`.
 */
export const getResults = async (auth: string | JwtToken, jobId: string): Promise<MasteringJob> => {
    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/master',
        params: {
            job_id: jobId,
        },
        headers: {},
        auth,
    };

    const response = await sendGet(requestOptions);
    return response as MasteringJob;
};
