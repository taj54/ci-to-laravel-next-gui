'use client';
import { Box, Button, Paper, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from 'react';

type Props = {
  ciVersion: string;
  onChangeFile: () => void;
};

export default function DetectedVersionBanner({ ciVersion, onChangeFile }: Props) {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <InfoOutlinedIcon color="info" />
          <Typography>
            Detected CodeIgniter Version: <strong>{ciVersion.toUpperCase()}</strong>
          </Typography>
        </Box>
        <Button variant="outlined" onClick={onChangeFile}>
          Change File
        </Button>
      </Box>
    </Paper>
  );
}

