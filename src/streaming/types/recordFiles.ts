/** Represents a media asset. */
export interface MediaAsset {
    id: string;
    stoppedOn?: string;
    sourceId?: string;
    simulcastId?: string;
    itemType: 'FullRecording' | 'Clip';
    clipMetadata: {
        /** Clip label if assigned by user. */
        clipName?: string;

        /** Id associated with clipping request. Multiple clips generated from the same request can share a single `clipRequestId`. */
        clipRequestId: string;

        /** Storage information. */
        storage: {
            /** Storage provider type. */
            storageType: 'Default' | 'Gcs' | 'AwsS3';
            /** Prefix to clip storage location. Available only for external storage configurations. */
            storagePath: string;
        };

        startTime?: string;
        stopTime?: string;
        expiresOn?: string;
    };
    tokenId?: number;
    streamName: string;
    recordedOn: string;
    removedOn?: string;
    metadata: {
        format: string;
        sizes?: any;
        duration: number;
        tracks: {
            type: string;
            codec: string;
            bitrate: number;
            width?: number;
            height?: number;
            framerate?: number;
            channels?: number;
            samplerate?: number;
        };
        thumbnails: string[];
    };
    status: 'Started' | 'Transcode' | 'Complete' | 'Deleting' | 'Error';
    download: {
        downloadUrl: string;
        downloadExpiresOn: string;
    };
}
