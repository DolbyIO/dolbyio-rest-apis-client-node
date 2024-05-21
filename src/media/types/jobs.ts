export interface ListJobsOptions extends ListAllJobsOptions {
    /** Used when querying the next page of jobs. Specify the next_token that was returned in the previous call. */
    next_token?: string;
}

export interface ListAllJobsOptions {
    /** Query jobs that were submitted at or after the specified date and time (inclusive). */
    submitted_after?: string;
    /** Query jobs that were submitted at or before the specified date and time (inclusive). The `submitted_before` must be the same or later than `submitted_after`. */
    submitted_before?: number;
    /** Query jobs that have the specified status. `Running`, `Pending`, `Success`, `Failed` or `InternalError`. */
    status?: string;
}

/** Represents a job submitted to the Media APIs. */
export interface Job {
    /** Job identifier. */
    job_id: string;
    api_version: string;
    path: string;
    status: string;
    progress: number;
    duration: number;
    time_submitted: string;
    time_started: string;
    time_completed: string;
    expiry: string;
}

export interface JobsResponse {
    jobs: Array<Job>;
    next_token: string;
    count: number;
}
