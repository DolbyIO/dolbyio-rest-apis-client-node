import { sendDelete, sendGet, sendPost, sendPut } from './internal/httpHelpers';
import * as Urls from '../urls';
import {
    AccountMediaAssetsExpirationRules,
    AccountDistributionSettings,
    AccountSecuritySettings,
    ListStorageProfilesSortOptions,
    StorageProfile,
    StorageProfileValidationRequest,
    StorageProfileValidationResponse,
} from './types/account';
import { read } from './assets';

/**
 * ## Get Account Media Assets Expiration Rule
 *
 * Get account level expiration rule for various media asset types.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-get-expiration-rules/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountMediaAssetsExpirationRules} object.
 */
export const readAccountMediaAssetsExpirationRules = async (apiSecret: string): Promise<AccountMediaAssetsExpirationRules> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/media/expiration',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<AccountMediaAssetsExpirationRules>(options);
};

/**
 * ## Update Account Media Assets Expiration Rules
 *
 * Update account level expiration rule for various media asset types.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-update-expiration-rules/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param settings The new account media assets expiration rules.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountMediaAssetsExpirationRules} object.
 */
export const updateAccountMediaAssetsExpirationRules = async (
    apiSecret: string,
    settings: AccountMediaAssetsExpirationRules
): Promise<AccountMediaAssetsExpirationRules> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/media/expiration',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(settings),
    };

    return await sendPost<AccountMediaAssetsExpirationRules>(options);
};

/**
 * ## List Storage Profiles
 *
 * List all storage profiles created on your account.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-list-storage-profiles/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param options Options to sort the response.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives an array of {@link StorageProfile} objects.
 */
export const listStorageProfiles = async (apiSecret: string, options: ListStorageProfilesSortOptions): Promise<StorageProfile[]> => {
    const params = {
        sortBy: options.sortBy,
        page: options.page.toString(),
        itemsOnPage: options.itemsOnPage.toString(),
        isDescending: (options.isDescending ?? false).toString(),
    };

    if (options.default) {
        params['default'] = options.default.toString();
    }

    const queryOptions = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/media/storage',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<StorageProfile[]>(queryOptions);
};

/**
 * ## Create Storage Profile
 *
 * Create a storage profile identifying the configuration for a cloud storage provider that can receive media assets when they are finished processing.
 * Only one storage profile will be set as a default for the entire account,
 * otherwise you may specify a storage location using the `storageProfileId` on any individual media clip request.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-create-storage-profile/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param storageProfile Information about the new storage profile.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link PublishToken} object.
 */
export const createStorageProfile = async (apiSecret: string, storageProfile: StorageProfile): Promise<StorageProfile> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/media/storage',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(storageProfile),
    };

    return await sendPost<StorageProfile>(options);
};

/**
 * ## Delete Storage Profile
 *
 * Specify the id of a storage profile you wish to delete.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-delete-storage-profile/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param storageProfileId Identifier of the storage profile to delete.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a flag to indicate if the operation succeeded or not.
 */
export const deleteStorageProfile = async (apiSecret: string, storageProfileId: string): Promise<boolean> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/account/media/storage/${storageProfileId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendDelete<boolean>(options);
};

/**
 * ## Get Storage Profile
 *
 * Get details of a saved storage profile.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-get-storage-profile/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param storageProfileId Identifier of the storage profile to read.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link StorageProfile} object.
 */
export const getStorageProfile = async (apiSecret: string, storageProfileId: string): Promise<StorageProfile> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/account/media/storage/${storageProfileId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<StorageProfile>(options);
};

/**
 * ## Updates the storage profile
 *
 * Change the details of a storage profile.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-update-storage-profile/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param storageProfileId Identifier of the storage profile to update.
 * @param storageProfile Settings of the torage profile to update.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link StorageProfile} object.
 */
export const updateStorageProfile = async (apiSecret: string, storageProfileId: number, storageProfile: StorageProfile): Promise<StorageProfile> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: `/api/v3/account/media/storage/${storageProfileId}`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(storageProfile),
    };

    return await sendPut<StorageProfile>(options);
};

/**
 * ## Validate Third Party Storage Setup
 *
 * Validates third party storage is configured with permissions for Dolby.io to upload media assets.
 *
 * To track the validation result, keep note of the the `id` returned in the response body.
 * If correctly configured, when calling {@link read | Read Media Asset}, the response should return a successful entry with `id` matching the `id`.
 * Run once to validate write permissions. If successful, optionally run a second time to confirm that overwriting is allowed.
 *
 * Note that validation results are only available for 1 hour.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-validate-third-party-storage/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param storageProfile Information about the new storage profile to validate.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link PublishToken} object.
 */
export const validateStorageProfile = async (apiSecret: string, storageProfile: StorageProfileValidationRequest): Promise<StorageProfileValidationResponse> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/media/storage',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(storageProfile),
    };

    return await sendPost<StorageProfileValidationResponse>(options);
};

/**
 * ## Read Account Distribution Settings
 *
 * Gets account wide distribution settings.
 * Whenever publish tokens are created, these will be the default settings used for features that impact how streams are distributed.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-get-account-distribution/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountDistributionSettings} object.
 */
export const readAccountDistributionSettings = async (apiSecret: string): Promise<AccountDistributionSettings> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/distribution',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<AccountDistributionSettings>(options);
};

/**
 * ## Update Account Distribution Settings
 *
 * Update account wide distribution settings to enable/disable the feature or update the account default cluster list.
 * Whenever publish tokens are created, these will be the default settings used for features that impact how streams are distributed.
 * `["all"]` could be used in place of cluster list to cascade stream to all existing and any future clusters available to the account.
 * Empty cluster list is not allowed when enabling account wide distribution settings.
 * Cluster list is translated to `["all"]` clusters if not specified or set to null.
 * Cluster list is ignored when geo cascade is disabled.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-update-account-distribution/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param settings The new account distribution settings.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountDistributionSettings} object.
 */
export const updateAccountDistributionSettings = async (apiSecret: string, settings: AccountDistributionSettings): Promise<AccountDistributionSettings> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/account/geo_cascade',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(settings),
    };

    return await sendPut<AccountDistributionSettings>(options);
};

/**
 * ## Read Account Security Settings
 *
 * Gets account wide security settings.
 * If a Token (either Publish or Subscribe) does not define any security settings, the account wide rules are used.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-get-account-security/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountSecuritySettings} object.
 */
export const readAccountSecuritySettings = async (apiSecret: string): Promise<AccountSecuritySettings> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/security',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
    };

    return await sendGet<AccountSecuritySettings>(options);
};

/**
 * ## Update Account Security Settings
 *
 * Update account wide security settings. Updated to an empty array `[]` removes all rules of that type.
 *
 * @see {@link https://optiview.dolby.com/docs/millicast/api/account-update-account-security/}
 *
 * @param apiSecret The API Secret used to authenticate this request.
 * @param settings The new account security settings.
 *
 * @returns A {@link !Promise Promise} whose fulfillment handler receives a {@link AccountSecuritySettings} object.
 */
export const updateAccountSecuritySettings = async (apiSecret: string, settings: AccountSecuritySettings): Promise<AccountSecuritySettings> => {
    const options = {
        hostname: Urls.getRtsHostname(),
        path: '/api/v3/account/security',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiSecret}`,
        },
        body: JSON.stringify(settings),
    };

    return await sendPost<AccountSecuritySettings>(options);
};
