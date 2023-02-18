import { startJob, getJobResults } from './internal/jobsHelpers';
import JwtToken from '../types/jwtToken';
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
 * This is an asynchronous operation. You receive a job identifier that you use to retrieve the results when the mastering is complete.
 *
 * To learn more, see the example requests and responses.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-preview-post
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-music-mastering-preview-post
 *
 * @returns The job identifier through a {@link Promise}.
 */
export const startPreview = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/master/preview', jobContent);
};

/**
 * Gets Mastering Preview Results
 *
 * For a given {@link jobId}, this method will check if the mastering task has completed.
 * When the status is Success you'll be able to retrieve your results from the outputs locations you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-preview-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The {@link MasteringPreviewJob} object through a {@link Promise}.
 */
export const getPreviewResults = async (accessToken: JwtToken, jobId: string): Promise<MasteringPreviewJob> => {
    return await getJobResults<MasteringPreviewJob>(accessToken, '/media/master/preview', jobId);
};

/**
 * Starts mastering to improve your music.
 *
 * The `inputs` location for your source media file as well as the `outputs` location for the processed media file are required.
 *
 * A `preset` applies dynamic EQ processing to shape your music to match a desired sound. There are also additional optional parameters that can be provided to control the mastering output.
 *
 * This is an asynchronous operation. You receive a job identifier that you use to retrieve the results when the mastering is complete.
 *
 * To learn more, see the example requests and responses.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-post
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-music-mastering-post
 *
 * @returns The job identifier through a {@link Promise}.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/master', jobContent);
};

/**
 * Gets Mastering Results
 *
 * For a given {@link jobId}, this method will check if the mastering task has completed.
 * When the status is Success you'll be able to retrieve your results from the outputs locations you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-music-mastering-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The {@link MasteringJob} object through a {@link Promise}.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<MasteringJob> => {
    return await getJobResults<MasteringJob>(accessToken, '/media/master', jobId);
};
