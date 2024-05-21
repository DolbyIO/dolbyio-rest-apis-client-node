import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import { MediaAsset } from './types/recordFiles';

/**
 * Gets current total bytes of recorded files in storage.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/recordfilesv2_readrecordmediaasset
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param mediaAssetId Identifier of the media asset to read.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives the number of bytes used by the recorded files.
 */
export const readMediaAsset = async (apiSecret: string, mediaAssetId: string): Promise<MediaAsset> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v2/record_files/${mediaAssetId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<MediaAsset>(options);
};

/**
 * Deletes multiple media assets from storage.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/recordfilesv2_deleterecordmediaassets
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param assetIds List of the media assets identifiers to delete from storage.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag indicating if the operation has succeeded.
 */
export const deleteMediaAssets = async (apiSecret: string, assetIds: number[]): Promise<boolean> => {
    const body = {
        mediaAssetIds: assetIds,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v2/record_files/delete',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPost<boolean>(options);
};

/**
 * Deletes all recorded file from storage.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/recordfiles_deleteallrecordfiles
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag indicating if the operation has succeeded.
 */
export const deleteAllFiles = async (apiSecret: string): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/record_files/delete/all',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<boolean>(options);
};

/**
 * Gets current total bytes of recorded files in storage.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/recordfiles_recordfileusage
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives the number of bytes used by the recorded files.
 */
export const usage = async (apiSecret: string): Promise<number> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/record_files/usage',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    const response = await sendGet<{ totalBytes: number }>(options);
    return response.totalBytes;
};

/**
 * Gets total number of gigabyte hours of storage used within date range.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/recordfiles_recordfileusagebillable
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param startDate Start date from which to pull the recorded files usage.
 * @param stopDate End date from which to pull the recorded files usage.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives the number of gigabyte hours used by the recorded files. Measured as binary gigabytes (1024^3) per hour.
 */
export const usageBillable = async (apiSecret: string, startDate: string, stopDate: string): Promise<number> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/record_files/usage',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    const response = await sendGet<{ gigabyteHours: number }>(options);
    return response.gigabyteHours;
};
