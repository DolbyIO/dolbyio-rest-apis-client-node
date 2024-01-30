/**
 * Represents the geo restrictions for a stream.
 */
export interface GeoRestrictions {
    /** List of allowed countries. */
    allowedCountries: string[];
    /** List of restricted countries. */
    deniedCountries: string[];
}
