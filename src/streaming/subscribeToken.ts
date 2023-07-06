import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import { CreateSubscribeToken, SubscribeToken, UpdateSubscribeToken } from './types/subscribeToken';

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
