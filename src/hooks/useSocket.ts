import { connectSocket } from "@/utils/socket";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const sock = connectSocket();
    setSocket(sock);

    const handleConnect = () => {
      setIsConnected(true);
      setConnectionError(null);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleError = (error: any) => {
      setConnectionError(error?.message || "Connection error");
    };

    sock.on("connect", handleConnect);
    sock.on("disconnect", handleDisconnect);
    sock.on("connection-error", handleError);

    return () => {
      sock.off("connect", handleConnect);
      sock.off("disconnect", handleDisconnect);
      sock.off("connection-error", handleError);
    };
  }, []);

  return { socket, isConnected, connectionError };
}
