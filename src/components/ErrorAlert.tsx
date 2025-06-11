'use client';
import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

type Props = { message: string };

export default function ErrorAlert({ message }: Props) {
  return (
    <Alert severity="error" sx={{ mb: 3 }}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
}
