/**
 * Represents the settings of the geo cascading feature at the account level.
 */
export interface AccountGeoCascade {
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
 * Represents the geo restriction rules.
 */
export interface GeoRestrictions {
    /** List of allowed countries. */
    allowedCountries: string[];
    /** List of restricted countries. */
    deniedCountries: string[];
}
