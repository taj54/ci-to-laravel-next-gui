import { useState } from 'react';
import { startMigration, MigrationError } from '@/utils/migrationApi';
import type { MigrationReport, MigrationStatus } from '@/types';

interface StartParams {
    uniqueId: string;
    projectName: string;
    laravelVersion: string;
    installSail: boolean;
    ciProjectZip?: File | null;
}

export function useStartMigration() {
    const [status, setStatus] = useState<MigrationStatus>(null);
    const [report, setReport] = useState<MigrationReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const start = async (params: StartParams) => {
        setLoading(true);
        setError('');
        setStatus(null);
        setReport(null);

        try {
            const result = await startMigration(params);
            setStatus('success');
            setReport(result);
            return { success: true };
        } catch (err: any) {
            setStatus('failed');

            if (err instanceof MigrationError) {
                setError(err.message);
                setReport(err.report || null);
            } else {
                setError('Unexpected migration error.');
            }

            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return {
        start,
        status,
        report,
        loading,
        error,
    };
}
