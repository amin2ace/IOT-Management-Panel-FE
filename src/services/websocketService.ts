import { io, Socket } from "socket.io-client";
import {
  CmdParams,
  CommandSent,
  MQTTStatus,
  SensorData,
  SubscriptionConfirmed,
  SystemAlert,
  WebSocketError,
} from "../types";

// Complete WebSocket events type definition
interface WebSocketEvents {
  connected: () => void;
  disconnected: () => void;
  "sensor-data": (data: SensorData) => void;
  "sensor-data-batch": (data: SensorData[]) => void;
  "mqtt-status": (data: MQTTStatus) => void;
  "system-alert": (data: SystemAlert) => void;
  "command-sent": (data: CommandSent) => void;
  "subscription-confirmed": (data: SubscriptionConfirmed) => void;
  error: (error: WebSocketError) => void;
}

type WebSocketEvent = keyof WebSocketEvents;

class WebSocketService {
  private socket: Socket | null = null;
  private listeners: {
    [K in WebSocketEvent]?: WebSocketEvents[K][];
  } = {};
  /**
   * Connect to the WebSocket server
   */
  connect(): void {
    const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:30005";

    this.socket = io(`${WS_URL}/mqtt`, {
      withCredentials: true,
    });

    this.setupEventListeners();
  }

  /**
   * Set up all WebSocket event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Connection events
    this.socket.on("connect", this.handleConnect.bind(this));
    this.socket.on("disconnect", this.handleDisconnect.bind(this));

    // Data events
    this.socket.on("sensor-data", this.handleSensorData.bind(this));
    this.socket.on("sensor-data-batch", this.handleSensorDataBatch.bind(this));
    this.socket.on("mqtt-status", this.handleMqttStatus.bind(this));

    // System events
    this.socket.on("system-alert", this.handleSystemAlert.bind(this));
    this.socket.on("command-sent", this.handleCommandSent.bind(this));
    this.socket.on(
      "subscription-confirmed",
      this.handleSubscriptionConfirmed.bind(this)
    );

    // Error events
    this.socket.on("connection-error", this.handleError.bind(this));
    this.socket.on("subscription-error", this.handleError.bind(this));
    this.socket.on("command-error", this.handleError.bind(this));
  }

  /**
   * Event handler methods
   */
  private handleConnect(): void {
    console.log("WebSocket connected");
    this.emit("connected");
  }

  private handleDisconnect(): void {
    console.log("WebSocket disconnected");
    this.emit("disconnected");
  }

  private handleSensorData(data: SensorData): void {
    this.emit("sensor-data", data);
  }

  private handleSensorDataBatch(data: SensorData[]): void {
    this.emit("sensor-data-batch", data);
  }

  private handleMqttStatus(data: MQTTStatus): void {
    this.emit("mqtt-status", data);
  }

  private handleSystemAlert(data: SystemAlert): void {
    this.emit("system-alert", data);
  }

  private handleCommandSent(data: CommandSent): void {
    this.emit("command-sent", data);
  }

  private handleSubscriptionConfirmed(data: SubscriptionConfirmed): void {
    this.emit("subscription-confirmed", data);
  }

  private handleError(error: WebSocketError): void {
    this.emit("error", error);
  }

  /**
   * Public methods for client interaction
   */
  subscribeToSensor(sensorId: string, topics: string[]): void {
    this.socket?.emit("subscribe-sensor", { sensorId, topics });
  }

  sendCommand(deviceId: string, command: string, parameters?: CmdParams): void {
    this.socket?.emit("send-command", { deviceId, command, parameters });
  }

  getStatus(): void {
    this.socket?.emit("get-status");
  }

  /**
   * Event subscription management
   */
  on<T extends WebSocketEvent>(event: T, callback: WebSocketEvents[T]): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    // TypeScript can now infer the correct type
    this.listeners[event]!.push(callback);
  }

  off<T extends WebSocketEvent>(event: T, callback: WebSocketEvents[T]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  /**
   * Internal event emitter
   */
  private emit<T extends WebSocketEvent>(
    event: T,
    data?: Parameters<WebSocketEvents[T]>[0]
  ): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach((callback) => {
        try {
          // We need a type assertion here due to TypeScript limitations
          (callback as (data?: Parameters<WebSocketEvents[T]>[0]) => void)(
            data
          );
        } catch (error) {
          console.error(`Error in ${event} event listener:`, error);
        }
      });
    }
  }

  /**
   * Connection management
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  /**
   * Get socket instance (for advanced use cases)
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Create and export singleton instance
export const webSocketService = new WebSocketService();
