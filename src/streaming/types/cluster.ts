export interface Cluster {
    /** Unique identifier of the cluster. */
    id: string;
    /** Display name of the cluster. */
    name: string;
    /** RTMP publish domain for cluster. */
    rtmp: string;
}

export interface ClusterResponse {
    /** Used as cluster when not explicitly specified during Token creation. */
    defaultCluster: string;
    /** List of clusters available. */
    availableClusters: Cluster[];
}
