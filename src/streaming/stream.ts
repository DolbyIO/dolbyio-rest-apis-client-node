import { sendPost } from '../internal/httpHelpers';
import { SAPI_HOSTNAME } from './internal/urls';

export const stop = async (apiSecret: string, streamId: string): Promise<void> => {
    const body = {
        streamId,
    };

    const options = {
        hostname: SAPI_HOSTNAME,
        path: '/api/stream/stop',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    await sendPost(options);
};

export const stopAll = async (apiSecret: string): Promise<void> => {
    const options = {
        hostname: SAPI_HOSTNAME,
        path: '/api/stream/stop/all',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    await sendPost(options);
};
