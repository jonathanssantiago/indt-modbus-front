import { Chip, IconButton, Tooltip } from '@mui/material';
import { CheckCircle, Error, Refresh } from '@mui/icons-material';
import { useConnectionStatus } from '../hooks/useWebSocket';

const ConnectionStatus = () => {
  const { isConnected, reconnect } = useConnectionStatus();

  const handleReconnect = () => {
    reconnect();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Chip
        icon={isConnected ? <CheckCircle /> : <Error />}
        label={isConnected ? 'Conectado' : 'Desconectado'}
        color={isConnected ? 'success' : 'error'}
        variant="outlined"
        sx={{
          backgroundColor: isConnected ? '#e8fdf5' : '#fed7d7',
          color: isConnected ? '#1ac77a' : '#e53e3e',
          border: isConnected ? '1px solid #27f19c' : '1px solid #fc8181',
          '& .MuiChip-icon': {
            color: isConnected ? '#1ac77a' : '#e53e3e',
          },
        }}
      />
      {!isConnected && (
        <Tooltip title="Tentar reconectar">
          <IconButton
            size="small"
            onClick={handleReconnect}
            sx={{
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default ConnectionStatus;
