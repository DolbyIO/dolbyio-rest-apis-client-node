import { JobResult } from './jobResults';

export interface AnalyzeJobResult {
    version: string;
}

export interface AnalyzeJob extends JobResult<AnalyzeJobResult> {}
