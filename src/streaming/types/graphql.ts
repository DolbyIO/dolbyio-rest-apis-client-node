/** Represents a page description. */
export interface PageInfo {
    /** When paginating forwards, are there more items? */
    hasNextPage: boolean;
    /** When paginating backwards, are there more items? */
    hasPreviousPage: boolean;
    /** When paginating backwards, the cursor to continue. */
    startCursor?: string;
    /** When paginating forwards, the cursor to continue. */
    endCursor?: string;
}

/** Represents the pagination description. */
export interface PaginationInfo {
    /** Index of the current page. */
    currentPage: number;
    /** Number of items per page. */
    perPage: number;
    /** Number of pages. */
    pageCount?: number;
    /** Number of items. */
    itemCount?: number;
    /** When paginating forwards, are there more items? */
    hasNextPage: boolean;
    /** When paginating backwards, are there more items? */
    hasPreviousPage: boolean;
}

/** Represents an edge. */
export interface Edge<T> {
    /** The item at the end of the edge. */
    node: T;
    /** A cursor for use in pagination. */
    cursor: string;
}

/** Represents a connection to a list of items. */
export interface Connection<T> {
    /** Total object count. */
    count: number;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** Information to aid in pagination. */
    edges: T[];
}

/** Represents a list of items with pagination. */
export interface Pagination<T> {
    /** Total object count. */
    count: number;
    /** The list of items. */
    items: T[];
    /** Information to aid in pagination. */
    pageInfo: PaginationInfo;
}

/**
 * Represents a feed which is a webrtc or rtmp publication to a stream.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-feeds
 */
export interface Feeds {
    /** Account identifier. */
    accountId?: string;
    /** Date when the feed was started. */
    started?: Date;
    /** Flag indicating if the feed is currently active. */
    active?: boolean;
    /** Date when feed was ended, `null` if currently active. */
    ended?: Date;
    /** Stream name. */
    name?: string;
    /** Stream identifier. */
    streamId?: string;
}

/**
 * An edge in a connection.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-feedsEdge
 */
export interface FeedsEdge extends Edge<Feeds> {}

/**
 * Represents a connection to a list of items.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-feedsConnection
 */
export interface FeedsConnection extends Connection<FeedsEdge> {}

/**
 * List of items with pagination.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-feedsPagination
 */
export interface FeedsPagination extends Pagination<Feeds> {}

/**
 * Represents a view of a stream.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviews
 */
export interface StreamViews {
    /** Account identifier. */
    accountId?: string;
    /** Stream name. */
    name?: string;
    /** Stream identifier. */
    streamId?: string;
    /** Stream view identifier. */
    streamViewId?: string;
    /** Date when the stream view was started. */
    started?: Date;
    /** Date when stream view was ended, `null` if currently active. */
    ended?: Date;
    /** Flag indicating if the stream view is currently active. */
    active?: boolean;
    /** Stream view client. */
    client?: StreamViewsClient;
}

/**
 * Represents a stream view client.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsClient
 */
export interface StreamViewsClient {
    /** User agent of the browser of client used to watch the stream. */
    userAgent?: string;
    /** Tracking id used by the subscriber token. */
    trackingId?: string;
    /** Geo location. */
    geo: StreamViewsClientGeo;
}

/**
 * Represents a geo location for a viewer.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsClientGeo
 */
export interface StreamViewsClientGeo {
    /** Viewer city based on geo ip lookup. */
    city?: string;
    /** Viewer continent based on geo ip lookup. */
    continent?: string;
    /** Viewer country based on geo ip lookup. */
    country?: string;
    /** Viewer location based on geo ip lookup. */
    location?: number[];
    /** Viewer subregion based on geo ip lookup. */
    sub?: string[];
}

/**
 * An edge in a connection.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsEdge
 */
export interface StreamViewsEdge extends Edge<StreamViews> {}

/**
 * Represents a connection to a list of items.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsConnection
 */
export interface StreamViewsConnection extends Connection<StreamViewsEdge> {}

/**
 * List of items with pagination.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsPagination
 */
export interface StreamViewsPagination extends Pagination<StreamViews> {}

/**
 * Per Stream stats.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByStreamId
 */
export interface StreamViewsAggregatedByStreamId {
    /** Account identifier. */
    accountId?: string;
    /** Stream identifier. */
    streamId?: string;
    /** Start date of the stat period. */
    from?: Date;
    /** End date of the stat period. */
    to?: Date;
    /** Number of active viewers at the end of the period. */
    active?: number;
    /** Number of views started during the period. */
    numStarted?: number;
    /** Number of views ended during the period. */
    numEnded?: number;
}

/**
 * List of items with pagination.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByStreamIdConnection
 */
export interface StreamViewsAggregatedByStreamIdConnection extends Pagination<StreamViewsAggregatedByStreamIdEdge> {}

/**
 * An edge in a connection.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByStreamIdEdge
 */
export interface StreamViewsAggregatedByStreamIdEdge extends Edge<StreamViewsAggregatedByStreamId> {}

/**
 * List of items with pagination.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByStreamIdPagination
 */
export interface StreamViewsAggregatedByStreamIdPagination extends Pagination<StreamViewsAggregatedByStreamId> {}

/**
 * Per account stats.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByAccountId
 */
export interface StreamViewsAggregatedByAccountId {
    /** Account identifier. */
    accountId?: string;
    /** Start date of the stat period. */
    from?: Date;
    /** End date of the stat period. */
    to?: Date;
    /** Number of active viewers at the end of the period. */
    active?: number;
    /** Number of views started during the period. */
    numStarted?: number;
    /** Number of views ended during the period. */
    numEnded?: number;
    /** Number of published streams at the end of the period. */
    streams?: number;
}

/**
 * List of items with pagination.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByAccountIdConnection
 */
export interface StreamViewsAggregatedByAccountIdConnection extends Pagination<StreamViewsAggregatedByAccountIdEdge> {}

/**
 * An edge in a connection.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByAccountIdEdge
 */
export interface StreamViewsAggregatedByAccountIdEdge extends Edge<StreamViewsAggregatedByAccountId> {}

/**
 * List of items with pagination.
 * @link https://docs.dolby.io/streaming-apis/page/graphql-api-reference#definition-streamviewsAggregatedByAccountIdPagination
 */
export interface StreamViewsAggregatedByAccountIdPagination extends Pagination<StreamViewsAggregatedByAccountId> {}
