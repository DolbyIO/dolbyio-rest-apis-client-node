import { create } from '../assets';
import { listStorageProfiles, validateStorageProfile } from '../account';
import { ListSortOptions } from './core';

/**
 * Represents the account distribution settings.
 */
export interface AccountMediaAssetsExpirationRules {
    /**
     * Account level expiration rule for timelines.
     * If custom rule is not set, by default, timelines expire after 1 day.
     */
    timelines?: {
        /** Number of days. Must be between 1 and 365. */
        days: number;
    };
    /**
     * Account level expiration rule for recordings.
     * Expiration countdown begin upon recording creation (i.e. when {@link create | Create Media Asset} the recording is stopped).
     * If custom rule is not set, recordings never expire and this field will be empty.
     */
    recordings?: {
        /** Number of days. Must be between 1 and 365. */
        days: number;
    };
    /**
     * Account level expiration rule for clips.
     * Expiration countdown begin upon clip creation (i.e. when {@link create | Create Media Asset} is invoke).
     * If custom rule is not set, clips never expire by default and this field will be empty.
     * Setting the expiration value on in the request body of {@link create | Create Media Asset} overrides the rule configured here.
     */
    clips?: {
        /** Number of days. Must be between 1 and 365. */
        days: number;
    };
}

/**
 * Represents the account distribution settings.
 */
export interface AccountDistributionSettings {
    /**
     * Controls if and which geographic clusters are included for regional content delivery.
     */
    isEngeoCascadeabled: GeoCascade;
}

/** Represents the options to sort the response for {@link listStorageProfiles | listing the storage profiles}. */
export interface ListStorageProfilesSortOptions extends ListSortOptions<'Name'> {
    /** Set to true to get the default storage profile on your account. */
    default?: boolean;
}

/**
 * Represents a storage profile.
 */
export interface StorageProfile {
    /** Identifier of the storage profile. */
    id?: string;
    /** Name of the storage profile. */
    name?: string;
    /** Flag indicating if this is the default storage profile. */
    default?: boolean;
    /** Type of storage. */
    type?: 'gcs' | 'awsS3' | 'dolbyStorage';
    /** Storage profile options. */
    options?: {
        /**
         * Prefix to object when stored in bucket i.e. `protocol://bucketName/objectPrefix/objectName.ext`.
         * `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.
         */
        objectPrefix?: string;
        /** Name of bucket to upload clips to. Please ensure Dolby's service account is granted access. */
        bucketName: string;
        /** Region of the specified bucket. Required when using storageType `awsS3`. */
        bucketRegion?: string;
    };
}

/**
 * Represents a storage profile {@link validateStorageProfile | validation} request.
 */
export interface StorageProfileValidationRequest {
    /** Identifier of the storage profile. */
    profileId: string;
    /** Type of storage. */
    type?: 'gcs' | 'awsS3' | 'dolbyStorage';
    /** Storage profile options. */
    options?: {
        /**
         * Prefix to object when stored in bucket i.e. `protocol://bucketName/objectPrefix/objectName.ext`.
         * `objectName` is either defined by a system assigned GUID or the user-specified `clipName`.
         */
        objectPrefix?: string;
        /** Name of bucket to upload clips to. Please ensure Dolby's service account is granted access. */
        bucketName: string;
        /** Region of the specified bucket. Required when using storageType `awsS3`. */
        bucketRegion?: string;
    };
}

/**
 * Represents a storage profile {@link validateStorageProfile | validation} response.
 */
export interface StorageProfileValidationResponse {
    /** Identifier. */
    id: string;
    /** Storage profile information. */
    storage?: {
        /** Type of storage. */
        type?: 'gcs' | 'awsS3' | 'dolbyStorage';
        /** Path to clip storage location. Available only for external storage configurations. */
        path?: string;
    };
}

/**
 * Represents the settings of the geo cascading feature at the account level.
 */
export interface GeoCascade {
    /**
     * Enable or disable geo cascading.
     */
    isEnabled: boolean;
    /**
     * List of cluster IDs to geo cascade a publish stream to.
     * This list cannot be empty when {@link isEnabled} is `true`.
     * This list is ignored when {@link isEnabled} is set to `false`.
     * @defaultValue Defaults to `["all"]` if unset.
     */
    clusters?: string[];
}

/**
 * Represents the account security settings.
 */
export interface AccountSecuritySettings {
    /** List of allowed countries. */
    allowedCountries: string[];
    /** List of restricted countries. */
    deniedCountries: string[];
}
