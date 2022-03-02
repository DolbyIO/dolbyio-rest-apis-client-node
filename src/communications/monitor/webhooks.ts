import { sendGet } from '../../internal/httpHelpers';
import { getAll } from '../internal/httpHelpers';
import JwtToken from '../types/jwtToken';
import { GetWebhooksOptions, GetAllWebhooksOptions, GetWebHookResponse, WebHook } from '../types/webhooks';

/**
 * Gets a list of Webhook events sent, during a specific time range. The list includes associated endpoint response codes and headers.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-webhooks
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the webhooks.
 *
 * @returns A `GetWebHookResponse` object through a `Promise`.
 */
export const getEvents = async (accessToken: JwtToken, options: GetWebhooksOptions): Promise<GetWebHookResponse> => {
    const optionsDefault: GetWebhooksOptions = {
        from: 0,
        to: 9999999999999,
        max: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    let path: string = '/v1/monitor/';
    if (opts.conferenceId) {
        path += `conferences/${opts.conferenceId}/`;
    }
    path += 'webhooks';

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.max.toString(),
    };

    if (opts.type) {
        params['type'] = opts.type;
    }
    if (opts.start) {
        params['start'] = opts.start;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as GetWebHookResponse;
};

/**
 * Gets a list of all Webhook events sent, during a specific time range. The list includes associated endpoint response codes and headers.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-webhooks
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the webhooks.
 *
 * @returns An array of `WebHook` objects through a `Promise`.
 */
export const getAllEvents = async (accessToken: JwtToken, options: GetAllWebhooksOptions): Promise<Array<WebHook>> => {
    const optionsDefault: GetAllWebhooksOptions = {
        from: 0,
        to: 9999999999999,
        page_size: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    let path: string = '/v1/monitor/';
    if (opts.conferenceId) {
        path += `conferences/${opts.conferenceId}/`;
    }
    path += 'webhooks';

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.page_size.toString(),
    };

    if (opts.type) {
        params['type'] = opts.type;
    }

    const requestOptions = {
        hostname: 'api.voxeet.com',
        path,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    return await getAll<WebHook>(requestOptions, 'webhooks');
};
