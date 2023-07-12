export default interface RtsStream {
    /** The Dolby.io Real-time Streaming stream name to which the conference is broadcasted. It is the same as `conference_id`. */
    streamName: string;
    /** The subscribe token, which allows to view the broadcasted conference. */
    subscribeToken: string;
    /** The Dolby.io Real-time Streaming account ID to which the conference is broadcasted. */
    streamAccountId: string;
    /** The Url of the player, which allows users to view the broadcasted conference. */
    viewerURL: string;
}
