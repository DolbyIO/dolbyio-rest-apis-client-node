import { sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import { AccountGeoCascade, GeoRestrictions } from './types/account';

/**
 * @deprecated
 * 
 * Gets the account geo cascading settings.
 * If a Publish Token does not define any geo cascade settings, the account wide settings are used.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-get-geo-cascade/}
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
 * @deprecated
 * 
 * Update account wide geo cascading settings to enable/disable the feature or update the account default cluster list.
 * `["all"]` could be used in place of cluster list to cascade stream to all existing and any future clusters available to the account.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-update-geo-cascade/}
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

/**
 * @deprecated
 * 
 * Gets the account geo restriction rules.
 *
 * If a token (either Publish or Subscribe) does not define any geo restrictions, the account wide rules are used.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/geo-geo/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link GeoRestrictions} object through a {@link Promise}.
 */
export const readGeoRestrictions = async (apiSecret: string): Promise<GeoRestrictions> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/geo/account',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<GeoRestrictions>(options);
};

/**
 * @deprecated
 * 
 * Updates the account geo restriction rules.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/geo-update-geo/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param allowedCountries The list of allowed countries. An empty array `[]` removes all rules.
 * @param deniedCountries The list of denied countries. An empty array `[]` removes all rules.
 *
 * @returns A {@link GeoRestrictions} object through a {@link Promise}.
 */
export const updateGeoRestrictions = async (
    apiSecret: string,
    allowedCountries: string[] | null = null,
    deniedCountries: string[] | null = null
): Promise<GeoRestrictions> => {
    const body = {};
    if (allowedCountries) body['updateAllowedCountries'] = allowedCountries;
    if (deniedCountries) body['updateDeniedCountries'] = deniedCountries;

    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/geo/account',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(body),
    };

    return await sendPost<GeoRestrictions>(options);
};
