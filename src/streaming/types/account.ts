/**
 * Represents the settings of the geo cascading feature at the account level.
 */
export interface AccountGeoCascade {
    /**
     * Enable or Disable geo cascade.
     */
    isEnabled: boolean;
    /**
     * List of cluster IDs to geo cascade publish stream.
     * This list cannot be empty when {@link isEnabled} is `true`.
     * This list is ignored when {@link isEnabled} is set to `false`.
     * @defaultValue Defaults to `["all"]` if unset.
     */
    clusters?: string[];
}

/**
 * Represents the geo restrictions rules.
 */
export interface GeoRestrictions {
    /** List of allowed countries. */
    allowedCountries: string[];
    /** List of restricted countries. */
    deniedCountries: string[];
}
