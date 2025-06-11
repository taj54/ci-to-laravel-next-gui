
import type { MigrationReport } from '@/types';
import { fetchWithTimeout } from '@/utils/fetchWithTimeout';

// Custom error class for detailed error info
export class MigrationError extends Error {
  report?: MigrationReport;
  validationErrors?: string;

  constructor(message: string, report?: MigrationReport, validationErrors?: string) {
    super(message);
    this.name = 'MigrationError';
    this.report = report;
    this.validationErrors = validationErrors;
  }
}


const API_BASE_URL = 'http://127.0.0.1:8000/api/migration';

interface UploadDetectResponse {
  success: boolean;
  uniqueId: string;
  label: string;
  message?: string;
}

interface MigrationStartResponse {
  report: MigrationReport;
  errors?: Record<string, string[]>;
  message?: string;
  error?: string;
}

// Upload file and detect CodeIgniter version
export async function uploadAndDetectVersion(
  file: File,
  timeout = 15000
): Promise<{ uniqueId: string; ciVersion: string }> {
  if (!file) throw new Error('No file provided.');

  const formData = new FormData();
  formData.append('ciProjectZip', file);

  const res = await fetchWithTimeout(`${API_BASE_URL}/upload-and-detect`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  }, timeout);

  let data: UploadDetectResponse;

  try {
    data = await res.json();
  } catch {
    throw new Error('Invalid JSON response from server.');
  }

  if (!res.ok || !data.success) {
    throw new MigrationError(data.message || 'Failed to detect CodeIgniter version.');
  }

  return {
    uniqueId: data.uniqueId,
    ciVersion: data.label,
  };
}

interface StartMigrationParams {
  uniqueId: string;
  projectName: string;
  laravelVersion: string;
  installSail: boolean;
  ciProjectZip?: File | null;
}

// Start migration process
export async function startMigration(params: StartMigrationParams, timeout = 30000): Promise<MigrationReport> {
  const { uniqueId, projectName, laravelVersion, installSail, ciProjectZip } = params;

  const formData = new FormData();
  formData.append('uniqueId', uniqueId);
  formData.append('projectName', projectName);
  formData.append('laravelVersion', laravelVersion);
  formData.append('installSail', installSail ? '1' : '0');
  if (ciProjectZip) {
    formData.append('ciProjectZip', ciProjectZip);
  }

  const res = await fetchWithTimeout(`${API_BASE_URL}/start`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  }, timeout);

  let data: MigrationStartResponse;

  try {
    data = await res.json();
  } catch {
    throw new Error('Invalid JSON response from server.');
  }

  if (res.ok) {
    return data.report;
  } else {
    const validationErrors =
      res.status === 422 && data.errors
        ? Object.values(data.errors).flat().join(' ')
        : data.message || data.error || 'Migration failed.';
    throw new MigrationError(`Validation failed: ${validationErrors}`, data.report, validationErrors);
  }
}
