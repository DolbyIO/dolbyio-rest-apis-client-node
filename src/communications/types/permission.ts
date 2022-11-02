export enum Permission {
    /** Allows a participant to invite participants to a conference. */
    INVITE = 'INVITE',

    /** Allows a participant to join a conference. */
    JOIN = 'JOIN',

    /** Allows a participant to send an audio stream during a conference. */
    SEND_AUDIO = 'SEND_AUDIO',

    /** Allows a participant to send a video stream during a conference. */
    SEND_VIDEO = 'SEND_VIDEO',

    /** Allows a participant to share their screen during a conference. */
    SHARE_SCREEN = 'SHARE_SCREEN',

    /** Allows a participant to share a video during a conference. */
    SHARE_VIDEO = 'SHARE_VIDEO',

    /** Allows a participant to share a file during a conference. */
    SHARE_FILE = 'SHARE_FILE',

    /** Allows a participant to send a message to other participants during a conference. */
    SEND_MESSAGE = 'SEND_MESSAGE',

    /** Allows a participant to record a conference. */
    RECORD = 'RECORD',

    /** Allows a participant to stream a conference. */
    STREAM = 'STREAM',

    /** Allows a participant to kick other participants from a conference. */
    KICK = 'KICK',

    /** Allows a participant to update other participants' permissions. */
    UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS',
}
