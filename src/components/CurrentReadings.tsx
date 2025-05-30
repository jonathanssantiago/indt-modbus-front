import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Fade,
  Collapse,
} from '@mui/material';
import {
  BoltOutlined,
  DeviceThermostat,
  ElectricMeter,
  DeviceHub,
} from '@mui/icons-material';
import { useModbusData } from '../hooks/useWebSocket';
import SkeletonCard from './SkeletonCard';

const CurrentReadings = () => {
  const { data: readings, isLoading, error } = useModbusData();

  // Renderiza alert se há erro, mas mantém os dados visíveis
  const renderErrorAlert = () => {
    if (!error) return null;

    return (
      <Collapse in={!!error}>
        <Alert
          severity="warning"
          variant="outlined"
          icon={<DeviceHub />}
          sx={{
            mb: 3,
            backgroundColor: '#fff8e1',
            borderColor: '#f6ad55',
            color: '#d69e2e',
            animation: 'fadeIn 0.5s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Conexão com dispositivo IoT perdida. Exibindo últimos dados
          conhecidos...
        </Alert>
      </Collapse>
    );
  };

  // Se não há dados e está carregando, mostra skeletons
  if (!readings && isLoading) {
    return (
      <Box>
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            <SkeletonCard
              color="#003274"
              icon={<BoltOutlined sx={{ fontSize: 20 }} />}
            />
            <SkeletonCard
              color="#27f19c"
              icon={<ElectricMeter sx={{ fontSize: 20 }} />}
            />
            <SkeletonCard
              color="#f6ad55"
              icon={<DeviceThermostat sx={{ fontSize: 20 }} />}
            />
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box>
      {renderErrorAlert()}

      <Fade in={true} timeout={500}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <Card
            sx={{
              height: '100%',
              borderLeft: `3px solid ${error ? '#a0aec0' : '#003274'}`,
              backgroundColor: '#ffffff',
              opacity: error ? 0.7 : 1,
              filter: error ? 'grayscale(20%)' : 'none',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#f8fafc',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 500,
                  color: error ? '#a0aec0' : '#718096',
                }}
              >
                <BoltOutlined
                  sx={{ color: error ? '#a0aec0' : '#003274', fontSize: 20 }}
                />
                Tensão
                {error && (
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: '#fff8e1',
                      color: '#d69e2e',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.65rem',
                      ml: 'auto',
                    }}
                  >
                    Último
                  </Typography>
                )}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: error ? '#a0aec0' : '#003274',
                  fontWeight: 600,
                  fontSize: '2rem',
                }}
              >
                {isLoading && !readings ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: error ? '#a0aec0' : '#003274' }}
                  />
                ) : (
                  `${readings?.voltage.toFixed(2) || '--'} V`
                )}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              height: '100%',
              borderLeft: `3px solid ${error ? '#a0aec0' : '#27f19c'}`,
              backgroundColor: '#ffffff',
              opacity: error ? 0.7 : 1,
              filter: error ? 'grayscale(20%)' : 'none',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#f8fafc',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 500,
                  color: error ? '#a0aec0' : '#718096',
                }}
              >
                <ElectricMeter
                  sx={{ color: error ? '#a0aec0' : '#27f19c', fontSize: 20 }}
                />
                Corrente
                {error && (
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: '#fff8e1',
                      color: '#d69e2e',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.65rem',
                      ml: 'auto',
                    }}
                  >
                    Último
                  </Typography>
                )}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: error ? '#a0aec0' : '#27f19c',
                  fontWeight: 600,
                  fontSize: '2rem',
                }}
              >
                {isLoading && !readings ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: error ? '#a0aec0' : '#27f19c' }}
                  />
                ) : (
                  `${readings?.current.toFixed(2) || '--'} A`
                )}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              height: '100%',
              borderLeft: `3px solid ${error ? '#a0aec0' : '#f6ad55'}`,
              backgroundColor: '#ffffff',
              opacity: error ? 0.7 : 1,
              filter: error ? 'grayscale(20%)' : 'none',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#f8fafc',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 500,
                  color: error ? '#a0aec0' : '#718096',
                }}
              >
                <DeviceThermostat
                  sx={{ color: error ? '#a0aec0' : '#f6ad55', fontSize: 20 }}
                />
                Temperatura
                {error && (
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: '#fff8e1',
                      color: '#d69e2e',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.65rem',
                      ml: 'auto',
                    }}
                  >
                    Último
                  </Typography>
                )}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: error ? '#a0aec0' : '#f6ad55',
                  fontWeight: 600,
                  fontSize: '2rem',
                }}
              >
                {isLoading && !readings ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: error ? '#a0aec0' : '#f6ad55' }}
                  />
                ) : (
                  `${readings?.temperature.toFixed(2) || '--'} °C`
                )}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Box>
  );
};

export default CurrentReadings;
