import { update } from '../webhooks';

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
    /** If `true` sends webhook events on thumbnail generation. */
    isThumbnailHooks: boolean;
    /** If `true` sends webhook events on transcoder instance updates. */
    isTranscoderHooks: boolean;
    /**
     * If `true` sends webhook events media asset `processing/errored/completed/deleted`.
     * Only media assets of type `recording` and `clip` types can trigger webhooks.
     */
    isMediaHooks: boolean;
    /** If `true` sends webhook events on important events related to viewers. */
    isViewerConnectionHooks: boolean;
    /**
     * Your webhook may be temporarily disabled if too many attempted webhook events timeout.
     * You can re-enable it immediately by updating the url or setting {@link UpdateWebhookRequest.reEnable} to `true` via {@link update | Update Webhook}.
     */
    disabled?: {
        /**  */
        until: string;
        /** Reason why the webhook was disabled. */
        reason: string;
    };
    /**
     * A regular expression used to filter the events sent to this webhook based on StreamName or TranscoderName.
     * For event types `feeds`, `media`, `recording`, `thumbnail` and `viewerConnection` the filter applies to the `StreamName` field.
     * For event type `transcoder` the filter applies to the `TranscoderName` field.
     */
    filter?: string;
}

/** Represents a webhook update request. */
export interface UpdateWebhookRequest {
    /** Url to send webhook data to. */
    url?: string;
    /** Set to `true` to generate new signing secret for the webhook. */
    refreshSecret?: boolean;
    /** Set to `true` to send webhook events on feeds `start/stop`. */
    isFeedHooks?: boolean;
    /** Set to `true` to send webhook events on thumbnail generation. */
    isThumbnailHooks?: boolean;
    /** Set to `true` to send webhook events on transcoder instance updates. */
    isTranscoderHooks?: boolean;
    /** Set to `true` to send webhook events on media assets updates. */
    isMediaHooks?: boolean;
    /** Set to `true` to send webhook events on viewer connection updates. */
    isViewerConnectionHooks?: boolean;
    /** Set to `true` to immediately re-enable the webhook if it has been temporarily disabled. */
    reEnable?: boolean;
    /**
     * A regular expression used to filter the events sent to this webhook based on StreamName or TranscoderName.
     * For event types `feeds`, `media`, `recording`, `thumbnail` and `viewerConnection` the filter applies to the `StreamName` field.
     * For event type `transcoder` the filter applies to the `TranscoderName` field.
     * Set to `null` to clear value.
     */
    filter?: string;
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
     * Set to `true` to send webhook events on media asset `processing/errored/completed/deleted`.
     * Only media assets of type `recording` and `clip` types can trigger webhooks.
     * @defaultValue `false`.
     */
    isMediaHooks?: boolean;
    /**
     * Set to `true` to send webhook events on important events related to viewers.
     * @defaultValue `false`.
     */
    isViewerConnectionHooks?: boolean;
    /**
     * A regular expression used to filter the events sent to this webhook based on StreamName or TranscoderName.
     * For event types `feeds`, `media`, `recording`, `thumbnail` and `viewerConnection` the filter applies to the `StreamName` field.
     * For event type `transcoder` the filter applies to the `TranscoderName` field.
     */
    filter?: string;
}

/** Represents a webhook test request. */
export interface TestWebhookRequest {
    /** Type of webhook event to test. */
    webhookType: WebhookType,
    /** StreamName to include in test webhook payload. If not provided a default value will be used. */
    streamName?: string;
    /** TranscoderName to include in test webhook payload. If not provided a default value will be used.. */
    transcoderName?: string;
}

/** Types of webhook events. */
export type WebhookType = 'Thumbnail' | 'Transcoder' | 'Media' | 'Feeds' | 'ViewerConnection';
