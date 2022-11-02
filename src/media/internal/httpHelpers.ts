import * as httpHelpers from '../../internal/httpHelpers';
import JwtToken from '../../types/jwtToken';

export interface AuthRequestOptions extends httpHelpers.RequestOptions {
    accessToken: JwtToken;
}

/**
 * Sends a GET request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a Promise.
 */
export const sendGet = (options: AuthRequestOptions) => {
    options.headers['Authorization'] = `Bearer ${options.accessToken.access_token}`;

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
    options.headers['Authorization'] = `Bearer ${options.accessToken.access_token}`;

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
    options.headers['Authorization'] = `Bearer ${options.accessToken.access_token}`;

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
    options.headers['Authorization'] = `Bearer ${options.accessToken.access_token}`;

    return httpHelpers.sendDelete(options);
};
