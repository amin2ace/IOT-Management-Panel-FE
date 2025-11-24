// import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:30005/mqtt"; // backend gateway port + namespace

// let socket: Socket | null = null;

// export const connectSocket = (): Socket => {
//   if (!socket) {
//     socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       withCredentials: true,
//     });

//     socket.on("connect", () => {
//       console.log("✅ Connected to WebSocket:", socket?.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Disconnected from WebSocket");
//     });
//   }

//   return socket;
// };

// export const getSocket = (): Socket | null => socket;

// export const disconnectSocket = (): void => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };
