/** Status of a transcoder. */
export type TranscoderStatus = 'Provisioning' | 'Active' | 'Error' | 'Shutdown' | 'Deleted' | 'ShuttingDown' | 'Starting' | 'Deleting';

/** Represents the options to sort a response. */
export interface ListSortOptions<SortByType> {
    /** How to sort the response. */
    sortBy: SortByType;
    /** Number of the page to retrieve. Minimum is 1. */
    page: number;
    /** Number of items per page. Must be between 1 and 100. */
    itemsOnPage: number;
    /** Sort by descending order. */
    isDescending?: boolean;
}

/** Represents the options to sort the response for listing transcoders. */
export interface ListTranscodersSortOptions extends ListSortOptions<'CreatedDate'> {
    /** List the transcoders with this status. */
    status?: TranscoderStatus;
}

/** Represents the options to sort the response for listing transcoders. */
export interface ListTranscodersInstancesSortOptions extends ListSortOptions<'CreatedDate'> {
    /** List the instances for this transcoder. */
    transcoderId?: string;
    /** */
    startDate?: string;
    /** */
    endDate?: string;
}

/** Represents the options to sort the response for listing transcoder profiles. */
export interface ListTranscodersProfilesSortOptions extends ListSortOptions<'Name' | 'Height' | 'FrameRate'> {}

/** Represents a cloud transcoder. */
export interface Transcoder {
    /** Identifier of the transcoder. */
    transcoderId: string;
    /** Display name of the transcoder. */
    name: string;
    /** A string corresponding to the region that this transcoder is be deployed to. */
    cluster: string;
    /** DNS name of the transcoder. */
    dnsName: string;
    /** Profile selected by user or derived from input height and frame rate. */
    profile?: TranscoderProfile;
    /** Transcoder creation date. */
    createdOn: Date;
    /** Date when the transcoded was ended. */
    endedOn?: Date;
    /** Information on the most recent transcoder instance. */
    instance?: TranscoderInstance;
    /** Current status of the transcoder. */
    status: TranscoderStatus;
    /** List of publish URLs for different ingest protocols. */
    publishUrls: {
        /** Publish URL for RTMP protocol. */
        rtmp: string;
        /** Publish URL for RTMPs protocol. */
        rtmps: string;
        /** Publish URL for SRT protocol. */
        srt: string;
    };
}

/** Represents a transcoder profile. */
export interface TranscoderProfile {
    /** Identifier of the transcoder profile. */
    profileId: string;
    /** Name of the transcoder profile. */
    name: string;
    /** Description of the transcoder profile. */
    description: string;
    /** Resolution of input stream specified in video height. */
    height: number;
    /** Frame rate of input stream. */
    frameRate: number;
    /** */
    isDefault: boolean;
    /** */
    passThrough: boolean;
}

/** Represents a transcoder instance. */
export interface TranscoderInstance {
    /** Identifier of the transcoder instance. */
    instanceId: string;
    /** Identifier of the transcoder. */
    transcoderId?: string;
    /** DNS name of the transcoder which follows the format of `dnsPrefix-accountId.transcoder.millicast.com`. */
    dnsName: string;
    /** Time when this transcoder instance was created. */
    createdOn: Date;
    /** Time when this transcoder instance ended. */
    endedOn?: Date;
    /** Current status of the transcoder instance. */
    status: TranscoderStatus;
}

/** Represents a cloud transcoder creation request. */
export interface CreateTranscoderRequest {
    /** Display name of the cloud transcoder. */
    name: string;
    /**
     * DNS prefix for the transcoder publisher.
     * Used to construct the DNS name which follows the format of `dnsPrefix-accountId.transcoder.millicast.com`.
     * @remarks Note that underscores (_) are invalid characters.
     */
    dnsPrefix?: string;
    /** A string corresponding to the region that this transcoder will be deployed to. */
    cluster: string;
    /** Resolution of input stream specified in video height. */
    height: number;
    /** Frame rate of input stream. */
    frameRate: number;
    /** Specify profile name to select non-standard ladders. */
    profile?: string;
    /** Determine if the instance should start immediately when created. */
    startNow?: boolean;
    /** Determine if the top layer is passed through or transcoded. */
    passThrough?: boolean;
}

/** Represents a cloud transcoder update request. */
export interface UpdateTranscoderRequest {
    /** Display name of the cloud transcoder. */
    name?: string;
    /**
     * DNS prefix for the transcoder publisher.
     * Used to construct the DNS name which follows the format of `dnsPrefix-accountId.transcoder.millicast.com`.
     * @remarks Note that underscores (_) are invalid characters.
     */
    dnsPrefix?: string;
    /** A string corresponding to the region that this transcoder will be deployed to. */
    cluster?: string;
    /** Resolution of input stream specified in video height. */
    height?: number;
    /** Frame rate of input stream. */
    frameRate?: number;
    /** Specify profile name to select non-standard ladders. */
    profile?: string;
    /** Determine if the top layer is passed through or transcoded. */
    passThrough?: boolean;
}
