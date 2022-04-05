import { JobResult } from './jobResults';

export interface DiagnoseJobResult {
    version: string;
}

export interface DiagnoseJob extends JobResult<DiagnoseJobResult> {}
