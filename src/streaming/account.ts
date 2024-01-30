import { sendGet, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import { AccountGeoCascade } from './types/account';

/**
 * Gets account wide geo cascade settings.
 * If a Publish Token does not define any geo cascade settings, the account wide settings are used.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/account_getgeocascade
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountGeoCascade} object.
 */
export const getGeoCascade = async (apiSecret: string): Promise<AccountGeoCascade> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/account/geo_cascade',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<AccountGeoCascade>(options);
};

/**
 * Update account wide geo cascade settings to enable/disable the feature or update the account default cluster list.
 * `["all"]` could be used in place of cluster list to cascade stream to all existing and any future clusters available to the account.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/account_updategeocascade
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param settings The new default geo cascading cluster settings.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountGeoCascade} object.
 */
export const updateGeoCascade = async (apiSecret: string, settings: AccountGeoCascade): Promise<AccountGeoCascade> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/account/geo_cascade',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(settings),
    };

    return await sendPut<AccountGeoCascade>(options);
};
