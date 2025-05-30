'use client';

import { useState, useEffect } from 'react';
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import CurrentReadings from '../components/CurrentReadings';
import ConnectionStatus from '../components/ConnectionStatus';
import Dashboard from '../components/Dashboard';
import Notification from '../components/Notification';
import { useConnectionStatus } from '../hooks/useWebSocket';
import { config } from '../config';

export default function Home() {
  const { isConnected } = useConnectionStatus();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [lastConnectionState, setLastConnectionState] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    // Mostrar notificação quando o status de conexão mudar
    if (lastConnectionState !== null && lastConnectionState !== isConnected) {
      setNotificationOpen(true);
    }
    setLastConnectionState(isConnected);
  }, [isConnected, lastConnectionState]);

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      <AppBar
        position="static"
        elevation={1}
        sx={{
          mb: 4,
          backgroundColor: '#003274',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(0, 50, 116, 0.1)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: '#ffffff',
            }}
          >
            {config.app.name}
          </Typography>
          <ConnectionStatus />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <CurrentReadings />
        </Box>

        <Box>
          <Dashboard />
        </Box>
      </Container>

      <Notification
        message={
          isConnected
            ? 'Conectado ao servidor'
            : 'Conexão perdida com o servidor'
        }
        severity={isConnected ? 'success' : 'error'}
        open={notificationOpen}
        onClose={handleCloseNotification}
      />
    </Box>
  );
}
