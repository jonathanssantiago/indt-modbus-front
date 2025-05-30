import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Fade,
  Collapse,
} from '@mui/material';
import { Clear, DeviceHub } from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useHistoricalData, useModbusData } from '../hooks/useWebSocket';

const Dashboard = () => {
  const { historicalData, clearHistory } = useHistoricalData(20);
  const { error } = useModbusData();

  // Função para formatar timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Alerta quando há erro de conexão */}
        {error && (
          <Collapse in={!!error}>
            <Alert
              severity="warning"
              variant="outlined"
              icon={<DeviceHub />}
              sx={{
                mb: 2,
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
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#003274' }}>
            Histórico de Dados
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={clearHistory}
            size="small"
            sx={{
              borderColor: '#e2e8f0',
              color: '#718096',
              '&:hover': {
                borderColor: '#cbd5e0',
                backgroundColor: '#f8fafc',
              },
            }}
            disabled={historicalData.length === 0}
          >
            Limpar Histórico
          </Button>
        </Box>

        <Card
          sx={{
            opacity: error ? 0.7 : 1,
            transition: 'opacity 0.3s ease-in-out',
            filter: error ? 'grayscale(20%)' : 'none',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: error ? '#718096' : '#003274',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Tensão (V)
              {error && (
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: '#fff8e1',
                    color: '#d69e2e',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.7rem',
                  }}
                >
                  Dados Anteriores
                </Typography>
              )}
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatTimestamp}
                  tick={{ fill: '#718096', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => value.toFixed(1)}
                  tick={{ fill: '#718096', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  labelFormatter={formatTimestamp}
                  formatter={(value: number) => [
                    `${value.toFixed(1)} V`,
                    'Tensão',
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="voltage"
                  stroke={error ? '#a0aec0' : '#003274'}
                  dot={false}
                  isAnimationActive={false}
                  strokeWidth={error ? 1 : 2}
                  strokeDasharray={error ? '5,5' : '0'}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          sx={{
            opacity: error ? 0.7 : 1,
            transition: 'opacity 0.3s ease-in-out',
            filter: error ? 'grayscale(20%)' : 'none',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: error ? '#718096' : '#27f19c',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Corrente (A)
              {error && (
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: '#fff8e1',
                    color: '#d69e2e',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.7rem',
                  }}
                >
                  Dados Anteriores
                </Typography>
              )}
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatTimestamp}
                  tick={{ fill: '#718096', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => value.toFixed(2)}
                  tick={{ fill: '#718096', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  labelFormatter={formatTimestamp}
                  formatter={(value: number) => [
                    `${value.toFixed(2)} A`,
                    'Corrente',
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke={error ? '#a0aec0' : '#27f19c'}
                  dot={false}
                  isAnimationActive={false}
                  strokeWidth={error ? 1 : 2}
                  strokeDasharray={error ? '5,5' : '0'}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          sx={{
            opacity: error ? 0.7 : 1,
            transition: 'opacity 0.3s ease-in-out',
            filter: error ? 'grayscale(20%)' : 'none',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: error ? '#718096' : '#f6ad55',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Temperatura (°C)
              {error && (
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: '#fff8e1',
                    color: '#d69e2e',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.7rem',
                  }}
                >
                  Dados Anteriores
                </Typography>
              )}
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatTimestamp}
                  tick={{ fill: '#718096', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => value.toFixed(1)}
                  tick={{ fill: '#718096', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  labelFormatter={formatTimestamp}
                  formatter={(value: number) => [
                    `${value.toFixed(1)} °C`,
                    'Temperatura',
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke={error ? '#a0aec0' : '#f6ad55'}
                  dot={false}
                  isAnimationActive={false}
                  strokeWidth={error ? 1 : 2}
                  strokeDasharray={error ? '5,5' : '0'}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default Dashboard;
