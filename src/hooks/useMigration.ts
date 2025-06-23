import { useState } from 'react';
import { useUploadAndDetect } from '@/hooks/useUploadAndDetect';
import { useStartMigration } from '@/hooks/useStartMigration';

export function useMigration() {
    const [step, setStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [projectName, setProjectName] = useState('');
    const [laravelVersion, setLaravelVersion] = useState('8.x');
    const [installSail, setInstallSail] = useState(false);

    const {
        detect,
        ciVersion,
        uniqueId,
        error: detectError,
        loading: detectLoading,
    } = useUploadAndDetect();

    const {
        start,
        report,
        status,
        error: startError,
        loading: startLoading,
    } = useStartMigration();

    const handleUploadAndDetect = async () => {
        if (!selectedFile) return;
        const result = await detect(selectedFile);
        if (result.success) setStep(2);
    };

    const startMigrationHandler = async () => {
        if (!projectName.trim()) return;

        const result = await start({
            uniqueId,
            projectName,
            laravelVersion,
            installSail,
        });
        if (result.success) setStep(1);


    };

    const resetToStep1 = () => {
        setStep(1);
        setSelectedFile(null);
        setProjectName('');
        setLaravelVersion('8.x');
        setInstallSail(false);
    };

    return {
        step,
        selectedFile,
        setSelectedFile,
        projectName,
        setProjectName,
        laravelVersion,
        setLaravelVersion,
        installSail,
        setInstallSail,
        ciVersion,
        uniqueId,
        report,
        status,
        errorMessage: detectError || startError,
        loading: detectLoading || startLoading,
        handleUploadAndDetect,
        startMigrationHandler,
        resetToStep1,
    };
}

