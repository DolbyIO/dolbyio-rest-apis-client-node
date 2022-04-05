import { JobResult } from './jobResults';

export interface TranscodeJobResult {
    version: string;
}

export interface TranscodeJob extends JobResult<TranscodeJobResult> {}
