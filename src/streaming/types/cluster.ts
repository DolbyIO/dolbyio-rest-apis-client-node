import { read, update } from '../cluster';

/**
 * Represents a Dolby Millicast cluster.
 */
export interface Cluster {
    /** Unique identifier of the cluster. */
    id: string;
    /** Display name of the cluster. */
    name: string;
    /** RTMP publish domain for cluster. */
    rtmp: string;
    /** SRT publish domain for cluster. */
    srt: string;
    /** Location of this cluster. */
    location: {
        /** City of the cluster. */
        city: string;
        /** Region of the cluster. */
        region: string;
        /** Country of the cluster. */
        country: string;
    };
}

/**
 * Represents the response to a {@link read} or {@link update} request.
 */
export interface ClusterResponse {
    /** Used as cluster when not explicitly specified during Token creation. */
    defaultCluster: string;
    /** List of clusters available. */
    availableClusters: Cluster[];
}
