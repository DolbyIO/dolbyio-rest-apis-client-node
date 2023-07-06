import { sendGet, sendPost } from './internal/httpHelpers';
import * as Urls from '../urls';
import { GeoRestrictions } from './types/geo';

/**
 * Read Account Geo Restrictions.
 *
 * Gets account wide geo restrictions. If a Token (either Publish or Subscribe) does not define any geo restrictions, the account wide rules are used.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/geo_geo
 *
 * @param apiSecret The API secret.
 *
 * @returns A {@link GeoRestrictions} object through a {@link Promise}.
 */
export const read = async (apiSecret: string): Promise<GeoRestrictions> => {
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
 * Update Account Geo Restrictions
 *
 * Update account wide geo restrictions.
 *
 * @link https://docs.dolby.io/streaming-apis/reference/geo_updategeo
 *
 * @param apiSecret The API secret.
 * @param allowedCountries The publishing token. An empty array [] removes all rules.
 * @param deniedCountries The publishing token. An empty array [] removes all rules.
 *
 * @returns A {@link GeoRestrictions} object through a {@link Promise}.
 */
export const update = async (
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
