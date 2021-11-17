export enum RTCPMode {
    /** Adjusts the transmission bitrate to the receiver who has the worst network conditions. */
    Worst = 'worst',
    /** Averages the available bandwidth of all the receivers and adjusts the transmission bitrate to this value. */
    Average = 'average',
    /** Does not adjust the transmission bitrate to the receiver’s bandwidth. */
    Max = 'max',
}
