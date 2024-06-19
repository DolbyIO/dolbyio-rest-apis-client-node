/**
 * Represents a JWT token used for authentication.
 */
export interface JwtToken {
    /** The access token to use to authenticate requests. */
    access_token: string;
    /** Expiration of the access token. */
    expires_in: number;
    /** The type of access token. Always `Bearer`. */
    token_type: string;
    /** Authorization scope for the access token. */
    scope?: string;
}
