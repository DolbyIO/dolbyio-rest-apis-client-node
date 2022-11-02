import { PagedOptions, AllElementsOptions, PagedResponse } from './core';

interface GetWebhooksOptionsBase {
    /** Identifier of the conference. */
    conferenceId?: string;
    /** The Webhook event type or an expression of its type (for example `Recording.Live.InProgress` or `Rec.*`). The default value of the type parameter returns all types of Webhooks. */
    type?: string;
}

export interface GetWebhooksOptions extends PagedOptions, GetWebhooksOptionsBase {}

export interface GetAllWebhooksOptions extends AllElementsOptions, GetWebhooksOptionsBase {}

export interface WebHookResponse {
    /** The HTTP status code and the returned string after posting the webhook (for example "200 OK"). */
    status: string;
    /** key - a value of the map of headers of the endpoint response returned after posting the webhook. */
    headers: object;
}

export interface WebHook {
    /** The ID for the webhook event. */
    id: string;
    /** The string encoding the webhook JSON body. */
    webhook: string;
    /** The URL (configured on the developer portal) to which the webhook is sent. */
    url: string;
    /** The ID of the conference that emitted the webhook event. */
    confId: string;
    /** The customer key of the application associated with the conference that emitted the webhook. */
    thirdPartyId: string;
    /** The epoch time of the webhook event. */
    ts: number;
    /** The response from the endpoint at which the webhook event is posted. */
    response: WebHookResponse;
}

export interface GetWebHookResponse extends PagedResponse {
    /** List of webhooks. */
    webhooks: WebHook[];
}
