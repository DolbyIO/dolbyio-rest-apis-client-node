import { PagedOptions, AllElementsOptions, PagedResponse } from './core';

interface GetRecordingsOptionsBase extends PagedOptions {}

export interface GetRecordingsOptions extends PagedOptions, GetRecordingsOptionsBase {}

export interface GetAllRecordingsOptions extends AllElementsOptions, GetRecordingsOptionsBase {}

export interface GetRecordingOptions extends PagedOptions, GetRecordingsOptionsBase {
    /** The conference identifier. */
    confId: string;
}

export interface MixRecording {
    /** The size of the MP4 recording (in bytes). The MP4 recording is available only if you have requested the MP4 format in the recording settings. For more information, see the [Recording](https://docs.dolby.io/communications-apis/docs/guides-recording-mechanisms) document. */
    mp4: number;
    /** The size of the MP3 recording (in bytes). The MP3 recording is available only if you have requested the MP3 format in the recording settings. For more information, see the [Recording](https://docs.dolby.io/communications-apis/docs/guides-recording-mechanisms) document. */
    mp3: number;
    /** The region code in which the mix recording took place. */
    region: string;
}

export interface RecordingFile {
    /** The time when the conference started, in milliseconds since epoch. */
    startTime: number;
    /** The estimated duration of the recording. */
    duration: number;
    /** The size of the recording (in bytes). */
    size: number;
    /** The unique name of the recording file. */
    fileName: string;
    /** The presigned URL, with limited validity, where you can download the recording file with a GET. The URL only applies when accessing specific audio recording data. */
    url: string;
    /** The list of split audio recordings. */
    splits: Array<any>;
}

export interface AudioRecording {
    /** The region code in which the mix recording took place. */
    region: string;
    /** The list of audio recordings. */
    records: Array<RecordingFile>;
}

export interface Recording {
    /** The conference identifier. */
    confId: string;
    /** The conference alias, provided by the customer. */
    alias: string;
    /** The estimated duration of the recording. */
    duration: number;
    /** The epoch time of the end of the recording. */
    ts: number;
    /** The region code in which the recording took place. */
    region: string;
    /** List of video or non-Dolby Voice audio mix recordings. */
    mix: MixRecording;
    /** List of Dolby Voice-based audio recordings. */
    audio: AudioRecording;
}

export interface GetRecordingsResponse extends PagedResponse {
    /** List of recordings. */
    recordings: Recording[];
}

export interface Conference {
    /** The conference identifier. */
    confId: string;
    /** The conference alias, provided by the customer. */
    confAlias: string;
}

export interface DolbyVoiceRecording {
    /** The region code in which the mix recording took place. */
    region: string;
    /** The conference details. */
    conference: Conference;
    /** The list of audio recordings. */
    records: Array<RecordingFile>;
}
