import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import {
    CreateSubscribeToken,
    SubscribeToken,
    UpdateSubscribeToken,
    ListSubscribeTokensSortOptions,
    ListSubscribeTokensByNameSortOptions,
} from './types/subscribeToken';

/**
 * Gets the specified subscribe token.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/subscribe-token-v-1-read-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the subscribe token to read.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link SubscribeToken} object.
 */
export const getToken = async (apiSecret: string, tokenId: number): Promise<SubscribeToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/subscribe_token/${tokenId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<SubscribeToken>(options);
};

/**
 * ## Deletes the subscribe token
 *
 * Deletes token specified by the token's ID. The Token ID can be found using the {@link listTokens | List Tokens API} or in the API response of {@link createToken | Create Token API}.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/subscribe-token-v-1-delete-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the subscribe token to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const deleteToken = async (apiSecret: string, tokenId: number): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/subscribe_token/${tokenId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendDelete<boolean>(options);
};

/**
 * ## Updates the subscribe token
 *
 * Update token stream information as well as updates token itself.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/subscribe-token-v-2-update-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the subscribe token to update.
 * @param subscribeToken Settings of the subscribe token to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link SubscribeToken} object.
 */
export const updateToken = async (apiSecret: string, tokenId: number, subscribeToken: UpdateSubscribeToken): Promise<SubscribeToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v2/subscribe_token/${tokenId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(subscribeToken),
    };

    return await sendPut<SubscribeToken>(options);
};

/**
 * Lists all subscribe tokens with specific sorting and pagination.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/subscribe-token-v-1-list-tokens/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link SubscribeToken} objects.
 */
export const listTokens = async (apiSecret: string, options: ListSubscribeTokensSortOptions): Promise<SubscribeToken[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/subscribe_token/list',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<SubscribeToken[]>(queryOptions);
};

/**
 * ## List Subscribe Tokens By Name
 *
 * List all tokens with specific sorting and pagination that matches given token name or stream name.
 * Tokens with wildcard stream names are excluded from the responses.
 * If response array is empty, you have reached the end of the list ordering.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/subscribe-token-v-1-list-tokens-by-name/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link SubscribeToken} objects.
 */
export const listTokensByName = async (apiSecret: string, options: ListSubscribeTokensByNameSortOptions): Promise<SubscribeToken[]> => {
    const params = {
        name: options.name,
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    if (options.filterBy) {
        params['filterBy'] = options.filterBy;
    }

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/subscribe_token/list_by_name',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<SubscribeToken[]>(queryOptions);
};

/**
 * Creates a subscribe token.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/subscribe-token-v-1-create-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param subscribeToken Information about the new subscribe token.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link SubscribeToken} object.
 */
export const createToken = async (apiSecret: string, subscribeToken: CreateSubscribeToken): Promise<SubscribeToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/subscribe_token/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(subscribeToken),
    };

    return await sendPost<SubscribeToken>(options);
};
