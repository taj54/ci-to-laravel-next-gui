// components/UploadStep.tsx
'use client';
import React from 'react';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
  selectedFile: File | null;
  loading: boolean;
  onFileChange: (file: File | null) => void;
  onUploadAndDetect: () => void;
}

const UploadStep: React.FC<Props> = ({ selectedFile, loading, onFileChange, onUploadAndDetect }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.zip')) {
      onFileChange(file);
    } else {
      onFileChange(null);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".zip"
      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        Select CI Project (.zip)
      </Button>

      <Typography variant="body1" sx={{ mt: 2 }}>
        {selectedFile ? `Selected: ${selectedFile.name}` : 'No file selected'}
      </Typography>

      <Button
        variant="contained"
        onClick={onUploadAndDetect}
        disabled={loading || !selectedFile}
        startIcon={loading ? <CircularProgress size={20} /> : undefined}
        sx={{ mt: 2 }}
      >
        {loading ? 'Detecting...' : 'Upload & Detect Version'}
      </Button>
    </Box>
  );
};

export default UploadStep;

