import { useState } from 'react';
import { uploadAndDetectVersion } from '@/utils/migrationApi';

export function useUploadAndDetect() {
  const [ciVersion, setCiVersion] = useState('unknown');
  const [uniqueId, setUniqueId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const detect = async (file: File) => {
    setLoading(true);
    setError('');
    try {
      const { uniqueId, ciVersion } = await uploadAndDetectVersion(file);
      setUniqueId(uniqueId);
      setCiVersion(ciVersion);
      return { success: true };
    } catch (err: unknown) {
      setCiVersion('unknown');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    detect,
    loading,
    error,
    ciVersion,
    uniqueId,
  };
}

