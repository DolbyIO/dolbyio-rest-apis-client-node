import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import { Webhook, UpdateWebhookRequest, ListWebhooksRequest, AddWebhookRequest, WebhookType } from './types/webhooks';

/**
 * Gets the specified webhook.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/webhooks-get/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param webhookId Identifier of the webhook to read.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link Webhook} object.
 */
export const read = async (apiSecret: string, webhookId: number): Promise<Webhook> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/webhooks/${webhookId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<Webhook>(options);
};

/**
 * Updates the webhook.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/webhooks-update-webhook/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param webhookId Identifier of the webhook to update.
 * @param webhook Settings of the webhook to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link Webhook} object.
 */
export const update = async (apiSecret: string, webhookId: number, webhook: UpdateWebhookRequest): Promise<Webhook> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/webhooks/${webhookId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(webhook),
    };

    return await sendPut<Webhook>(options);
};

/**
 * Removes the webhook from the account.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/webhooks-remove-webhook/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param webhookId Identifier of the publish token to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link Webhook} object.
 */
export const remove = async (apiSecret: string, webhookId: number): Promise<Webhook> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/webhooks/${webhookId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendDelete<Webhook>(options);
};

/**
 * Lists the webhooks of the account.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/webhooks-list-webhooks/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param listRequest The options to list the webhooks.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link Webhook} objects.
 */
export const list = async (apiSecret: string, listRequest: ListWebhooksRequest): Promise<Webhook[]> => {
    const params = {};
    if (listRequest.startingId) {
        params['startingId'] = listRequest.startingId.toString();
    }
    if (listRequest.itemCount) {
        params['itemCount'] = listRequest.itemCount.toString();
    }
    if (listRequest.isDescending) {
        params['isDescending'] = listRequest.isDescending.toString();
    }

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/webhooks/list',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<Webhook[]>(options);
};

/**
 * Adds a new webhook to the account.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/webhooks-add-webhook/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param webhook Information about the new webhook.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link Webhook} object.
 */
export const add = async (apiSecret: string, webhook: AddWebhookRequest): Promise<Webhook> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/webhooks/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(webhook),
    };

    return await sendPost<Webhook>(options);
};

/**
 * Sends a test event for the specified webhook type.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/webhooks-test-webhook/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param webhookType Type of webhook to test.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag indicating if the operation was successful or not.
 */
export const test = async (apiSecret: string, webhookType: WebhookType): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/webhooks/test/${webhookType}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendPost<boolean>(options);
};
