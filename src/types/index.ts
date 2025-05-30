export interface ModbusData {
  voltage: number;
  current: number;
  temperature: number;
  timestamp: string;
}

export interface ConnectionStatus {
  isConnected: boolean;
  lastConnected?: string;
  error?: string;
}

export interface ChartDataPoint extends ModbusData {
  time: string; // Formatado para exibição
}
