import { sendDelete, sendGet, sendPost, sendPut, sendPatch } from './internal/httpHelpers';
import * as Urls from '../urls';
import { ActivePublishToken, CreatePublishToken, PublishToken, UpdatePublishToken, DisablePublishTokenResponse } from './types/publishToken';

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

export const getActivePublishTokenId = async (apiSecret: string, streamId: string): Promise<ActivePublishToken> => {
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

    return await sendGet<ActivePublishToken>(options);
};

export const getAllActivePublishTokenId = async (apiSecret: string): Promise<ActivePublishToken> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/active/all',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<ActivePublishToken>(options);
};

export const disable = async (apiSecret: string, tokenIds: number[]): Promise<DisablePublishTokenResponse> => {
    const body = {
        tokenIds,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/publish_token/active/all',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPatch<DisablePublishTokenResponse>(options);
};
