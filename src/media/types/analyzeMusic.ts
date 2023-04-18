import { JobResult } from './jobResults';

export interface AnalyzeMusicJobResultMediaInfoContainer {
    kind: string;
    duration: number;
    bitrate: number;
    size: number;
}

export interface AnalyzeMusicJobResultMediaInfoAudio {
    codec: string;
    bit_depth: number;
    channels: number;
    sample_rate: number;
    duration: number;
    bitrate: number;
}

export interface AnalyzeMusicJobResultMediaInfoVideo {
    codec: string;
    frame_rate: number;
    height: number;
    width: number;
    duration: number;
    bitrate: number;
}

export interface AnalyzeMusicJobResultMediaInfo {
    container: AnalyzeMusicJobResultMediaInfoContainer;
    audio: AnalyzeMusicJobResultMediaInfoAudio;
    video: AnalyzeMusicJobResultMediaInfoVideo;
}

export interface AnalyzeMusicJobResultProcessedRegionAudioMusicSection {
    loudness: number;
    bpm: number;
    key: object[];
    genre: object[];
    era: object[];
    instrument: object[];
}

export interface AnalyzeMusicJobResultProcessedRegionAudioMusic {
    percentage: number;
    num_sections: number;
    sections: AnalyzeMusicJobResultProcessedRegionAudioMusicSection[];
}

export interface AnalyzeMusicJobResultProcessedRegionAudio {
    music: AnalyzeMusicJobResultProcessedRegionAudioMusic;
}

export interface AnalyzeMusicJobResultProcessedRegion {
    start: number;
    end: number;
    audio: AnalyzeMusicJobResultProcessedRegionAudio;
}

export interface AnalyzeMusicJobResult {
    media_info: AnalyzeMusicJobResultMediaInfo;
    processed_region: AnalyzeMusicJobResultProcessedRegion;
}

export interface AnalyzeMusicJob extends JobResult<AnalyzeMusicJobResult> {}
