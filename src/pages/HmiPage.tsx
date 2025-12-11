// import { useEffect, useState } from "react";
// import { useSocket } from "@/hooks/useSocket";
// import { motion } from "framer-motion";
// import { ConnectionState } from "@/api/models/enums/ConnectionStateEnum";

// export default function HmiPage() {
//   const { socket, isConnected } = useSocket();
//   const [status, setStatus] = useState<ConnectionState | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!socket) return;

//     // Ask backend for current status
//     socket.emit("get-status", { deviceId: "sensor-001" });

//     socket.on("status-update", (data: ConnectionState) => {
//       setStatus(data);
//     });

//     return () => {
//       socket.off("status-update");
//     };
//   }, [socket]);

//   const toggleRelay = (relay: RelayState) => {
//     if (!socket || !status) return;
//     setLoading(true);

//     const newState = !relay.state;
//     socket.emit("send-command", {
//       deviceId: status.deviceId,
//       command: "toggle-relay",
//       relayId: relay.id,
//       state: newState,
//     });
//   };

//   const toggleMode = () => {
//     if (!socket || !status) return;
//     const newMode = status.mode === "manual" ? "auto" : "manual";
//     socket.emit("send-command", {
//       deviceId: status.deviceId,
//       command: "switch-mode",
//       mode: newMode,
//     });
//   };

//   if (!status)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-gray-300">
//         <p className="text-lg">Waiting for device status...</p>
//       </div>
//     );

//   return (
//     <div className="p-8 bg-linear-to-br from-gray-900 to-gray-800 min-h-screen text-gray-100">
//       <header className="flex items-center justify-between mb-6">
//         <h2 className="text-3xl font-bold tracking-wide">
//           🧠 HMI Control Panel – {status.deviceId}
//         </h2>
//         <div
//           className={`px-3 py-1 rounded-full text-sm ${
//             isConnected
//               ? "bg-green-600/30 text-green-400"
//               : "bg-red-600/30 text-red-400"
//           }`}
//         >
//           {isConnected ? "Connected" : "Disconnected"}
//         </div>
//       </header>

//       {/* Mode Switch */}
//       <motion.div
//         whileHover={{ scale: 1.02 }}
//         className="flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl mb-8"
//       >
//         <h3 className="text-lg font-semibold text-indigo-300">Mode</h3>
//         <button
//           onClick={toggleMode}
//           className={`px-6 py-2 rounded-lg font-semibold transition ${
//             status.mode === "manual"
//               ? "bg-amber-500 hover:bg-amber-600"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {status.mode === "manual" ? "Manual" : "Automatic"}
//         </button>
//       </motion.div>

//       {/* Relay Controls */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {status.relays.map((relay) => (
//           <motion.div
//             key={relay.id}
//             whileHover={{ scale: 1.03 }}
//             className={`p-6 rounded-2xl border shadow-lg backdrop-blur-md transition ${
//               relay.state
//                 ? "bg-green-800/40 border-green-600/40"
//                 : "bg-gray-800/40 border-gray-700/40"
//             }`}
//           >
//             <h4 className="text-xl font-semibold mb-2">{relay.name}</h4>
//             <p className="text-sm mb-4 text-gray-400">
//               Last update:{" "}
//               {new Date(relay.lastUpdated).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 second: "2-digit",
//               })}
//             </p>
//             <button
//               disabled={status.mode === "auto" || loading}
//               onClick={() => toggleRelay(relay)}
//               className={`w-full py-2 rounded-lg font-semibold ${
//                 status.mode === "auto"
//                   ? "bg-gray-600 cursor-not-allowed text-gray-400"
//                   : relay.state
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-red-500 hover:bg-red-600"
//               }`}
//             >
//               {status.mode === "auto"
//                 ? "Auto Mode"
//                 : relay.state
//                   ? "Turn Off"
//                   : "Turn On"}
//             </button>
//           </motion.div>
//         ))}
//       </div>

//       {/* Telemetry Summary */}
//       <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
//         {Object.entries(status.telemetry).map(([metric, value]) => (
//           <motion.div
//             key={metric}
//             whileHover={{ scale: 1.05 }}
//             className="p-4 rounded-xl bg-white/5 border border-white/10 text-center backdrop-blur-md"
//           >
//             <h4 className="text-sm text-gray-400">{metric}</h4>
//             <p className="text-2xl font-semibold text-indigo-300">
//               {value.toFixed(2)}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
