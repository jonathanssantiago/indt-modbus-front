'use client';

import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import CurrentReadings from '../components/CurrentReadings';
import Dashboard from '../components/Dashboard';
import Notification from '../components/Notification';
import { useConnectionStatus } from '../hooks/useWebSocket';

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
        pt: 2,
      }}
    >
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
            ? 'Conectado ao dispositivo'
            : 'Conexão perdida com o dispositivo'
        }
        severity={isConnected ? 'success' : 'error'}
        open={notificationOpen}
        onClose={handleCloseNotification}
      />
    </Box>
  );
}
