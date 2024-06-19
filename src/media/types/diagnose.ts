import { JobResult } from './jobResults';

export interface DiagnoseJobResultQualityScore {
    average: number;
    distribution: {
        lower_bound: number;
        upper_bound: number;
        duration: number;
        percentage: number;
    }[];
}

export interface DiagnoseJobResultScore extends DiagnoseJobResultQualityScore {
    worst_segment: {
        start: number;
        end: number;
        score: number;
    };
}

export interface DiagnoseJobResult {
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
    audio: {
        quality_score: DiagnoseJobResultQualityScore;
        noise_score: DiagnoseJobResultScore;
        clipping: {
            events: number;
        };
        loudness: {
            measured: number;
            range: number;
            sample_peak: number;
            true_peak: number;
            gating_mode: string;
        };
        music: {
            percentage: number;
        };
        silence: {
            percentage: number;
            at_beginning: number;
            at_end: number;
            num_sections: number;
            silent_channels: string[];
        };
        speech: {
            percentage: number;
            events: {
                plosive: number;
                sibilance: number;
            };
        };
    };
}

export interface DiagnoseJob extends JobResult<DiagnoseJobResult> {}
