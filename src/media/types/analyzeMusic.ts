import { JobResult } from './jobResults';

/** Result of an Analyze Music job. */
export interface AnalyzeMusicJobResult {
    media_info: {
        container: {
            kind: string;
            duration: number;
            bitrate: number;
            size: number;
        };
        audio: {
            codec: string;
            bit_depth: number;
            channels: number;
            sample_rate: number;
            duration: number;
            bitrate: number;
        };
        video: {
            codec: string;
            frame_rate: number;
            height: number;
            width: number;
            duration: number;
            bitrate: number;
        };
    };
    processed_region: {
        start: number;
        end: number;
        audio: {
            music: {
                percentage: number;
                num_sections: number;
                sections: {
                    loudness: number;
                    bpm: number;
                    key: object[];
                    genre: object[];
                    era: object[];
                    instrument: object[];
                }[];
            };
        };
    };
}

export interface AnalyzeMusicJob extends JobResult<AnalyzeMusicJobResult> {}
