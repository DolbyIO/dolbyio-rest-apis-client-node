import { sendGet, sendPost, AuthRequestOptions } from './internal/httpHelpers';
import JwtToken from './types/jwtToken';
import { ListJobsOptions, ListAllJobsOptions, JobsResponse, Job } from './types/jobs';

/**
 * Query Media Jobs.
 * List of jobs previously submitted, up to the last 31 days.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-jobs-get
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param options Options to request the list of jobs.
 *
 * @returns A `JobsResponse` object through a `Promise`.
 */
export const list = async (auth: string | JwtToken, options: ListJobsOptions): Promise<JobsResponse> => {
    const params = {};
    if (options.submitted_after) {
        params['submitted_after'] = options.submitted_after;
    }
    if (options.submitted_before) {
        params['submitted_before'] = options.submitted_before;
    }
    if (options.status) {
        params['status'] = options.status;
    }
    if (options.next_token) {
        params['next_token'] = options.next_token;
    }

    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/jobs',
        params,
        headers: {},
        auth,
    };

    const response = await sendGet(requestOptions);
    return response as JobsResponse;
};

/**
 * Query Media Jobs.
 * List of all jobs previously submitted, up to the last 31 days.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-jobs-get
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param options Options to request the list of jobs.
 *
 * @returns An array of `Job` objects through a `Promise`.
 */
export const listAll = async (auth: string | JwtToken, options: ListAllJobsOptions): Promise<Array<Job>> => {
    const params = {};
    if (options.submitted_after) {
        params['submitted_after'] = options.submitted_after;
    }
    if (options.submitted_before) {
        params['submitted_before'] = options.submitted_before;
    }
    if (options.status) {
        params['status'] = options.status;
    }

    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/jobs',
        headers: {},
        auth,
    };

    const result: Array<Job> = [];

    do {
        requestOptions.params = params;

        const response = (await sendGet(requestOptions)) as JobsResponse;

        for (let index = 0; index < response.jobs.length; index++) {
            const object = response.jobs[index];
            result.push(object);
        }

        if (!response.next_token || response.next_token.length <= 0) {
            break;
        }

        params['next_token'] = response.next_token;
    } while (true);

    return result;
};

/**
 * Requests cancellation of a previously submitted job.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-jobs-cancel-post
 *
 * @param auth Your Dolby.io Media API Key or a JWT Token.
 * @param jobId Identifier of the job to cancel.
 */
export const cancel = async (auth: string | JwtToken, jobId: string): Promise<void> => {
    const params = {
        job_id: jobId,
    };

    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/jobs/cancel',
        headers: {},
        auth,
        params: params,
    };

    await sendPost(requestOptions);
};
