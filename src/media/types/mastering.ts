import { JobResult } from './jobResults';

export interface MasteringPreviewJobResult {
    /** Level of the media prior to mastering. Measured in loudness units relative to full scale (LUFS). */
    initial_level: string;
}

export interface MasteringPreviewJob extends JobResult<MasteringPreviewJobResult> {}

export interface MasteringJobResult extends MasteringPreviewJobResult {
    /** Level of the media after mastering. Measured in loudness units relative to full scale (LUFS). */
    final_level: string;
}

export interface MasteringJob extends JobResult<MasteringJobResult> {}
