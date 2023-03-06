import { JobResult } from './jobResults';

export interface AnalyzeMusicJobResult {
    version: string;
}

export interface AnalyzeMusicJob extends JobResult<AnalyzeMusicJobResult> {}
