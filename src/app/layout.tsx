'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../config/theme';
import { config } from '../config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>{config.app.name}</title>
        <meta name="description" content="Monitor de Dispositivos IoT" />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
