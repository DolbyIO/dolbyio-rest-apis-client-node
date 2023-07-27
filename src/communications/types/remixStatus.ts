export default interface RemixStatus {
    /**
     * The status of the current remix job.
     * The possible values are:
     * - UNKNOWN
     * - AUDIO_REMIX_NOT_AVAILABLE
     * - ERROR
     * - IN_PROGRESS
     * - COMPLETED
     */
    status: string;
    /** The two-letter code identifying the region where the conference is hosted. */
    region: string;
    /** The conference alias, provided by the customer as a way to identify one or more conferences. */
    alias: string;
}
