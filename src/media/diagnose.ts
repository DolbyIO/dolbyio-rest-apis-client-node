import { startJob, getJobResults } from './internal/jobsHelpers';
import { JwtToken } from './types/jwtToken';
import { DiagnoseJob } from './types/diagnose';

/**
 * Starts diagnosing to learn about the audio quality of your media.
 *
 * The `input` location of your source media file is required.
 *
 * This is an asynchronous operation so you will receive a job identifier to be used to get the job status and result.
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload.
 *
 * @returns The job identifier through a {@link Promise}.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/diagnose', jobContent);
};

/**
 * Gets Diagnose Results.
 *
 * For a given {@link jobId}, this method will check if the processing task has completed.
 *
 * The {@link DiagnoseJob.progress} attribute provides a percentage of job progress.
 *
 * If the {@link DiagnoseJob.status} is Success then the json result will be returned in the response.
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The {@link DiagnoseJob} object through a {@link Promise}.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<DiagnoseJob> => {
    return await getJobResults<DiagnoseJob>(accessToken, '/media/diagnose', jobId);
};
