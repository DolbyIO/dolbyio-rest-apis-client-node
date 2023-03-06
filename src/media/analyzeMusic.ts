import { startJob, getJobResults } from './internal/jobsHelpers';
import JwtToken from '../types/jwtToken';
import { AnalyzeMusicJob } from './types/analyzeMusic';

/**
 * Start analyzing to learn about music in your media.
 *
 * The `input` location of your source media file and `output` location of your Analyze JSON results file are required.
 *
 * This is an asynchronous operation so you will receive a `job_id` to be used to get the job status and result.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-analyze-music-post
 *
 * Beta API
 * This API is being made available as an early preview.
 * If you have feedback on how you'd like to use the API please reach out to share your feedback with our team.
 * https://dolby.io/contact
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-analyze-music-post
 *
 * @returns The job identifier through a {@link Promise}.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/analyze/music', jobContent);
};

/**
 * Gets Music Analytics Status.
 *
 * For a given {@link jobId}, this method will check if the processing task has completed.
 *
 * When {@link AnalyzeMusicJob.status} is `Success`, you'll be able to retrieve your result from the `output` location you provided in the original {@link start} request.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-analyze-music-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The {@link AnalyzeMusicJob} object through a {@link Promise}.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<AnalyzeMusicJob> => {
    return await getJobResults<AnalyzeMusicJob>(accessToken, '/media/analyze/music', jobId);
};
