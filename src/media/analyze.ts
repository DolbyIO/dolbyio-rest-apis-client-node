import { startJob, getJobResults } from './internal/jobsHelpers';
import JwtToken from '../types/jwtToken';
import { AnalyzeJob } from './types/analyze';

/**
 * Starts analyzing to learn about your media.
 *
 * The `input` location of your source media file and `output` location of your Analyze JSON results file are required.
 *
 * This is an asynchronous operation so you will receive a `job_id` to be used to get the job status and result.
 *
 * There are additional optional parameters that can be provided to identify the type of content and additional loudness or validation requirements. See the samples for examples of what requests and responses look like.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-analyze-post
 *
 * Beta API
 * This API is being made available as an early preview.
 * If you have feedback on how you'd like to use the API please reach out to share your feedback with our team.
 * https://dolby.io/contact
 *
 * Content Length
 *
 * Media content with duration less than 2 seconds will not be processed. The API will return an ERROR in this case.
 *
 * @param accessToken Access token to use for authentication.
 * @param jobContent Content of the job description as a JSON payload. You can find the definition at this URL: https://docs.dolby.io/media-apis/reference/media-analyze-post
 *
 * @returns The job identifier through a {@link Promise}.
 */
export const start = async (accessToken: JwtToken, jobContent: string): Promise<string | null> => {
    return await startJob(accessToken, '/media/analyze', jobContent);
};

/**
 * Gets Analyze Status.
 *
 * For a given job_id, this method will check the job status.
 *
 * When `status==Success` you'll be able to retrieve your result from the output location you provided in the original POST.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-analyze-get
 *
 * @param accessToken Access token to use for authentication.
 * @param jobId Identifier of the job to retrieve.
 *
 * @returns The {@link AnalyzeJob} object through a {@link Promise}.
 */
export const getResults = async (accessToken: JwtToken, jobId: string): Promise<AnalyzeJob> => {
    return await getJobResults<AnalyzeJob>(accessToken, '/media/analyze', jobId);
};
