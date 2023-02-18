import fs from 'fs';
import { https } from 'follow-redirects';
import coreHttp from 'http';
import coreHttps from 'https';
import { URLSearchParams } from 'url';
import { version } from '../index';

interface SendRequestOptions extends RequestOptions {
    method: string;
}

export interface RequestOptions {
    hostname: string;
    path: string;
    params?: NodeJS.Dict<string>;
    headers: coreHttp.OutgoingHttpHeaders;
    body?: string;
}

/**
 * Sends a POST request.
 *
 * @param options request options.
 *
 * @returns A JSON payload object through a {@link Promise}.
 */
const sendRequest = (options: SendRequestOptions) => {
    return new Promise<any>((resolve, reject) => {
        let path = options.path;
        if (options.params && Object.keys(options.params).length > 0) {
            const searchParams = new URLSearchParams(options.params);
            path += `?${searchParams}`;
        }

        const opts: coreHttps.RequestOptions = {
            hostname: options.hostname,
            port: 443,
            path: path,
            method: options.method,
            headers: options.headers,
        };

        // Override the User Agent
        opts.headers['User-Agent'] = `DolbyIoRestApiSdk/${version}; Node/${process.versions.node}`;

        const req = https.request(opts, (res) => {
            console.log(`[${opts.method}] ${res.statusCode} - https://${opts.hostname}${opts.path}`);

            let data = '';
            res.on('data', (chunk) => {
                data = data + chunk.toString();
            });

            res.on('end', () => {
                if (data.length > 0) {
                    if (res.statusCode < 200 || res.statusCode >= 400) {
                        reject('This request has been rejected with the response code ' + res.statusCode + ' and description: ' + data);
                    } else {
                        const json = JSON.parse(data);
                        resolve(json);
                    }
                } else {
                    if (res.statusCode < 200 || res.statusCode >= 400) {
                        reject('This request has been rejected with the response code ' + res.statusCode);
                    } else {
                        resolve(null);
                    }
                }
            });
        });

        req.on('error', (error) => {
            console.error(error);
            reject(error);
        });

        if (options.body && options.body.length > 0) {
            req.write(options.body);
        }

        req.end();
    });
};

/**
 * Sends a GET request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a {@link Promise}.
 */
export const sendGet = (options: RequestOptions) => {
    const sendRequestOptions: SendRequestOptions = {
        method: 'GET',
        ...options,
    };

    return sendRequest(sendRequestOptions);
};

/**
 * Sends a POST request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a {@link Promise}.
 */
export const sendPost = (options: RequestOptions) => {
    if (!options.body) {
        // The REST APIs don't support an empty payload
        options.body = '{}';
        options.headers['Content-Type'] = 'application/json';
    }

    options.headers['Content-Length'] = options.body.length;

    const sendRequestOptions: SendRequestOptions = {
        method: 'POST',
        ...options,
    };

    return sendRequest(sendRequestOptions);
};

/**
 * Sends a PUT request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a {@link Promise}.
 */
export const sendPut = (options: RequestOptions) => {
    options.headers['Content-Length'] = options.body.length;

    const sendRequestOptions: SendRequestOptions = {
        method: 'PUT',
        ...options,
    };

    return sendRequest(sendRequestOptions);
};

/**
 * Sends a DELETE request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a {@link Promise}.
 */
export const sendDelete = async (options: RequestOptions) => {
    const sendRequestOptions: SendRequestOptions = {
        method: 'DELETE',
        ...options,
    };

    return await sendRequest(sendRequestOptions);
};

/**
 * Sends a PATCH request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a {@link Promise}.
 */
export const sendPatch = async (options: RequestOptions) => {
    const sendRequestOptions: SendRequestOptions = {
        method: 'PATCH',
        ...options,
    };

    return await sendRequest(sendRequestOptions);
};

/**
 * Download a file.
 *
 * @param filepath Where to save the file.
 * @param options Request options.
 */
export const download = (filepath: string, options: RequestOptions) => {
    const sendRequestOptions: SendRequestOptions = {
        method: 'GET',
        ...options,
    };

    return new Promise<void>((resolve, reject) => {
        let path = sendRequestOptions.path;
        if (sendRequestOptions.params && Object.keys(sendRequestOptions.params).length > 0) {
            const searchParams = new URLSearchParams(sendRequestOptions.params);
            path += `?${searchParams}`;
        }

        const opts: coreHttps.RequestOptions = {
            hostname: sendRequestOptions.hostname,
            port: 443,
            path: path,
            method: sendRequestOptions.method,
            headers: sendRequestOptions.headers,
        };

        // Override the User Agent
        opts.headers['User-Agent'] = `DolbyIoRestApiSdk/${version}; Node/${process.versions.node}`;

        const req = https.request(opts, (res) => {
            console.log(`[${opts.method}] ${res.statusCode} - https://${opts.hostname}${opts.path}`);
            if (res.statusCode < 200 || res.statusCode >= 400) {
                reject('This request has been rejected with the response code ' + res.statusCode);
                return;
            }

            const fileStream = fs.createWriteStream(filepath, { autoClose: true });

            fileStream.on('finish', () => {
                resolve();
            });

            fileStream.on('error', (error) => {
                console.error(error);
                reject(error);
            });

            res.pipe(fileStream);
        });

        req.on('error', (error) => {
            console.error(error);
            reject(error);
        });

        if (options.body && options.body.length > 0) {
            req.write(options.body);
        }

        req.end();
    });
};
