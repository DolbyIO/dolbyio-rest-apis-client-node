import { startJob, getJobResults } from './internal/jobsHelpers';
import JwtToken from '../types/jwtToken';
import { EnhanceJob } from './types/enhance';

/**
 * Starts enhancing to improve your media.
 *
 * The input location for your source media file as well as the output location for the processed result are required.
 *
 * This is an asynchronous operation so you will receive a job identifier where you can retrieve the results when enhancement is complete.
 *
 * There are additional optional parameters that can be provided to control and select the type of enhancements made. See the samples for some examples of what requests and responses look like.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-enhance-post
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-enhance-post
 *
 * @returns The job identifier through a {@link Promise}.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/enhance', jobContent);
};

/**
 * Gets Enhance Results
 *
 * For a given {@link jobId}, this method will check if the processing task has completed and return the enhanced results.
 *
 * When the {@link EnhanceJob.status} is Success you'll be able to retrieve your result from the output location you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-enhance-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The {@link EnhanceJob} object through a {@link Promise}.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<EnhanceJob> => {
    return await getJobResults<EnhanceJob>(accessToken, '/media/enhance', jobId);
};
