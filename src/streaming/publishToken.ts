import { sendDelete, sendGet, sendPost, sendPut, sendPatch } from './internal/httpHelpers';
import * as Urls from '../urls';
import {
    ActivePublishTokenResponse,
    CreatePublishToken,
    PublishToken,
    UpdatePublishToken,
    DisablePublishTokenResponse,
    ListPublishTokensSortOptions,
    ListPublishTokensByNameSortOptions,
    ListPublishTokensByClusterSortOptions,
} from './types/publishToken';

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
export const getToken = async (apiSecret: string, tokenId: number): Promise<PublishToken> => {
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
 * ## Deletes the publish token
 *
 * Deletes token specified by the token's ID. The Token ID can be found using the {@link listTokens | List Tokens API} or in the API response of {@link createToken | Create Token API}.
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
 * ## Updates the publish token
 *
 * Update token stream information as well as updates token itself.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-2-update-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the publish token to update.
 * @param publishToken Settings of the publish token to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link PublishToken} object.
 */
export const updateToken = async (apiSecret: string, tokenId: number, publishToken: UpdatePublishToken): Promise<PublishToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v2/publish_token/${tokenId}`,
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
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link PublishToken} objects.
 */
export const listTokens = async (apiSecret: string, options: ListPublishTokensSortOptions): Promise<PublishToken[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/list',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<PublishToken[]>(queryOptions);
};

/**
 * ## List Publish Tokens By Name
 *
 * List all tokens with specific sorting and pagination that matches given token name or stream name.
 * Tokens with wildcard stream names are excluded from the responses.
 * If response array is empty, you have reached the end of the list ordering.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-list-tokens-by-name/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link PublishToken} objects.
 */
export const listTokensByName = async (apiSecret: string, options: ListPublishTokensByNameSortOptions): Promise<PublishToken[]> => {
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
        path: '/api/publish_token/list_by_name',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<PublishToken[]>(queryOptions);
};

/**
 * ## List Publish Tokens By Cluster
 *
 * List all tokens with specific sorting and pagination that matches given cluster region.
 * If response array is empty, you have reached the end of the list ordering.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-list-tokens-by-cluster/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link PublishToken} objects.
 */
export const listTokensByCluster = async (apiSecret: string, options: ListPublishTokensByClusterSortOptions): Promise<PublishToken[]> => {
    const params = {
        cluster: options.cluster,
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/list_by_cluster',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<PublishToken[]>(queryOptions);
};

/**
 * ## Creates a publish token
 *
 * Creates new token given a label and associated stream name(s).
 * Stream names are limited to 128 characters.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-create-token/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param publishToken Information about the new publish token.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link PublishToken} object.
 */
export const createToken = async (apiSecret: string, publishToken: CreatePublishToken): Promise<PublishToken> => {
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
export const disableToken = async (apiSecret: string, tokenIds: number[]): Promise<DisablePublishTokenResponse> => {
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

/**
 * ## Sync restreams
 *
 * Apply any re-stream configuration changes for running streams immediately.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/publish-token-v-1-sync-restream/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param tokenId Identifier of the publish token to sync.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const syncRestream = async (apiSecret: string, tokenId: string): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/publish_token/${tokenId}/restream/sync`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendPost<boolean>(options);
};
