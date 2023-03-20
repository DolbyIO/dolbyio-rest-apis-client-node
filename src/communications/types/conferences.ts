import { PagedOptions, AllElementsOptions, PagedResponse } from './core';

interface ListConferencesOptionsBase {
    /**
     * Search conferences using Alias. Use regular expression to search for conferences with similar aliases. For example:
     * * Use `foobar` to get all conferences with alias `foobar`.
     * * Use `.*foobar` to get all conferences with alias ending with `foobar.`
     * * Use `foobar.*` to get all conferences with alias starting with `foobar`.
     * * Use `.*foobar.*` to get all conferences with alias containing `foobar`.
     * * Use `.*2021.*|.*2022.*` to get all conferences with alias containing either 2021 or 2022
     */
    alias?: string;
    /** Search for ongoing references (`true`) or all conferences (`false`). */
    active?: boolean;
    /** The external ID of the participant who created the conference. */
    exid?: string;
    /** For live conferences, the number of `user`, `listener`, and `pstn` participants. */
    livestats?: boolean;
}

export interface ListConferencesOptions extends PagedOptions, ListConferencesOptionsBase {}

export interface ListAllConferencesOptions extends AllElementsOptions, ListConferencesOptionsBase {}

export interface ParticipantMetadata {
    /** */
    externalName: string;
    /** */
    externalId: string;
    /** */
    externalPhotoUrl: string;
    /** */
    ipAddress: string;
}

export interface ConferenceOwner {
    /** */
    userId: string;
    /** */
    metadata: ParticipantMetadata;
}

export interface MaxParticipants {
    USER: number;
    LISTENER: number;
    MIXER: number;
    PSTN: number;
}

export interface Statistics {
    /** */
    maxParticipants: MaxParticipants;
    /** */
    network: object;
}

export interface StreamingAPIUsage {
    /** */
    bytesIn?: number;
    /** */
    bytesOut?: number;
    /** */
    publishDurationSec?: number;
    /** */
    publishes?: number;
    /** */
    viewDurationSec?: number;
    /** */
    views?: number;
}

export interface Conference {
    /** The identifier of the conference. */
    confId: string;
    /** The conference alias, provided by the customer as a way to identify one or more conferences. */
    alias: string;
    /** The two-letter code identifying the region where the conference is hosted. */
    region: string;
    /** Indicates if Dolby Voice is enabled for the conference. The `true` value indicates that the conference has been made with Dolby Voice enabled. */
    dolbyVoice: boolean;
    /** */
    start: number;
    /** */
    live: boolean;
    /** */
    end: number;
    /** */
    duration: number;
    /** */
    type: string;
    /** */
    presenceDuration: number;
    /** */
    recordingDuration: number;
    /** */
    mixerLiveRecording: number;
    /** */
    mixerHlsStreaming: number;
    /** */
    mixerRtmpStreaming: number;
    /** */
    nbUsers: number;
    /** */
    nbListeners: number;
    /** */
    nbPstn: number;
    /** The participant who created the conference. */
    owner: ConferenceOwner;
    /** The conference statistics of a terminated conference. The statistics include the maximum number of participants present during a conference and the maximum number of the transmitted and received packets, bytes, and streams. */
    statistics: Statistics;
    /** The Real-time streaming usage in the conference. */
    streamingAPIUsage: StreamingAPIUsage;
}

export interface ListConferencesResponse extends PagedResponse {
    /** List of conferences. */
    conferences: Conference[];
}

interface ListParticipantsOptionsBase {
    /** The identifier of the conference. */
    confId: string;
    /** The external ID of the participant. */
    userId?: string;
    /**
     * The conference participant type:
     * * `user` - a participant who can send and receive video/audio stream to/from the conference.
     * * `listener` - a participant who can only receive video/audio stream from the conference.
     * * `pstn` - a participant who connected to the conference using PSTN (telephony network).
     * * `mixer` - an internal type indicating a mixer connection to the conference.
     */
    type?: string;
}

export interface ListParticipantsOptions extends PagedOptions, ListParticipantsOptionsBase {}

export interface ListAllParticipantsOptions extends AllElementsOptions, ListParticipantsOptionsBase {}

export interface Participant {
    connections: object[];
    stats: object;
}

export interface Participants {
    [userId: string]: Participant;
}

export interface ParticipantsResponse extends PagedResponse {
    /** List of participants. */
    participants: Participants;
}
