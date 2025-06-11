import { useState } from 'react';
import { useUploadAndDetect } from '@/hooks/useUploadAndDetect';
import { useStartMigration } from '@/hooks/useStartMigration';

export function useMigration() {
    const [step, setStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [projectName, setProjectName] = useState('');
    const [laravelVersion, setLaravelVersion] = useState('10.x');
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
        console.log('start migration');
        
        // const result = await start({
        //     uniqueId,
        //     projectName,
        //     laravelVersion,
        //     installSail,
        // });
        // if (result.success) {
        //     // Success: optionally reset or advance step
        //     setStep(1);
        // } else {
        //     // Failure: stay on current step and optionally handle errors
        //     console.warn('Migration failed, staying on step 2');
        //     // Optionally show error message with toast, alert, etc.
        // }

    };

    const resetToStep1 = () => {
        setStep(1);
        setSelectedFile(null);
        setProjectName('');
        setLaravelVersion('10.x');
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
