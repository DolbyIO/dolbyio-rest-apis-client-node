export interface SubscribeTokenStream {
    streamName: string;
    isRegex: boolean;
}

export interface SubscribeToken {
    id: string;
    label: string;
    token: string;
    addedOn: Date;
    expiresOn: Date;
    isActive: boolean;
    streams: SubscribeTokenStream[];
    allowedOrigins: string[];
    allowedIpAddresses: string[];
    bindIpsOnUsage: number;
    allowedCountries: string[];
    deniedCountries: string[];
    originCluster: string;
}

export interface UpdateSubscribeToken {
    label?: string;
    refreshToken?: string;
    isActive?: boolean;
    addTokenStreams?: SubscribeTokenStream[];
    removeTokenStreams?: SubscribeTokenStream[];
    updateAllowedOrigins?: string[];
    updateAllowedIpAddresses?: string[];
    updateBindIpsOnUsage?: number;
    updateAllowedCountries?: string[];
    updateDeniedCountries?: string[];
    updateOriginCluster?: string;
}

export interface CreateSubscribeToken {
    label: string;
    expiresOn?: Date;
    streams: SubscribeTokenStream[];
    allowedOrigins?: string[];
    allowedIpAddresses?: string[];
    bindIpsOnUsage?: number;
    allowedCountries?: string[];
    deniedCountries?: string[];
    originCluster?: string;
}
