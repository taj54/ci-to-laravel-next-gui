'use client';
import {
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import React from 'react';

interface Props {
  loading: boolean;
  projectName: string;
  laravelVersion: string;
  installSail: boolean;
  setProjectName: (name: string) => void;
  setLaravelVersion: (version: string) => void;
  setInstallSail: (val: boolean) => void;
  onSubmit: (formData: {
    projectName: string;
    laravelVersion: string;
    installSail: boolean;
  }) => Promise<void>;
}

export default function MigrationForm({
  loading,
  projectName,
  laravelVersion,
  installSail,
  setProjectName,
  setLaravelVersion,
  setInstallSail,
  onSubmit,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await onSubmit({ projectName, laravelVersion, installSail });
      console.log('Migration result:', result);
      // Optional: show success feedback
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optional: show error feedback to user
    }
  };

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Step 2: Migration Settings
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="New Laravel Project Name"
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <TextField
          select
          label="Laravel Version"
          fullWidth
          value={laravelVersion}
          onChange={(e) => setLaravelVersion(e.target.value)}
        >
          <MenuItem value="10.x">Laravel 10.x</MenuItem>
          <MenuItem value="9.x">Laravel 9.x</MenuItem>
          <MenuItem value="8.x">Laravel 8.x</MenuItem>
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={installSail}
              onChange={(e) => setInstallSail(e.target.checked)}
            />
          }
          label="Install Laravel Sail"
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <BuildIcon />}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Start Migration'}
        </Button>
      </Box>
    </Paper>
  );
}
