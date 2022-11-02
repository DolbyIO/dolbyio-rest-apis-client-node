import { startJob, getJobResults } from './internal/jobsHelpers';
import JwtToken from '../types/jwtToken';
import { TranscodeJob } from './types/transcode';

/**
 * Starts Transcoding.
 *
 * Start transcoding to modify the size, bitrates, and formats for your media.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-transcode-post
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-transcode-post
 *
 * @returns The job identifier through a `Promise`.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/transcode', jobContent);
};

/**
 * Gets Transcode Results.
 *
 * For a given job_id, this method will check if the processing task has completed and return the transcode results.
 *
 * When the status is Success you'll be able to retrieve your result from the output location you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-transcode-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The `TranscodeJob` object through a `Promise`.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<TranscodeJob> => {
    return await getJobResults<TranscodeJob>(accessToken, '/media/transcode', jobId);
};
