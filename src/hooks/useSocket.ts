import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// import.meta.env.VITE_GATEWAY_URL ??
const SOCKET_URL = "http://localhost:30005/mqtt";

export interface SocketHook {
  socket: Socket | null;
  isConnected: boolean;
}

export function useSocket(): SocketHook {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const s = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 9999,
    });
    socketRef.current = s;

    s.on("connect", () => setIsConnected(true));
    s.on("disconnect", () => setIsConnected(false));

    return () => {
      s.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected };
}
