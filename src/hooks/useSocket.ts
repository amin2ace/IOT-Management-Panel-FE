import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(onEvents?: { [event: string]: (data: any) => void }) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_WS_URL || "http://localhost:30005";
    const socket = io(url + "/mqtt", {
      transports: ["websocket"],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => console.log("socket connected", socket.id));
    socket.on("disconnect", () => console.log("socket disconnected"));

    if (onEvents) {
      Object.entries(onEvents).forEach(([ev, handler]) =>
        socket.on(ev, handler)
      );
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef;
}
