export interface ErrorResult {
    type: string;
    title: string;
    details: string;
}

export interface JobResult<T> {
    api_version: string;
    path: string;
    status: string;
    progress: number;
    result: T;
    error?: ErrorResult;
}
