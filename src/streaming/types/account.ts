/**
 * Represents the settings of the geo cascading feature at the account level.
 */
export interface AccountGeoCascade {
    /**
     * Enable or Disable geo cascade.
     * Null is not allowed for account settings.
     * Defaults to Account settings if unset for publish token.
     */
    isEnabled: boolean;
    /**
     * List of cluster IDs to geo cascade publish stream.
     * This list cannot be empty when {@link isEnabled} is `true`.
     * This list is ignored when {@link isEnabled} is set to `false`.
     * Defaults to `["all"]` if unset.
     */
    clusters?: string[];
}
