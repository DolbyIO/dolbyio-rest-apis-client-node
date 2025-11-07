import { read, update } from '../cluster';

/**
 * Represents a Dolby OptiView cluster.
 */
export interface Cluster {
    /** Unique identifier of the cluster. */
    id: string;
    /** Display name of the cluster. */
    name: string;
    /** RTMP publish domain for the cluster. */
    rtmp: string;
    /** SRT publish domain for the cluster. */
    srt: string;
    /** Location of the cluster. */
    location: {
        /** City of the cluster. */
        city: string;
        /** Region of the cluster. */
        region: string;
        /** Country of the cluster. */
        country: string;
    };
    /** Features available in this cluster. */
    features: {
        /** Indicates whether the Transcoder feature is supported in the corresponding cluster. */
        transcoding: boolean;
    };
}

/**
 * Represents the response to a {@link read} or {@link update} request.
 */
export interface ClusterResponse {
    /** Used as default cluster when not explicitly specified during Token creation. */
    defaultCluster: string;
    /** List of available clusters. */
    availableClusters: Cluster[];
}
