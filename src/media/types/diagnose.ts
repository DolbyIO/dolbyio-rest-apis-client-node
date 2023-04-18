import { JobResult } from './jobResults';

export interface DiagnoseJobResultMediaInfoContainer {
    kind: string;
    duration: number;
    bitrate: number;
    size: number;
}

export interface DiagnoseJobResultMediaInfoAudio {
    codec: string;
    bit_depth: number;
    channels: number;
    sample_rate: number;
    duration: number;
    bitrate: number;
}

export interface DiagnoseJobResultMediaInfoVideo {
    codec: string;
    frame_rate: number;
    height: number;
    width: number;
    duration: number;
    bitrate: number;
}

export interface DiagnoseJobResultMediaInfo {
    container: DiagnoseJobResultMediaInfoContainer;
    audio: DiagnoseJobResultMediaInfoAudio;
    video: DiagnoseJobResultMediaInfoVideo;
}

export interface DiagnoseJobResultScoreDistribution {
    lower_bound: number;
    upper_bound: number;
    duration: number;
    percentage: number;
}

export interface DiagnoseJobResultScoreWorstSegment {
    start: number;
    end: number;
    score: number;
}

export interface DiagnoseJobResultQualityScore {
    average: number;
    distribution: DiagnoseJobResultScoreDistribution[];
}

export interface DiagnoseJobResultScore extends DiagnoseJobResultQualityScore {
    worst_segment: DiagnoseJobResultScoreWorstSegment;
}

export interface DiagnoseJobResultClipping {
    events: number;
}

export interface DiagnoseJobResultLoudness {
    measured: number;
    range: number;
    sample_peak: number;
    true_peak: number;
    gating_mode: string;
}

export interface DiagnoseJobResultMusic {
    percentage: number;
}

export interface DiagnoseJobResultSilence {
    percentage: number;
    at_beginning: number;
    at_end: number;
    num_sections: number;
    silent_channels: string[];
}

export interface DiagnoseJobResultSpeechEvent {
    plosive: number;
    sibilance: number;
}

export interface DiagnoseJobResultSpeech {
    percentage: number;
    events: DiagnoseJobResultSpeechEvent;
}

export interface DiagnoseJobResultAudio {
    quality_score: DiagnoseJobResultQualityScore;
    noise_score: DiagnoseJobResultScore;
    clipping: DiagnoseJobResultClipping;
    loudness: DiagnoseJobResultLoudness;
    music: DiagnoseJobResultMusic;
    silence: DiagnoseJobResultSilence;
    speech: DiagnoseJobResultSpeech;
}

export interface DiagnoseJobResult {
    media_info: DiagnoseJobResultMediaInfo;
    audio: DiagnoseJobResultAudio;
}

export interface DiagnoseJob extends JobResult<DiagnoseJobResult> {}
