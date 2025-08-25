import * as Urls from '../urls';
import { CreateAssetClipRequest, ListMediaAssetsQueryParams, AssetResponseData } from './types/asset';
import { sendDelete, sendGet, sendPost } from './internal/httpHelpers';

/**
 * Creates a new media asset.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-assets-create-media-asset/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param clipRequest The request body for creating a new media asset.
 * @param idempotencyKey Optional, The unique identifier for this request to prevent duplicate submissions.
 */
export const create = async (apiSecret: string, clipRequest: CreateAssetClipRequest, idempotencyKey?: string) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/assets`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
            'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(clipRequest),
    };

    return await sendPost<AssetResponseData>(options);
};

/**
 * Lists media assets.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-assets-list-media-assets/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param params Query parameters for filtering the list of media assets.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link AssetResponseData} objects.
 */
export const list = async (apiSecret: string, params: ListMediaAssetsQueryParams) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/media/assets',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        params: toDictString(params),
    };

    return await sendGet<AssetResponseData[]>(options);
};

/**
 * Deletes multiple media assets from storage.
 * 
 * @remarks Only media assets with status Complete or Error can be deleted.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-assets-delete-media-assets/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param assetIds The list of asset IDs to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of asset deletion tasks that failed.
 */
export const deleteAssets = async (apiSecret: string, assetIds: string[]) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: 'api/v3/media/assets',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        params: toDictString(assetIds),
    };

    return await sendDelete<{ id?: string; error?: string }[] | null>(options);
};

/**
 * Reads a media asset.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-assets-read-media-asset/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param assetId The ID of the media asset to read.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an {@link AssetResponseData} object.
 */
export const read = async (apiSecret: string, assetId: string) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/assets/${assetId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<AssetResponseData>(options);
};

type Dict<T> = { [key: string]: T };

function toDictString(obj: Record<string, any>): Dict<string> {
    const result: Dict<string> = {};
    for (const [key, value] of Object.entries(obj)) {
        result[key] = String(value); // Ensure all values are converted to strings
    }
    return result;
}
