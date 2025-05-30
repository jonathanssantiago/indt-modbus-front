import { useEffect, useState, useCallback } from 'react';
import WebSocketService from '../services/websocket';
import { ModbusData } from '../types';
import { config } from '../config';

export const useModbusData = () => {
  const [data, setData] = useState<ModbusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = WebSocketService.getInstance();

    const handleModbusData = (newData: ModbusData) => {
      setData(newData);
      setIsLoading(false);
      setError(null);
    };

    const handleConnectionStatus = (isConnected: boolean) => {
      if (!isConnected) {
        setError('Conexão perdida com o dispositivo');
      } else {
        setError(null);
      }
    };

    const handleError = (errorMessage: string) => {
      setError(errorMessage);
      setIsLoading(false);
    };

    ws.subscribe('modbusData', handleModbusData);
    ws.subscribe('connectionStatus', handleConnectionStatus);
    ws.subscribe('error', handleError);

    // Verificar conexão inicial
    if (!ws.isConnected()) {
      setError('Não conectado ao servidor');
    }

    return () => {
      ws.unsubscribe('modbusData', handleModbusData);
      ws.unsubscribe('connectionStatus', handleConnectionStatus);
      ws.unsubscribe('error', handleError);
    };
  }, []);

  return { data, isLoading, error };
};

export const useConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reconnect = useCallback(() => {
    const ws = WebSocketService.getInstance();
    ws.forceReconnect();
  }, []);

  useEffect(() => {
    const ws = WebSocketService.getInstance();

    const handleConnectionStatus = (status: boolean) => {
      setIsConnected(status);
      if (!status) {
        setError('Conexão perdida');
      } else {
        setError(null);
      }
    };

    const handleError = (errorMessage: string) => {
      setError(errorMessage);
    };

    ws.subscribe('connectionStatus', handleConnectionStatus);
    ws.subscribe('error', handleError);

    // Verificar status inicial
    setIsConnected(ws.isConnected());

    return () => {
      ws.unsubscribe('connectionStatus', handleConnectionStatus);
      ws.unsubscribe('error', handleError);
    };
  }, []);

  return { isConnected, error, reconnect };
};

export const useHistoricalData = (
  maxDataPoints: number = config.app.maxDataPoints
) => {
  const [historicalData, setHistoricalData] = useState<ModbusData[]>([]);
  const { data } = useModbusData();

  useEffect(() => {
    if (data) {
      setHistoricalData((prev) => {
        const newData = [...prev, data];
        if (newData.length > maxDataPoints) {
          return newData.slice(-maxDataPoints);
        }
        return newData;
      });
    }
  }, [data, maxDataPoints]);

  const clearHistory = useCallback(() => {
    setHistoricalData([]);
  }, []);

  return { historicalData, clearHistory };
};
