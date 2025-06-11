// types/index.ts

export type MigrationStatus = 'success' | 'failed' | null;

export interface MigrationLog {
  level: 'info' | 'warning' | 'error' | string;
  message: string;
}

export interface MigrationReport {
  detection?: {
    version: string;
  };
  setup?: {
    success: boolean;
  };
  conversion?: {
    success: boolean;
    error?: string;
  };
  logs?: MigrationLog[];
}

export interface UploadResponse {
  success: boolean;
  uniqueId: string;
  label: string; // detected version
  message?: string;
}

export interface MigrationResponse {
  report: MigrationReport;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// class MigrationError extends Error {
//   report?: MigrationReport;
//   validationErrors?: string;

//   constructor(message: string, report?: MigrationReport, validationErrors?: string) {
//     super(message);
//     this.report = report;
//     this.validationErrors = validationErrors;
//   }
// }