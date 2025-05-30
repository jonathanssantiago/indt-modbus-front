import { io, Socket } from 'socket.io-client';
import { ModbusData } from '../types';
import { config } from '../config';

type EventCallback<T> = (data: T) => void;
type EventMap = {
  connectionStatus: EventCallback<boolean>;
  modbusData: EventCallback<ModbusData>;
  error: EventCallback<string>;
};

class WebSocketService {
  private static instance: WebSocketService;
  private socket: Socket | null = null;
  private listeners: Map<keyof EventMap, Set<EventMap[keyof EventMap]>> =
    new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = config.websocket.maxReconnectAttempts;
  private reconnectDelay = config.websocket.reconnectDelay;
  private reconnectTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.connect();
  }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private connect() {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(config.websocket.url, {
      transports: ['websocket'],
      autoConnect: true,
      timeout: config.websocket.timeout,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket conectado');
      this.reconnectAttempts = 0;

      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket desconectado:', reason);
      this.notifyListeners('connectionStatus', false);

      if (reason === 'io server disconnect') {
        this.handleReconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Erro de conexão WebSocket:', error);
      this.notifyListeners('error', `Erro de conexão: ${error.message}`);
      this.handleReconnect();
    });

    this.socket.on('modbusData', (data: ModbusData) => {
      console.log('Dados Modbus recebidos:', data);
      this.notifyListeners('modbusData', data);
    });

    this.socket.on('connectionStatus', (isConnected: boolean) => {
      console.log('Status de conexão Modbus:', isConnected);
      this.notifyListeners('connectionStatus', isConnected);
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Máximo de tentativas de reconexão atingido');
      this.notifyListeners('error', 'Não foi possível reconectar ao servidor');
      return;
    }

    if (this.reconnectTimer) {
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `Tentativa de reconexão ${this.reconnectAttempts}/${this.maxReconnectAttempts} em ${delay}ms`
    );

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  public subscribe<K extends keyof EventMap>(event: K, callback: EventMap[K]) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback as EventMap[keyof EventMap]);
  }

  public unsubscribe<K extends keyof EventMap>(
    event: K,
    callback: EventMap[K]
  ) {
    this.listeners.get(event)?.delete(callback as EventMap[keyof EventMap]);
  }

  private notifyListeners<K extends keyof EventMap>(
    event: K,
    data: Parameters<EventMap[K]>[0]
  ) {
    this.listeners.get(event)?.forEach((callback) => {
      try {
        (callback as EventCallback<Parameters<EventMap[K]>[0]>)(data);
      } catch (error) {
        console.error('Erro ao notificar listener:', error);
      }
    });
  }

  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  public disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public forceReconnect() {
    this.reconnectAttempts = 0;
    this.connect();
  }
}

export default WebSocketService;
