import * as Urls from '../urls';
import { CreateAssetClipRequest, ListMediaAssetsQueryParams, AssetResponseData } from './types/asset';
import { sendDelete, sendGet, sendPost } from './internal/httpHelpers';
import { toDictString } from './internal/stringHelpers';

/**
 * ## Creates Media Asset
 *
 * Create a live clip from an ongoing live stream. You must provide the stream name and start time, and once processing is complete the media asset of the type clip will be available for retrieval.
 *
 * If a stop time is not specified, the time the request was received will be used. The clip duration must be a minimum of ten (10) seconds and cannot exceed eight (8) hours.
 *
 * There are a few cases where more than one clip will be generated from a single request.
 * 1. A stream went offline during the time range will generate separate clips for the period before and after the restart.
 * 1. A stream that is configured for multi-source when a simulcastId is not given in the request to select a single layer.
 * 1. A stream that is configured for multi-bitrate contribution or redundant fallback ingest and a sourceId is not given in the request to specify which to use. In that scenario, sources will be ranked based on the following criteria and the highest ranked source is selected for clipping:
 *      * priority
 *      * quality
 *      * start time
 *
 * By using an `Idempotency-Key` header in your requests, you can avoid generating more than one identical clip should the same request be received more than once.
 * To avoid unnecessary charges, it is recommended you use a common identifier for live clip requests based on a common source stream and time range.
 * For background on the usage of this header, please refer to the {@link https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/ | IETF Draft}.
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
 * ## Lists Media Assets
 *
 * List media assets, excluding those that have been deleted. A media asset can be:
 * 1. A `"recording"` that is from the full duration of the stream
 * 1. A `"clip"` which is generated from {@link create | Create Media Asset}
 * 1. A `"timeline"` which is a series of segments that is buffered in a cache and available for clipping. A `"timeline"` is capped at a 12 hour duration or whenever the stream is re-started.
 * 1. Of type `storageValidation`, which is a record reflecting the outcome of triggering Validate Third Party Storage Setup
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
 * ## Delete Media Assets
 *
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
 * ## Read Media Asset
 *
 * Gets media asset specified by id. Includes temporary download link if the media asset is complete.
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

/**
 * ## Delete All Media Assets
 *
 * Deletes all media assets of a specified type from storage.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/media-assets-delete-media-assets-2/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param mediaAssetType Asset type to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of asset deletion tasks that failed.
 */
export const deleteAllAssets = async (apiSecret: string, mediaAssetType: 'recording' | 'clip' | 'storageValidation' | 'timeline') => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: 'api/v3/media/assets/all',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        params: {
            type: mediaAssetType,
        },
    };

    return await sendDelete<{ id?: string; error?: string }[] | null>(options);
};
