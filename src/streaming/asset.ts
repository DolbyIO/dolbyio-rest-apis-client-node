import * as Urls from '../urls';
import { CreateAssetClipRequest, AssetClipResponse, ListMediaAssetsQueryParams } from './types/asset';
import { sendDelete, sendGet, sendPost } from './internal/httpHelpers';

/**
 * Creates a new media asset.
 * @param apiSecret
 * @param clipRequest
 */
export const create = async (apiSecret: string, clipRequest: CreateAssetClipRequest) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/assets`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(clipRequest),
    }

    return await sendPost<AssetClipResponse>(options);
}

/**
 * Lists media assets.
 * @param apiSecret
 * @param params
 */
export const list = async (apiSecret: string, params: ListMediaAssetsQueryParams) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: "/api/v3/media/assets",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`
        },
        params: toDictString(params),
    };

    return await sendGet<AssetClipResponse>(options);
}

/**
 * Deletes multiple media assets from storage.
 * @param apiSecret
 * @param assetIds
 */
export const deleteAssets = async (apiSecret: string, assetIds: string[]) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: "api/v3/media/assets",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`
        },
        params: toDictString(assetIds)
    };

    return await sendDelete(options);
}

/**
 * Reads a media asset.
 * @param apiSecret
 * @param assetId
 */
export const read = async (apiSecret: string, assetId: string) => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/media/assets/${assetId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`
        }
    };

    return await sendGet<AssetClipResponse>(options);
}

type Dict<T> = { [key: string]: T };

function toDictString(obj: Record<string, any>): Dict<string> {
    const result: Dict<string> = {};
    for (const [key, value] of Object.entries(obj)) {
        result[key] = String(value); // Ensure all values are converted to strings
    }
    return result;
}
