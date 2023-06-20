import { sendGet, sendPut } from './internal/httpHelpers';
import Urls from '../urls';
import { ClusterResponse } from './types/cluster';

export const read = async (apiSecret: string): Promise<ClusterResponse> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/cluster',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<ClusterResponse>(options);
};

export const update = async (apiSecret: string, defaultCluster: string): Promise<ClusterResponse> => {
    const body = {
        defaultCluster,
    };

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/cluster',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPut<ClusterResponse>(options);
};
