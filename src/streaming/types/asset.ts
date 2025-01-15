/**
 * Create Asset Clip
 */

export type MediaAssetStorageType = "awsS3" | "gcs" | "dolbyStorage";

export interface UpdateStorageOptionsModel {
    objectPrefix?: string | null;
    bucketName?: string | null;
    bucketRegion?: string | null;
    expiration?: string | null; // ISO 8601 date string
}

export interface MediaAssetStorageModel {
    profileId?: string | null;
    type?: MediaAssetStorageType | null;
    options?: UpdateStorageOptionsModel | null;
}

export interface CreateAssetClipRequest {
    streamName: string; // Required, length ≥ 1
    tokenId?: number | null; // Optional
    sourceId?: string | null; // Optional
    simulcastId?: string | null; // Optional
    priority?: number | null; // Optional, int32
    startTime: string; // Required, ISO 8601 date string
    stopTime?: string | null; // Optional, ISO 8601 date string
    name?: string | null; // Optional
    storage?: MediaAssetStorageModel | null; // Optional
}

export interface MediaAssetStorageResponseModel {
    type: MediaAssetStorageType;
    path?: string | null; // Optional, Path to clip storage location
    status: "processing" | "complete" | "error" | "deleting" | "deleted";
    error?: string | null; // Optional, error details
    created?: string | null; // Optional, ISO 8601 date string
    expiration?: string | null; // Optional, ISO 8601 date string
    removed?: string | null; // Optional, ISO 8601 date string
}

export interface RecordMetadata {
    format: string;
    sizes?: Record<string, any> | null; // Optional, additional fields expected
    duration: number; // Duration in seconds
    tracks: {
        type: string;
        codec: string;
        bitrate: number;
        width?: number | null; // Optional, int32
        height?: number | null; // Optional, int32
        framerate?: number | null; // Optional, int32
        channels?: number | null; // Optional, int32
        samplerate?: number | null; // Optional, int64
    }[];
    thumbnails: string[]; // Array of thumbnail URLs
}

export interface MediaAssetFeedSelectionModel {
    tokenId?: number | null; // Optional
    streamName: string; // Required
    sourceId?: string | null; // Optional
    simulcastId?: string | null; // Optional
    priority?: number | null; // Optional, int32
    startTime: string; // Required, ISO 8601 date string
    stopTime?: string | null; // Optional, ISO 8601 date string
    name?: string | null; // Optional
    storage: MediaAssetStorageResponseModel;
}

export interface ResponseDataObject {
    id?: string | null; // Optional
    type: "recording" | "clip" | "storageValidation" | "timeline" | "feed"; // Required
    feed?: MediaAssetFeedSelectionModel; // Optional
    metadata?: RecordMetadata; // Optional
}

export interface AssetClipResponse{
    status: string; // Required, Defaults to "success", length ≥ 1
    data: ResponseDataObject[]; // Required, array of objects
}


/**
 * List Assets
 */

type ListMediaAssetSortBy = "startTime" | "endTime" | "name"; // Add other valid sort options as needed

export interface ListMediaAssetsQueryParams {
    sort?: ListMediaAssetSortBy; // Defaults to "startTime"
    status?: string[] | null; // Defaults to ["Processing", "Complete"] unless specified
    type?: string[] | null; // Defaults to ["Clip", "Recording"] unless specified
    name?: string | null; // Optional. Filter by media asset name
    streamName?: string | null; // Optional
    tokenId?: number | null; // Optional
    sourceId?: string | null; // Optional
    simulcastId?: string | null; // Optional, with behavior for empty string
    priority?: number | null; // Optional, int32
    page?: number; // Optional, integer, 1 to 2147483647, defaults to 1
    limit?: number; // Optional, integer, 1 to 100, defaults to 25
    desc?: boolean; // Optional, defaults to false
}

interface ErrorObject {
    id?: string | null; // Optional, ID related to the error
    error?: string | null; // Optional, error description
}

export interface DeleteResponse {
    status: string; // Required, defaults to "success", length ≥ 1
    data: {
        errors?: ErrorObject[] | null; // Optional, array of error objects or null
    };
}
