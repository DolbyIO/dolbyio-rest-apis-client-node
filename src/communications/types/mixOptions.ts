import JwtToken from '../../types/jwtToken';

export type Resolution = {
    /** The frame height can range between 390 and 1920 pixels and is set to 1080 by default. */
    height: number;
    /** The frame width can range between 520 and 1920 pixels and is set to 1920 by default. */
    width: number;
};

export type MixOptionsBase = {
    /** Access token to use for authentication. */
    accessToken: JwtToken;
    /** Identifier of the conference. */
    conferenceId: string;
};

export type MixOptionsComplex = {
    /**
     * Overwrites the layout URL configuration:
     * - `null`: uses the layout URL configured in the dashboard (if no URL is set in the dashboard, then uses the Dolby.io default);
     * - `default`: uses the Dolby.io default layout;
     * - URL string: uses this layout URL
     */
    layoutUrl?: string;
    resolution?: Resolution;
    /**
     * A unique identifier for you to identify individual mixes.
     * You may only start one streaming per mixId.
     * Not providing its value results in setting the `default` value.
     */
    mixId?: string;
} & MixOptionsBase;

export type MixOptions = MixOptionsBase | MixOptionsComplex;

export type RtmpMixOptionsBase = {
    /** The destination URI provided by the RTMP service. */
    uri: string;
} & MixOptionsBase;

export type RtmpMixOptionsComplex = {
    /** The destination URI provided by the RTMP service. */
    uri: string;
} & MixOptionsComplex;

export type RtmpMixOptions = RtmpMixOptionsBase | RtmpMixOptionsComplex;
