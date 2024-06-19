import { publish, subscribe } from '../director';

/** Represents the response to a {@link subscribe} request. */
export interface SubscribeResponse {
    /** List of URLs. */
    urls: string[];
    /** The JWT token used for authentication. */
    jwt: string;
    /** List of ICE servers. */
    iceServers: {
        /** List of URLs to access this ICE server. */
        urls: string[];
        /** Username to authenticate requests to the ICE server. */
        userName?: string;
        /** Credential to authenticate requests to the ICE server. */
        credential?: string;
    }[];
    /** Dolby Millicast account ID. */
    streamAccountId: string;
}

/** Represents the response to a {@link publish} request. */
export interface PublishResponse extends SubscribeResponse {
    /** `true` if subscribing to this stream requires a subscribe token. */
    subscribeRequiresAuth: boolean;
}
