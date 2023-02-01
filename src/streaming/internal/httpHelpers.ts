import * as httpHelpers from '../../internal/httpHelpers';
import { BaseResponse } from '../types/core';

/**
 * Sends a GET request.
 *
 * @param options Request options.
 *
 * @returns A `TData` object through a Promise.
 */
export async function sendGet<TData>(options: httpHelpers.RequestOptions): Promise<TData> {
    const response = await httpHelpers.sendGet(options);
    return (response as BaseResponse<TData>).data;
}

/**
 * Sends a POST request.
 *
 * @param options Request options.
 *
 * @returns A `TData` object through a Promise.
 */
export async function sendPost<TData>(options: httpHelpers.RequestOptions): Promise<TData> {
    const response = await httpHelpers.sendPost(options);
    return (response as BaseResponse<TData>).data;
}

/**
 * Sends a PUT request.
 *
 * @param options Request options.
 *
 * @returns A JSON payload object through a Promise.
 */
export async function sendPut<TData>(options: httpHelpers.RequestOptions): Promise<TData> {
    const response = await httpHelpers.sendPut(options);
    return (response as BaseResponse<TData>).data;
}

/**
 * Sends a DELETE request.
 *
 * @param options Request options.
 *
 * @returns A `TData` object through a Promise.
 */
export async function sendDelete<TData>(options: httpHelpers.RequestOptions): Promise<TData> {
    const response = await httpHelpers.sendDelete(options);
    return (response as BaseResponse<TData>).data;
}

/**
 * Sends a PATCH request.
 *
 * @param options Request options.
 *
 * @returns A `TData` object through a Promise.
 */
export async function sendPatch<TData>(options: httpHelpers.RequestOptions): Promise<TData> {
    const response = await httpHelpers.sendPatch(options);
    return (response as BaseResponse<TData>).data;
}
