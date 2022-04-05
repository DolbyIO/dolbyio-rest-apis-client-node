import * as httpHelpers from '../../internal/httpHelpers';
import JwtToken from '../types/jwtToken';

export interface AuthRequestOptions extends httpHelpers.RequestOptions {
    auth: string | JwtToken;
}

/**
 * Sends a GET request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a Promise.
 */
export const sendGet = (options: AuthRequestOptions) => {
    if (typeof options.auth === 'string') {
        options.headers['x-api-key'] = options.auth;
    } else {
        options.headers['Authorization'] = `Bearer ${options.auth.access_token}`;
    }

    return httpHelpers.sendGet(options);
};

/**
 * Sends a POST request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a Promise.
 */
export const sendPost = (options: AuthRequestOptions) => {
    if (typeof options.auth === 'string') {
        options.headers['x-api-key'] = options.auth;
    } else {
        options.headers['Authorization'] = `Bearer ${options.auth.access_token}`;
    }

    return httpHelpers.sendPost(options);
};

/**
 * Sends a PUT request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a Promise.
 */
export const sendPut = (options: AuthRequestOptions) => {
    if (typeof options.auth === 'string') {
        options.headers['x-api-key'] = options.auth;
    } else {
        options.headers['Authorization'] = `Bearer ${options.auth.access_token}`;
    }

    return httpHelpers.sendPut(options);
};

/**
 * Sends a DELETE request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a Promise.
 */
export const sendDelete = (options: AuthRequestOptions) => {
    if (typeof options.auth === 'string') {
        options.headers['x-api-key'] = options.auth;
    } else {
        options.headers['Authorization'] = `Bearer ${options.auth.access_token}`;
    }

    return httpHelpers.sendDelete(options);
};

/**
 * Download a file.
 *
 * @param filepath Where to save the file.
 * @param options Request options.
 *
 * @returns A JSON payload object through a Promise.
 */
export const download = (filepath: string, options: AuthRequestOptions) => {
    if (typeof options.auth === 'string') {
        options.headers['x-api-key'] = options.auth;
    } else {
        options.headers['Authorization'] = `Bearer ${options.auth.access_token}`;
    }

    return httpHelpers.download(filepath, options);
};
