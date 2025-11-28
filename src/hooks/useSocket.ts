// Even better - singleton pattern
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_WEB_COCKET_URL;

// Singleton socket instance
let globalSocket: Socket | null = null;

export interface SocketHook {
  socket: Socket | null;
  isConnected: boolean;
}

export function useSocket(): SocketHook {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Use existing socket or create new one
    if (!globalSocket) {
      globalSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 9999,
      });

      globalSocket.on("connect", () => setIsConnected(true));
      globalSocket.on("disconnect", () => setIsConnected(false));
    }

    setSocket(globalSocket);

    return () => {
      // Don't disconnect - keep socket alive for entire app
      // The socket will be cleaned up when the page is refreshed
    };
  }, []);

  return { socket, isConnected };
}
