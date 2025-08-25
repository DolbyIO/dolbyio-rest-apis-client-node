import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import { CreateSubscribeToken, SubscribeToken, UpdateSubscribeToken } from './types/subscribeToken';

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
export const read = async (apiSecret: string, tokenId: number): Promise<SubscribeToken> => {
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
 * Deletes the subscribe token.
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
 * @deprecated
 * 
 * Updates the subscribe token.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/subscribe-token-v-1-update-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the subscribe token to update.
 * @param subscribeToken Settings of the subscribe token to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link SubscribeToken} object.
 */
export const update = async (apiSecret: string, tokenId: number, subscribeToken: UpdateSubscribeToken): Promise<SubscribeToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/subscribe_token/${tokenId}`,
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
 * @param sortBy How to sort the response.
 * @param page Number of the page to retrieve.
 * @param itemsOnPage Number of items per page.
 * @param isDescending Sort by descending order.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link SubscribeToken} objects.
 */
export const list = async (
    apiSecret: string,
    sortBy: 'Name' | 'AddedOn',
    page: number,
    itemsOnPage: number,
    isDescending: boolean = false
): Promise<SubscribeToken[]> => {
    const params = {
        sortBy,
        page: page.toString(),
        itemsOnPage: itemsOnPage.toString(),
        isDescending: isDescending.toString(),
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/subscribe_token/list',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<SubscribeToken[]>(options);
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
export const create = async (apiSecret: string, subscribeToken: CreateSubscribeToken): Promise<SubscribeToken> => {
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
