import { VideoCodec } from './videoCodec';
import { RTCPMode } from './rtcpMode';
import Participant from './participant';

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
    /** Specifies video codecs (VP8 or H264) for a specific conference. */
    videoCodec?: VideoCodec;
    /** List of participants. */
    participants?: Array<Participant>;
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
