import { JwtToken } from '../../types/jwtToken';

export interface GetClientAccessTokenOptions {
    /**
     * Access token to use for authentication.
     */
    accessToken: JwtToken;
    /**
     * Access token expiration time in seconds.
     * The maximum value is 86,400, indicating 24 hours.
     * If no value is specified, the default is 3,600, indicating one hour.
     */
    expiresIn?: number;
    /** The unique identifier of the participant who requests the token. */
    externalId?: string;
    /**
     * A list of case-sensitive strings allowing you to control what scope of access the client access token should have.
     * The API supports the following scopes:
     * * `conf:create`: Allows creating a new conference.
     * * `notifications:set`: Allows the client to subscribe to events.
     * * `file:convert`: Allows converting files.
     * * `session:update`: Allows updating the participant's name and avatar URL.
     * Incorrect values are omitted. If you want to give the token access to all scopes, you can use a wildcard, such as *.
     */
    sessionScope: string[];
}
