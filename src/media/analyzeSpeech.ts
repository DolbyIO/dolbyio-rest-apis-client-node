import { startJob, getJobResults } from './internal/jobsHelpers';
import { JwtToken } from './types/jwtToken';
import { AnalyzeSpeechJob } from './types/analyzeSpeech';

/**
 * Starts analyzing to learn about speech in your media.
 *
 * The `input` location of your source media file and `output` location of your Analyze JSON results file are required.
 *
 * This is an asynchronous operation so you will receive a `job_id` to be used to get the job status and result.
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload.
 *
 * @returns The job identifier through a {@link Promise}.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/analyze/speech', jobContent);
};

/**
 * Gets Speech Analytics Status.
 *
 * For a given {@link jobId}, this method will check if the processing task has completed.
 *
 * When {@link AnalyzeSpeechJob.status} is `Success`, you'll be able to retrieve your result from the `output` location you provided in the original {@link start} request.
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The {@link AnalyzeSpeechJob} object through a {@link Promise}.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<AnalyzeSpeechJob> => {
    return await getJobResults<AnalyzeSpeechJob>(accessToken, '/media/analyze/speech', jobId);
};
