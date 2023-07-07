import { PagedOptions, AllElementsOptions, PagedResponse } from './core';

interface GetRecordingsOptionsBase extends PagedOptions {
    /** The region code in which the mix recording took place. */
    region?: string;
    /** The type of recording, where `mix` indicates a mixed recording. */
    type?: string;
    /**
     * The optional array of RFC6838 compliant media type, either `audio/mpeg` or `video/mp4`,
     * to specify whether you want to retrieve video or audio recording.
     */
    mediaType?: string;
}

export interface GetRecordingsOptions extends PagedOptions, GetRecordingsOptionsBase {}

export interface GetAllRecordingsOptions extends AllElementsOptions, GetRecordingsOptionsBase {}

interface GetConferenceRecordingsOptionsBase extends PagedOptions {
    /** The conference identifier. */
    confId: string;
}

export interface GetConferenceRecordingsOptions extends PagedOptions, GetConferenceRecordingsOptionsBase {}

export interface GetAllConferenceRecordingsOptions extends AllElementsOptions, GetConferenceRecordingsOptionsBase {}

export interface MixRecording {
    /**
     * The optional identifier provided by you when you started mixed recording with video.
     * This ID helps to identify which layout and configuration was used to generate the mixed recording.
     */
    mixId: string;
    /** The layout URL for generating the mixed video recording. */
    layoutUrl: string;
    /** The mixed video recording frame height. */
    height: number;
    /** The mixed video recording frame width. */
    width: number;
}

export interface Conference {
    /** The conference identifier. */
    confId: string;
    /** The conference alias, provided by the customer. */
    confAlias: string;
}

export interface Recording {
    /** The conference information. */
    conference?: Conference;
    /** The region code in which the recording took place. */
    region: string;
    /**
     * The pre-signed URL for retrieving the recording.
     * The URL expires in 10 minutes; after this time you need to use Monitor API to download the recording.
     */
    url: string;
    /** The timestamp when the recording file download URL was created. */
    createdAt: number;
    /** The type of recording, where `mix` indicates a mixed recording */
    recordingType: string;
    /** The duration of the recording, in milliseconds. */
    duration: number;
    /** The name of the recording file. */
    filename: string;
    /** The size, in bytes, of the recording file. */
    size: number;
    /** The start time of the recording, in epoch milliseconds. */
    startTime: number;
    /** The RFC6838 compliant media type, either `audio/mpeg` or `video/mp4`. */
    mediaType: string;
    mix: MixRecording;
}

export interface GetRecordingsResponse extends PagedResponse {
    /** List of recordings. */
    recordings: Recording[];
}

export interface GetConferenceRecordingsResponse extends PagedResponse {
    /** The conference information. */
    conference: Conference;
    /**
     * A boolean that indicates whether the conference is live,
     * which gives you information whether more recordings could be expected for the conference.
     */
    liveConference: boolean;
    /** List of recordings. */
    recordings: Recording[];
}
