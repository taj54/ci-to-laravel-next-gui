'use client';

import React from 'react';
import UploadStep from '@/components/UploadStep';
import MigrationForm from '@/components/MigrationForm';
import MigrationResult from '@/components/MigrationResult';
import DetectedVersionBanner from '@/components/DetectedVersionBanner';
import ErrorAlert from '@/components/ErrorAlert';
import { useMigration } from '@/hooks/useMigration';

export default function HomePage() {
  const {
    step,
    selectedFile,
    setSelectedFile,
    loading,
    errorMessage,
    ciVersion,
    projectName,
    setProjectName,
    laravelVersion,
    setLaravelVersion,
    installSail,
    setInstallSail,
    status: migrationStatus,
    report: migrationReport,
    handleUploadAndDetect,
    startMigrationHandler,
    resetToStep1,
  } = useMigration();

  
  return (
    <main className="max-w-3xl mx-auto p-4">
      {errorMessage && <ErrorAlert message={errorMessage} />}

      {step === 1 && (
        <UploadStep
          selectedFile={selectedFile}
          loading={loading}
          onFileChange={setSelectedFile}
          onUploadAndDetect={handleUploadAndDetect}
        />
      )}

      {step === 2 && (
        <>
          <DetectedVersionBanner ciVersion={ciVersion} onChangeFile={resetToStep1} />
          <MigrationForm
            loading={loading}
            projectName={projectName}
            laravelVersion={laravelVersion}
            installSail={installSail}
            setProjectName={setProjectName}
            setLaravelVersion={setLaravelVersion}
            setInstallSail={setInstallSail}
            onSubmit={startMigrationHandler}
          />
          {migrationStatus && migrationReport && (
            <MigrationResult status={migrationStatus} report={migrationReport} />
          )}
        </>
      )}
    </main>
  );
}

