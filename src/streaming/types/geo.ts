/**
 * Represents the geo restrictions rules.
 */
export interface GeoRestrictions {
    /** List of allowed countries. */
    allowedCountries: string[];
    /** List of restricted countries. */
    deniedCountries: string[];
}
