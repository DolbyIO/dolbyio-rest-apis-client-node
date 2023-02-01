export interface PublishTokenStream {
    streamName: string;
    isRegex: boolean;
}

export interface PublishToken {
    id: string;
    label: string;
    token: string;
    addedOn: Date;
    expiresOn: Date;
    isActive: boolean;
    streams: PublishTokenStream[];
    allowedOrigins: string[];
    allowedIpAddresses: string[];
    bindIpsOnUsage: number;
    allowedCountries: string[];
    deniedCountries: string[];
    originCluster: string;
    subscribeRequiresAuth: boolean;
    record: boolean;
    multisource: boolean;
}

export interface UpdatePublishToken {
    label?: string;
    refreshToken?: string;
    isActive?: boolean;
    addTokenStreams?: PublishTokenStream[];
    removeTokenStreams?: PublishTokenStream[];
    updateAllowedOrigins?: string[];
    updateAllowedIpAddresses?: string[];
    updateBindIpsOnUsage?: number;
    updateAllowedCountries?: string[];
    updateDeniedCountries?: string[];
    updateOriginCluster?: string;
    subscribeRequiresAuth?: boolean;
    record?: boolean;
    multisource?: boolean;
}

export interface CreatePublishToken {
    label: string;
    expiresOn?: Date;
    streams: PublishTokenStream[];
    allowedOrigins?: string[];
    allowedIpAddresses?: string[];
    bindIpsOnUsage?: number;
    allowedCountries?: string[];
    deniedCountries?: string[];
    originCluster?: string;
    subscribeRequiresAuth?: boolean;
    record?: boolean;
    multisource?: boolean;
}

export interface ActivePublishToken {
    tokenIds: number[];
}

export interface FailedToken {
    tokenId: number;
    errorMessage: string;
}

export interface DisablePublishTokenResponse {
    successfulTokens: number[];
    failedTokens: FailedToken[];
}
