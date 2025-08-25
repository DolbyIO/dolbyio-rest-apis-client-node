import { sendDelete, sendGet, sendPost, sendPut, sendPatch } from './internal/httpHelpers';
import * as Urls from '../urls';
import { ActivePublishTokenResponse, CreatePublishToken, PublishToken, UpdatePublishToken, DisablePublishTokenResponse } from './types/publishToken';

/**
 * Gets the specified publish token.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-read-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the publish token to read.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link PublishToken} object.
 */
export const read = async (apiSecret: string, tokenId: number): Promise<PublishToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/publish_token/${tokenId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<PublishToken>(options);
};

/**
 * Deletes the publish token.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-delete-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the publish token to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const deleteToken = async (apiSecret: string, tokenId: number): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/publish_token/${tokenId}`,
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
 * Updates the publish token.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-update-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the publish token to update.
 * @param publishToken Settings of the publish token to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link PublishToken} object.
 */
export const update = async (apiSecret: string, tokenId: number, publishToken: UpdatePublishToken): Promise<PublishToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/publish_token/${tokenId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(publishToken),
    };

    return await sendPut<PublishToken>(options);
};

/**
 * Lists all publish tokens with specific sorting and pagination.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-list-tokens/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param sortBy How to sort the response.
 * @param page Number of the page to retrieve.
 * @param itemsOnPage Number of items per page.
 * @param isDescending Sort by descending order.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link PublishToken} objects.
 */
export const list = async (
    apiSecret: string,
    sortBy: 'Name' | 'AddedOn',
    page: number,
    itemsOnPage: number,
    isDescending: boolean = false
): Promise<PublishToken[]> => {
    const params = {
        sortBy,
        page: page.toString(),
        itemsOnPage: itemsOnPage.toString(),
        isDescending: isDescending.toString(),
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/list',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<PublishToken[]>(options);
};

/**
 * Creates a publish token.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-create-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param publishToken Information about the new publish token.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link PublishToken} object.
 */
export const create = async (apiSecret: string, publishToken: CreatePublishToken): Promise<PublishToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(publishToken),
    };

    return await sendPost<PublishToken>(options);
};

/**
 * Gets the Publish Token ID of an active stream by its Stream ID.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-get-active-token-by-stream-id/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param streamId Stream ID for which to get the publish token IDs.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link ActivePublishTokenResponse} object.
 */
export const getActivePublishTokenId = async (apiSecret: string, streamId: string): Promise<ActivePublishTokenResponse> => {
    const params = {
        streamId,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/active',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<ActivePublishTokenResponse>(options);
};

/**
 * Gets all Publish Token IDs for active streams on the account.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-get-all-active-tokens-by-account/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link ActivePublishTokenResponse} object.
 */
export const getAllActivePublishTokenId = async (apiSecret: string): Promise<ActivePublishTokenResponse> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/active/all',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<ActivePublishTokenResponse>(options);
};

/**
 * Disables Publish Token(s) by their Token ID. An array of Token IDs can be used for bulk disable.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-disable-tokens/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenIds List of token IDs to disable.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link DisablePublishTokenResponse} object.
 */
export const disable = async (apiSecret: string, tokenIds: number[]): Promise<DisablePublishTokenResponse> => {
    const body = {
        tokenIds,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/disable',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPatch<DisablePublishTokenResponse>(options);
};
