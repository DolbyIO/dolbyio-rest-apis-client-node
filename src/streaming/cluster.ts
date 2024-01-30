import { sendGet, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import { ClusterResponse } from './types/cluster';

/**
 * Gets the default cluster and list the available onces.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/cluster_getclustersinfo
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link ClusterResponse} object.
 */
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

/**
 * Updates the default cluster for the account.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/cluster_updateclusterinfo
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param defaultCluster The new default cluster.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link ClusterResponse} object.
 */
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
