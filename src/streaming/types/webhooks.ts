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
    /** If `true` sends webhook events on recording `start/error/complete/deleted`. */
    isRecordingHooks: boolean;
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
    /** Set to `true` to send webhook events on media assets updates. */
    isMediaHooks?: boolean;
    /** Set to `true` to send webhook events on viewer connection updates. */
    isViewerConnectionHooks?: boolean;
    /** Set to `true` to immediately re-enable the webhook if it has been temporarily disabled. */
    reEnable?: boolean;
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
}

/** Types of webhook events. */
export type WebhookType = 'Recordings' | 'Thumbnail' | 'Transcoder' | 'Media' | 'Feeds' | 'ViewerConnection';
