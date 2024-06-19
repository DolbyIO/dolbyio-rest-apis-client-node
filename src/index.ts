/**
 * Media APIs.
 * @link https://docs.dolby.io/media-apis/reference
 */
export * as media from './media';

/**
 * Dolby Millicast APIs.
 * @link https://docs.dolby.io/streaming-apis/reference
 */
export * as streaming from './streaming';

/** @ignore */
export * as urls from './urls';

// Expose the logger to control when/where to log
export { default as Logger } from 'js-logger';

declare const __VERSION__: string;

/** Gets the version of this library. */
const version: string = __VERSION__;

export { version };
