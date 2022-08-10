import http from 'http';
import { sendGet, sendPost, sendPut, sendDelete, AuthRequestOptions } from './internal/httpHelpers';
import JwtToken from './types/jwtToken';
import { UpdateWebhookOptions, Webhook } from './types/webhooks';

/**
 * Registers a webhook that is triggered when a job completes.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-webhook-post
 *
 * @param accessToken Access token to use for authentication.
 * @param url The callback url that will be called when job execution completes.
 * @param headers (Optional) Headers to include in the webhook call.
 *
 * @returns The webhook identifier through a `Promise`.
 */
export const registerWebhook = async (accessToken: JwtToken, url: string, headers?: http.OutgoingHttpHeaders): Promise<string | null> => {
    const payload = {
        callback: {
            url: url,
        },
    };

    if (headers) {
        payload.callback['headers'] = headers;
    }

    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/webhooks',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        accessToken,
        body: JSON.stringify(payload, null, '  '),
    };

    const response = await sendPost(requestOptions);
    if (response.hasOwnProperty('webhook_id')) {
        return response['webhook_id'];
    }

    return null;
};

/**
 * Updates the previously registered webhook configuration.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-webhook-put
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to update the webhook.
 */
export const updateWebhook = async (accessToken: JwtToken, options: UpdateWebhookOptions): Promise<void> => {
    const payload = {
        callback: {
            url: options.url,
        },
    };

    if (options.headers) {
        payload.callback['headers'] = options.headers;
    }

    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/webhooks',
        params: {
            id: options.webhookId,
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        accessToken,
        body: JSON.stringify(payload, null, '  '),
    };

    await sendPut(requestOptions);
};

/**
 * Retrieves the previously registered webhook configuration.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-webhook-get
 *
 * @param accessToken Access token to use for authentication.
 * @param webhookId Identifier of the webhook to retrieve.
 *
 * @returns The `Webhook` object through a `Promise`.
 */
export const retrieveWebhook = async (accessToken: JwtToken, webhookId: string): Promise<Webhook> => {
    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/webhooks',
        params: {
            id: webhookId,
        },
        headers: {},
        accessToken,
    };

    const response = await sendGet(requestOptions);
    return response as Webhook;
};

/**
 * Deletes a previously registered webhook configuration.
 *
 * @link https://docs.dolby.io/media-apis/reference/media-webhook-delete
 *
 * @param accessToken Access token to use for authentication.
 * @param webhookId Identifier of the webhook to delete.
 *
 * @returns The webhook identifier through a `Promise`.
 */
export const deleteWebhook = async (accessToken: JwtToken, webhookId: string): Promise<string | null> => {
    const requestOptions: AuthRequestOptions = {
        hostname: 'api.dolby.com',
        path: '/media/webhooks',
        params: {
            id: webhookId,
        },
        headers: {},
        accessToken,
    };

    const response = await sendDelete(requestOptions);
    if (response.hasOwnProperty('webhook_id')) {
        return response['webhook_id'];
    }

    return null;
};
