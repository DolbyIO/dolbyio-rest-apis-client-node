import { JobResult } from './jobResults';

export interface EnhanceJobResult {
    version: string;
}

export interface EnhanceJob extends JobResult<EnhanceJobResult> {}
