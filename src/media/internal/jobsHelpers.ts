import { sendPost, sendGet, AuthRequestOptions } from './httpHelpers';
import { API_HOSTNAME } from './urls';
import JwtToken from '../../types/jwtToken';

export const startJob = async (accessToken: JwtToken, urlPath: string, jobContent: string): Promise<string | null> => {
    const requestOptions: AuthRequestOptions = {
        hostname: API_HOSTNAME,
        path: urlPath,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        accessToken,
        body: jobContent,
    };

    const response = await sendPost(requestOptions);
    if (response.hasOwnProperty('job_id')) {
        return response['job_id'];
    }

    return null;
};

export const getJobResults = async <TResult>(accessToken: JwtToken, urlPath: string, jobId: string): Promise<TResult> => {
    const requestOptions: AuthRequestOptions = {
        hostname: API_HOSTNAME,
        path: urlPath,
        params: {
            job_id: jobId,
        },
        headers: {},
        accessToken,
    };

    const response = await sendGet(requestOptions);
    return response as TResult;
};
