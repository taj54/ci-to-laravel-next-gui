'use client';
import {
  Paper, Typography, Box, Divider, List, ListItem, ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TerminalIcon from '@mui/icons-material/Terminal';
import React from 'react';

type Log = { level: string; message: string };
type Props = {
  status: 'success' | 'failed';
  report: {
    detection?: { version: string };
    setup?: { success: boolean };
    conversion?: { success: boolean; error?: string };
    logs?: Log[];
  };
};

export default function MigrationResult({ status, report }: Props) {
  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Migration Result</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {status === 'success' ? <CheckCircleIcon sx={{ color: 'green' }} /> : <CancelIcon sx={{ color: 'red' }} />}
        <Typography variant="h6">{status === 'success' ? 'Migration Successful!' : 'Migration Failed!'}</Typography>
      </Box>

      {report.conversion?.error && (
        <Box sx={{ mt: 2, color: 'red' }}>
          <Typography variant="subtitle2">Conversion Error:</Typography>
          <Typography>{report.conversion.error}</Typography>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1">Summary:</Typography>
      <List dense>
        <ListItem><ListItemText primary={`CI Version Detected: ${report.detection?.version}`} /></ListItem>
        <ListItem><ListItemText primary={`Laravel Setup: ${report.setup?.success ? 'Success' : 'Failed'}`} /></ListItem>
        <ListItem><ListItemText primary={`Code Conversion: ${report.conversion?.success ? 'Success' : 'Failed'}`} /></ListItem>
      </List>

      <Typography variant="subtitle1" sx={{ mt: 3 }}><TerminalIcon /> Logs:</Typography>
      <Box sx={{
        bgcolor: '#111', color: '#eee', p: 2, fontFamily: 'monospace',
        fontSize: '0.85rem', maxHeight: 200, overflowY: 'auto'
      }}>
        {report.logs?.map((log, idx) => (
          <Typography key={idx} sx={{ color: log.level === 'error' ? 'red' : 'inherit' }}>
            [{log.level.toUpperCase()}] {log.message}
          </Typography>
        )) || 'No logs'}
      </Box>
    </Paper>
  );
}
