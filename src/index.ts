export * as authentication from './authentication';
export * from './types/jwtToken';

/**
 * Communications APIs.
 * @link https://docs.dolby.io/communications-apis/reference
 */
export * as communications from './communications';

/**
 * Media APIs.
 * @link https://docs.dolby.io/media-apis/reference
 */
export * as media from './media';

/**
 * Real-time Streaming APIs.
 * @link https://docs.dolby.io/streaming-apis/reference
 */
export * as streaming from './streaming';

/** @ignore */
export * as urls from './urls';

declare const __VERSION__: string;

/** Gets the version of this library. */
const version: string = __VERSION__;

export { version };
