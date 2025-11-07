import { getToken } from '../publishToken';
import { stop, stopAll } from '../stream';

/** Represents the response to the {@link stop} and {@link stopAll} requests. */
export interface StreamStopResponse {
    stoppingLevel: 'Account' | 'Stream' | 'Feed' | 'None';
}

/** Represents the options to reprioritize a stream. */
export interface ReprioritizeOptions {
    /**
     * Specify the token associated with stream that requires an updated priority.
     * Please ensure that the token is assign a single streamId by calling {@link getToken | Read Token},
     * otherwise unexpected streams will be assigned the new priority on reconnection.
     */
    tokenId: number;

    /** New priority for the stream. */
    updatePriority: number;
}
