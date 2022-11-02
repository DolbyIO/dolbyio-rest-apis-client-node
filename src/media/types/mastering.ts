import { JobResult } from './jobResults';

export interface MasteringPreviewJobResult {
    media_info: any;
    audio: any;
}

export interface MasteringPreviewJob extends JobResult<MasteringPreviewJobResult> {}

export interface MasteringJobResult {
    /** Level of the media prior to mastering. Measured in loudness units relative to full scale (LUFS). */
    initial_level: number;

    /** Level of the media after mastering. Measured in loudness units relative to full scale (LUFS). */
    final_level: number;
}

export interface MasteringJob extends JobResult<MasteringJobResult> {}
