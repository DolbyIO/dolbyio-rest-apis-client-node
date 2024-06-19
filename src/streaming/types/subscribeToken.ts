/** Represents a subscribe token stream name. */
export interface SubscribeTokenStream {
    /** Name of the stream. */
    streamName: string;
    /** Is the name a <a href="https://en.wikipedia.org/wiki/Regular_expression" target="_blank">regular expression</a>. */
    isRegex?: boolean;
}

/** Represents a subscribe token. */
export interface SubscribeToken {
    /** Identifier of the subscribe token. */
    id: string;
    /** Name for the token that is used to display in the dashboard. */
    label: string;
    /** Subscribe token. */
    token: string;
    /** Date when the subscribe token was created. */
    addedOn: Date;
    /** Date at which the subscribe token expires. */
    expiresOn?: Date;
    /** Is the subscribe token active or not. */
    isActive: boolean;
    /** List of stream names. */
    streams: SubscribeTokenStream[];
    /**
     * If specified only the domains in list will be allowed in requests to Director API with token.
     * Wildcard subdomains are also allowed, e.g.: "*.demo.com".
     * When unspecified (empty list) there are no domain restrictions.
     */
    allowedOrigins: string[];
    /**
     * May specify multiple IPv4 addresses or CIDR notated network blocks.
     * If specified, the token will only be usable from those IP addresses.
     */
    allowedIpAddresses: string[];
    /**
     * If specified will bind the token to the first X IP addresses used with token in requests to Director API, thus restricting the token to those IP addresses without being known beforehand.
     */
    bindIpsOnUsage: number;
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
        geoCascade: {
            /**
             * Enable or Disable geo cascade.
             * @defaultValue Defaults to Account settings if unset for subscribe token.
             */
            isEnabled?: boolean;
            /**
             * List of cluster IDs to geo cascade subscribe stream.
             * Cannot be empty when {@link isEnabled} is `true`.
             * This list is ignored when {@link isEnabled} is set to `false`.
             * @defaultValue Defaults to `["all"]` if unset.
             */
            clusters?: string[];
        };
    };
    /** Tracking information. */
    tracking: {
        /** Tracking identifier for Stream Syndication. */
        trackingId?: string;
    };
}

/** Represents the changes requested for a subscribe token. */
export interface UpdateSubscribeToken {
    /** Name for the token that is used to display in the dashboard. */
    label?: string;
    /** Refresh the publish token. */
    refreshToken?: boolean;
    /** Enables or disable the publish token. */
    isActive?: boolean;
    /** List of stream names to add to the list. */
    addTokenStreams?: SubscribeTokenStream[];
    /** List of stream names to remove from the list. */
    removeTokenStreams?: SubscribeTokenStream[];
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
}

/** Represents the information to create a subscribe token. */
export interface CreateSubscribeToken {
    /** Name for the token that is used to display in the dashboard. */
    label: string;
    /**
     * Number of seconds until the token expires.
     * @defaultValue If not specified, the token never expires.
     */
    expires?: number;
    /** List of stream names. */
    streams: SubscribeTokenStream[];
    /**
     * If specified only the domains in list will be allowed in requests to Director API with token.
     * Wildcard subdomains are also allowed, e.g.: "*.demo.com".
     * When unspecified (empty list) there are no domain restrictions.
     */
    allowedOrigins?: string[];
    /**
     * May specify multiple IPv4 addresses or CIDR notated network blocks.
     * If specified, the token will only be usable from those IP addresses.
     */
    allowedIpAddresses?: string[];
    /**
     * If specified will bind the token to the first X IP addresses used with token in requests to Director API, thus restricting the token to those IP addresses without being known beforehand.
     * Mutually exclusive with {@link allowedIpAddresses} option.
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
     * Tracking Information for the Stream Syndication capability.
     * @link https://docs.dolby.io/streaming-apis/docs/syndication.
     */
    tracking?: {
        /** Tracking identifier for Stream Syndication. */
        trackingId?: string;
    };
}
