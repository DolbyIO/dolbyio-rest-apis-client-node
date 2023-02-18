import { VideoCodec } from './videoCodec';
import { RTCPMode } from './rtcpMode';
import Participant from './participant';

export type Region = 'au' | 'ca' | 'eu' | 'in' | 'us';

export interface CreateConferenceOptions {
    /** The conference owner's external ID. */
    ownerExternalId: string;
    /** The conference alias, provided by the customer as a way to identify one or more conferences. */
    alias?: string;
    /** The PIN code of the conference. This applies to conferences using PSTN (telephony network). */
    pinCode?: string;
    /** Indicates if Dolby Voice is enabled for the conference. The `true` value creates the conference with Dolby Voice enabled. */
    dolbyVoice?: boolean;
    /** Indicates if live recording is enabled for the conference. When set to `true`, the recorded file is available at the end of the call and can be downloaded immediately. */
    liveRecording?: boolean;
    /** Specifies the bitrate adaptation mode for the video transmission. */
    rtcpMode?: RTCPMode;
    /** Specifies the time to live that enables customizing the waiting time (in seconds) and terminating empty conferences. */
    ttl?: number;
    /** Specifies the video codec (VP8 or H264) for the conference. */
    videoCodec?: VideoCodec;
    /** If `true`, the conference does not allow participants to enable video. */
    audioOnly?: boolean;
    /** List of participants. */
    participants?: Array<Participant>;
    /** If specified, the default RecordingConfiguration is overridden. Specifies the recording format. Valid values are 'mp3' and 'mp4'. */
    recordingFormats?: Array<string>;
    /**
     * Dolby.io region where you want the conference to be hosted. Can be one of:
     * - **au**: Australia
     * - **ca**: Canada
     * - **eu**: Europe
     * - **in**: India
     * - **us**: United States
     */
    region?: Region;
}

export interface UserTokens {
    [externalId: string]: string;
}

export interface Conference {
    /** The ID of the created conference. */
    conferenceId: string;
    /** The alias of the created conference. */
    conferenceAlias: string;
    /** The PIN code of the created conference. */
    conferencePincode: string;
    /** The `true` property indicates that the conference uses a conference access token and enhanced conference access control is enabled. */
    isProtected: boolean;
    /** The conference access token of the conference owner. */
    ownerToken: string;
    /** The conference access token of the conference participants. */
    usersTokens: UserTokens;
}
