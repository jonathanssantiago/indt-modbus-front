export const config = {
  websocket: {
    url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3003',
    timeout: 5000,
    maxReconnectAttempts: 5,
    reconnectDelay: 1000,
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Monitor IoT',
    maxDataPoints: Number(process.env.NEXT_PUBLIC_MAX_DATA_POINTS) || 20,
  },
} as const;
