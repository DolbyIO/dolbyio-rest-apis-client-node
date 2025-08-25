/**
 * Storage types supported by Dolby.
 */
export type MediaAssetStorageType = 'awsS3' | 'gcs' | 'dolbyStorage'; // Valid storage types

/**
 * Additional options for the storage location.
 */
export interface UpdateStorageOptionsModel {
    /** Optional, prefix to prepend to assets names in storage. */
    objectPrefix?: string | null;
    /** Optional, name of the bucket to use for storage. */
    bucketName?: string | null;
    /** Optional, region of the bucket to use for storage. */
    bucketRegion?: string | null;
}

/**
 * The allowable parameters for updating the storage location of an asset when requesting clip creation.
 */
export interface MediaAssetStorageModel {
    /** The id of a previously created storage profile. */
    profileId?: string | null;
    /** The type of storage to use. */
    type?: MediaAssetStorageType | null;
    /** Additional options for the storage location. */
    options?: UpdateStorageOptionsModel | null;
    /** ISO 8601 date string, only used for DolbyIO storage. Sets the date to delete the asset automatically. */
    expiration?: string | null;
}

/**
 * The allowable parameters for requesting the creation of an asset clip.
 */
export interface CreateAssetClipRequest {
    /** Required, length ≥ 1, Name of the stream you want to clip. */
    streamName: string;
    /** Optional, Token ID of the stream you want to clip. */
    tokenId?: number | null;
    /** Optional, source identifier. */
    sourceId?: string | null;
    /** Optional, Simulcast ID if required. */
    simulcastId?: string | null;
    /** Optional, int32, The requests with the highest priority are processed first. */
    priority?: number | null;
    /** Required, ISO 8601 date string, Start time of the clip. */
    startTime: string;
    /** Optional, ISO 8601 date string, End time of the clip. If not required defaults to current time. */
    stopTime?: string | null;
    /** Optional, Name of the asset once clipped. If not provided it will be generated. */
    name?: string | null;
    /** Optional, storage information. */
    storage?: MediaAssetStorageModel | null;
}

/**
 * Response data for the Clip storage.
 */
export interface MediaAssetStorageResponseModel {
    /** Storage type. */
    type: MediaAssetStorageType;
    /** Optional, Path to clip storage location. */
    path?: string | null;
}

/**
 * Response Data for the Metadata for a clip.
 */
export interface RecordMetadata {
    /** Format of the clip */
    format: string;
    /** Optional, additional fields expected, sizes available. */
    sizes?: Record<string, any> | null;
    /** Duration in seconds of clip. */
    duration: number;
    /** Array of tracks. */
    tracks: {
        /** Track type */
        type: string;
        /** Track Codec */
        codec: string;
        /** Bitrate of the track. */
        bitrate: number;
        /** Optional, int32, Width of track. */
        width?: number | null;
        /** Optional, int32 Height of track. */
        height?: number | null;
        /** Optional, int32, Framerate of Track. */
        framerate?: number | null;
        /** Optional, int32, Number of channels. */
        channels?: number | null;
        /** Optional, int64, Sample rate of track. */
        samplerate?: number | null;
    }[];
    /** Array of thumbnail URLs */
    thumbnails: string[];
}

/**
 * Response data for the feed selection from where the clip was created.
 */
export interface MediaAssetFeedSelectionModel {
    /** Optional, Token ID of the stream if provided. */
    tokenId?: number | null;
    /** Required, The name of the stream the clip belongs to. */
    streamName: string;
    /** Optional, The SourceId of the stream the clip belongs to. */
    sourceId?: string | null;
    /** Optional, The simulcastId of the stream the clip belongs to. */
    simulcastId?: string | null;
    /** Optional, int32, the priority of the clip request. */
    priority?: number | null;
}

/**
 * Response data for a clip.
 */
export interface AssetResponseData {
    /** Optional, ID of the object. */
    id?: string | null;
    /** Required, type of the object. */
    type: 'recording' | 'clip' | 'storageValidation' | 'timeline' | 'feed';
    /** Optional, information about the asset. */
    feed?: MediaAssetFeedSelectionModel;
    /** Required, ISO 8601 date string, Start time of clip. */
    startTime: string;
    /** Optional, ISO 8601 date string, End time of clip. */
    stopTime?: string | null;
    /** Optional, name of the asset. */
    name?: string;
    /** Storage information. */
    storage: MediaAssetStorageResponseModel;
    /** The status of the Clip request. */
    status: 'processing' | 'complete' | 'error' | 'deleting' | 'deleted';
    /** Optional, error details. */
    error?: string | null;
    /** Optional, ISO 8601 date string, Created Date. */
    created?: string | null;
    /** Optional, ISO 8601 date string, Expiration Date. */
    expiration?: string | null;
    /** Optional, ISO 8601 date string, Deleted Date. */
    removed?: string | null;
    /** Optional, asset metadata. */
    metadata?: RecordMetadata;
}

/**
 * The allowable sort options for listing media assets.
 */
export type ListMediaAssetSortBy = 'startTime' | 'endTime' | 'name'; // Add other valid sort options as needed

/**
 * The allowable parameters for listing and filtering media assets.
 */
export interface ListMediaAssetsQueryParams {
    /** Defaults to "startTime". */
    sort?: ListMediaAssetSortBy;
    /** Defaults to ["Processing", "Complete"] unless specified. */
    status?: string[] | null;
    /** Defaults to ["Clip", "Recording"] unless specified. */
    type?: string[] | null;
    /** Optional. Filter by media asset name. */
    name?: string | null;
    /** Optional, Name of the stream to filter by. */
    streamName?: string | null;
    /** Optional, Token ID of the stream to filter by. */
    tokenId?: number | null;
    /** Optional, Source ID of the stream to filter by. */
    sourceId?: string | null;
    /** Optional, with behavior for empty string, Simulcast ID of the stream to filter by. */
    simulcastId?: string | null;
    /** Optional, int32, Priority of the clip request to filter by. */
    priority?: number | null;
    /** Optional, integer, 1 to 2147483647, defaults to 1 */
    page?: number;
    /** Optional, integer, 1 to 100, defaults to 25. */
    limit?: number;
    /** Optional, defaults to `false`, sort descending boolean. */
    desc?: boolean;
}
