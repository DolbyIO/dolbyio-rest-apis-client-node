/** Represents a webhook. */
export interface Webhook {
    /** Identifier of the webhook. */
    id: number;
    /** Url to send webhook data to. */
    url: string;
    /** Base64 string of signing secret. */
    secret: string;
    /** If `true` sends webhook events on feeds `start/stop`. */
    isFeedHooks: boolean;
    /** If `true` sends webhook events on recording `start/error/complete/deleted`. */
    isRecordingHooks: boolean;
    /** If `true` sends webhook events on thumbnail generation. */
    isThumbnailHooks: boolean;
    /** If `true` sends webhook events on transcoder instance updates. */
    isTranscoderHooks: boolean;
    /** If `true` sends webhook events on clip `start/error/complete/deleted`. */
    isClipHooks: boolean;
}

/** Represents a webhook update request. */
export interface UpdateWebhookRequest {
    /** Url to send webhook data to. */
    url?: string;
    /** Set to `true` to generate new signing secret for the webhook. */
    refreshSecret?: boolean;
    /** Set to `true` to send webhook events on feeds `start/stop`. */
    isFeedHooks?: boolean;
    /** Set to `true` to send webhook events on recording `start/error/complete/deleted`. */
    isRecordingHooks?: boolean;
    /** Set to `true` to send webhook events on thumbnail generation. */
    isThumbnailHooks?: boolean;
    /** Set to `true` to send webhook events on transcoder instance updates. */
    isTranscoderHooks?: boolean;
    /** Set to `true` to send webhook events on clip `start/error/complete/deleted`. */
    isClipHooks?: boolean;
}

/** Represents a webhook listing request. */
export interface ListWebhooksRequest {
    /** If null starts at beginning of list. */
    startingId?: number;
    /** Number of items to return in the query. */
    itemCount?: number;
    /** Sort by descending order. */
    isDescending?: boolean;
}

/** Represents a webhook creation request. */
export interface AddWebhookRequest {
    /** Url to send webhook data to. */
    url: string;
    /** Set to `true` to send webhook events on feeds `start/stop`. */
    isFeedHooks: boolean;
    /** Set to `true` to send webhook events on recording `start/error/complete/deleted`. */
    isRecordingHooks: boolean;
    /**
     * Set to `true` to send webhook events on transcoder instance updates.
     * @defaultValue `false`.
     */
    isThumbnailHooks?: boolean;
    /**
     * Set to `true` to send webhook events on transcoder instance updates.
     * @defaultValue `false`.
     */
    isTranscoderHooks?: boolean;
    /**
     * Set to `true` to send webhook events on clip `start/error/complete/deleted`.
     * @defaultValue `false`.
     */
    isClipHooks?: boolean;
}
