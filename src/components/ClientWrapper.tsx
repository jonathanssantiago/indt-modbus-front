'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../config/theme';
import Navigation from './Navigation';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main className="min-h-screen bg-gray-50 pt-4 p-5">{children}</main>
    </ThemeProvider>
  );
}
