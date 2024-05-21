import { getActivePublishTokenId, getAllActivePublishTokenId, disable } from '../publishToken';

/** Represents a publish token stream name. */
export interface PublishTokenStream {
    /** Name of the stream. */
    streamName: string;
    /** Is the name a <a href="https://en.wikipedia.org/wiki/Regular_expression" target="_blank">regular expression</a>. */
    isRegex?: boolean;
}

/** Represents a publish token. */
export interface PublishToken {
    /** Identifier of the publish token. */
    id: string;
    /** Name for the token that is used to display in the dashboard. */
    label: string;
    /** Publish token. */
    token: string;
    /** Date when the publish token was created. */
    addedOn: Date;
    /** Date at which the publish token expires. */
    expiresOn?: Date;
    /** Is the publish token active or not. */
    isActive: boolean;
    /** List of stream names. */
    streams: PublishTokenStream[];
    /**
     * If specified only the domains in list will be allowed in requests to Director API with token.
     * Wildcard subdomains are also allowed, e.g.: "*.demo.com".
     * When unspecified (empty list) there are no domain restrictions.
     */
    allowedOrigins: string[];
    /**
     * May specify multiple IPv4 addresses or CIDR notated network blocks.
     * If specified, the token will only be usable from those IP addresses.
     * @note Not currently supported with RTMP.
     */
    allowedIpAddresses: string[];
    /**
     * If specified will bind the token to the first X IP addresses used with token in requests to Director API, thus restricting the token to those IP addresses without being known beforehand.
     * @note Not currently supported with RTMP.
     */
    bindIpsOnUsage?: number;
    /**
     * Specify the ISO 3166-1 two letter country codes to explicitly allow viewer to watch the stream from.
     * If the viewer's location does not match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream.
     * This geo-fencing rule works in concert with the IP and domain restrictions as well.
     * Specifying geo restriction rules in a token will override account-wide rules.
     * Only one of {@link allowedCountries} or {@link deniedCountries} should be specified.
     * If the specified streams require authentication, the list of allowed countries can be overridden by the subscribe token.
     */
    allowedCountries: string[];
    /**
     * Specify the ISO 3166-1 two letter country codes to explicitly deny viewer to watch the stream from.
     * If the viewer's location does match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream.
     * This geo-fencing rule works in concert with the IP and domain restrictions as well.
     * Specifying geo restriction rules in a token will override account-wide rules.
     * Only one of {@link allowedCountries} or {@link deniedCountries} should be specified.
     * If the specified streams require authentication, the list of denied countries can be overridden by the subscribe token.
     */
    deniedCountries: string[];
    /** Cluster to route specified streams to. */
    originCluster: string;
    /** Does the publish token require authentication to subscribe to the specified streams */
    subscribeRequiresAuth: boolean;
    /** Is the publish token allowed to record the specified streams */
    record: boolean;
    /** Is multisource enabled or not. */
    multisource: boolean;
    /** Is low latency mode for RTMP ingest enabled or not. */
    lowLatencyRtmp?: boolean;
    /** Is thumbnails generation enabled or not. */
    enableThumbnails?: boolean;
    /** Display passphrase encryption settings in the dashboard as well as returning the SRT passphrase in response to this API call. */
    displaySrtPassphrase: boolean;
    /** The SRT passphrase. */
    srtPassphrase?: string;
    /** Geo cascade settings for cascading stream to other clusters. */
    geoCascade: PublishTokenGeoCascade;
    /**
     * Token effective settings for properties that use account default settings.
     * Value for each property will either be token or account level settings.
     */
    effectiveSettings: {
        /** Cluster to route specified streams to. */
        originCluster?: string;
        /**
         * Specify the ISO 3166-1 two letter country codes to explicitly allow viewer to watch the stream from.
         * If the viewer's location does not match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream.
         * This geo-fencing rule works in concert with the IP and domain restrictions as well.
         * Specifying geo restriction rules in a token will override account-wide rules.
         * Only one of {@link allowedCountries} or {@link deniedCountries} should be specified.
         * If the specified streams require authentication, the list of allowed countries can be overridden by the subscribe token.
         */
        allowedCountries?: string[];
        /**
         * Specify the ISO 3166-1 two letter country codes to explicitly deny viewer to watch the stream from.
         * If the viewer's location does match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream.
         * This geo-fencing rule works in concert with the IP and domain restrictions as well.
         * Specifying geo restriction rules in a token will override account-wide rules.
         * Only one of {@link allowedCountries} or {@link deniedCountries} should be specified.
         * If the specified streams require authentication, the list of denied countries can be overridden by the subscribe token.
         */
        deniedCountries?: string[];
        /** Geo cascade settings for cascading stream to other clusters. */
        geoCascade: PublishTokenGeoCascade;
    };
}

/** Represents the changes requested for a publish token. */
export interface UpdatePublishToken {
    /** Name for the token that is used to display in the dashboard. */
    label?: string;
    /** Refresh the publish token. */
    refreshToken?: boolean;
    /** Enables or disable the publish token. */
    isActive?: boolean;
    /** List of stream names to add to the list. */
    addTokenStreams?: PublishTokenStream[];
    /** List of stream names to remove from the list. */
    removeTokenStreams?: PublishTokenStream[];
    /** Update the list of allowed origins. */
    updateAllowedOrigins?: string[];
    /** Update the list of allows IP addresses. */
    updateAllowedIpAddresses?: string[];
    /** Update the bind IPs on usage value. */
    updateBindIpsOnUsage?: number;
    /** Update the list of allowed countries. */
    updateAllowedCountries?: string[];
    /** Update the list of denied countries. */
    updateDeniedCountries?: string[];
    /** Update the origin cluster. */
    updateOriginCluster?: string;
    /** Is authentication required to subscribe to the specified streams. */
    subscribeRequiresAuth?: boolean;
    /** Allow or disallow to record the specified streams. */
    record?: boolean;
    /** Enable or disable the multi source capability for this publish token. */
    multisource?: boolean;
    /** Enable or disable the low latency mode for RTMP ingest. */
    lowLatencyRtmp?: boolean;
    /** Enable or disable thumbnails generation. */
    enableThumbnails?: boolean;
    /** Display passphrase encryption settings in the dashboard as well as returning the SRT passphrase in response to this API call. */
    displaySrtPassphrase?: boolean;
    /** Update the geo cascading rules for this publish token. */
    updateGeoCascade?: PublishTokenGeoCascade;
}

/** Represents the information to create a publish token. */
export interface CreatePublishToken {
    /** Name for the token that is used to display in the dashboard. */
    label: string;
    /**
     * Number of seconds until the token expires.
     * @defaultValue If not specified, the token never expires.
     */
    expires?: number;
    /** List of stream names. */
    streams: PublishTokenStream[];
    /**
     * If specified only the domains in list will be allowed in requests to Director API with token.
     * Wildcard subdomains are also allowed, e.g.: "*.demo.com".
     * When unspecified (empty list) there are no domain restrictions.
     */
    allowedOrigins?: string[];
    /**
     * May specify multiple IPv4 addresses or CIDR notated network blocks.
     * If specified, the token will only be usable from those IP addresses.
     * @note Not currently supported with RTMP.
     */
    allowedIpAddresses?: string[];
    /**
     * If specified will bind the token to the first X IP addresses used with token in requests to Director API, thus restricting the token to those IP addresses without being known beforehand.
     * Mutually exclusive with {@link allowedIpAddresses} option.
     * @note Not currently supported with RTMP.
     */
    bindIpsOnUsage?: number;
    /**
     * Specify the ISO 3166-1 two letter country codes to explicitly allow viewer to watch the stream from.
     * If the viewer's location does not match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream.
     * This geo-fencing rule works in concert with the IP and domain restrictions as well.
     * Specifying geo restriction rules in a token will override account-wide rules.
     * Only one of {@link allowedCountries} or {@link deniedCountries} should be specified.
     * If the specified streams require authentication, the list of allowed countries can be overridden by the subscribe token.
     */
    allowedCountries?: string[];
    /**
     * Specify the ISO 3166-1 two letter country codes to explicitly deny viewer to watch the stream from.
     * If the viewer's location does match any of the specified countries, they will be blocked from viewing stream, else they will be allowed to view stream.
     * This geo-fencing rule works in concert with the IP and domain restrictions as well.
     * Specifying geo restriction rules in a token will override account-wide rules.
     * Only one of {@link allowedCountries} or {@link deniedCountries} should be specified.
     * If the specified streams require authentication, the list of denied countries can be overridden by the subscribe token.
     */
    deniedCountries?: string[];
    /**
     * Cluster to route specified streams to.
     * @defaultValue Default is the account's default cluster.
     */
    originCluster?: string;
    /**
     * Set to `true` to require authentication to subscribe to the specified streams.
     * @defaultValue `false`.
     */
    subscribeRequiresAuth?: boolean;
    /**
     * Set to `true` to allow this publish token to be allowed to record the specified streams.
     * @defaultValue `false`.
     */
    record?: boolean;
    /**
     * Set to `false` to disable the multi source capability for this publish token.
     * @defaultValue `true`.
     */
    multisource?: boolean;
    /**
     * Set to `true` to receive webhook notifications for thumbnails for the specified streams.
     * @defaultValue `false`.
     * @link https://docs.dolby.io/streaming-apis/docs/thumbnail-webhooks
     */
    enableThumbnails?: boolean;
    /**
     * Set to `true` to display passphrase encryption settings in the dashboard as well as returning the SRT passphrase in response to this API call.
     * @defaultValue `false`.
     */
    displaySrtPassphrase?: boolean;
    /**
     * Set to `false` disable the low latency mode for RTMP ingest.
     * @defaultValue `true`.
     */
    lowLatencyRtmp?: boolean;
    /**
     * Geo cascade settings for cascading stream to other clusters.
     * @defaultValue Defaults to account related setting if unset.
     */
    geoCascade?: PublishTokenGeoCascade;
    /**
     * Set to `true` to allow this publish token to enable live clipping on specified streams.
     * This flag cannot be set to `true` when the {@link record} flag is enabled.
     * @defaultValue `false`.
     * @beta
     * @remarks Live clipping is currently in Beta phase.
     */
    clip?: boolean;
}

/**
 * Represents the definition of the geo cascading rules for a publish token.
 */
export interface PublishTokenGeoCascade {
    /**
     * Enable or Disable geo cascade.
     * @defaultValue Defaults to Account settings if unset for publish token.
     */
    isEnabled?: boolean;
    /**
     * List of cluster IDs to geo cascade publish stream.
     * Cannot be empty when {@link isEnabled} is `true`.
     * This list is ignored when {@link isEnabled} is set to `false`.
     * @defaultValue Defaults to `["all"]` if unset.
     */
    clusters?: string[];
}

/**
 * Represents the response to a {@link getActivePublishTokenId} or {@link getAllActivePublishTokenId} request.
 */
export interface ActivePublishTokenResponse {
    /** List of active publish tokens IDs. */
    tokenIds: number[];
}

/**
 * Represents the response to a {@link disable} request.
 */
export interface DisablePublishTokenResponse {
    /** List of tokens successfully disabled. */
    successfulTokens?: number[];
    /** List of tokens that failed to be disabled. */
    failedTokens?: {
        /** Identifier of the token. */
        tokenId: number;
        /** Reason why the token has failed to be disabled. */
        errorMessage?: string;
    }[];
}
