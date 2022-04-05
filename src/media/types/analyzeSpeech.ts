import { JobResult } from './jobResults';

export interface AnalyzeSpeechJobResult {
    version: string;
}

export interface AnalyzeSpeechJob extends JobResult<AnalyzeSpeechJobResult> {}
