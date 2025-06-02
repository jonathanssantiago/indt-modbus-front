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

export type ReadingType = 'VOLTAGE' | 'TEMPERATURE' | 'CURRENT';

export interface DeviceReading {
  id: number;
  type: ReadingType;
  value: string | number; // Aceita tanto string quanto number
  createdAt: string;
}

export interface DeviceReadingsApiResponse {
  data: DeviceReading[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ReadingFilters {
  type?: ReadingType;
  limit?: number;
  page?: number;
}
