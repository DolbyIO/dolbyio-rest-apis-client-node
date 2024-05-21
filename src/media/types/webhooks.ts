import http from 'http';

export interface UpdateWebhookOptions {
    /** Use the `webhook_id` returned from a previous GET, POST or PUT response to retrieve the webhook configuration. */
    webhookId: string;
    /** The callback url that will be called when job execution completes. */
    url: string;
    /** Headers to include in the webhook call. */
    headers?: http.OutgoingHttpHeaders;
}

export interface Webhook {
    /** The identifier for the webhook. */
    webhook_id: string;
    callback: {
        /** The callback url that will be called when job execution completes. */
        url: string;
        /** Headers to include in the webhook call. */
        headers: any;
    };
}
