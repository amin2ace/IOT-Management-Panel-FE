// import { useQuery } from "@tanstack/react-query";
// import { DiscoveryResponseDto } from "@/api/models/DiscoveryResponseDto";
// import { DevicesService } from "@/api";

// export function Dashboard() {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["devices"],
//     queryFn: () =>
//       DevicesService.deviceControllerGetSensors(deviceId).then(
//         (res) => res.data
//       ),
//   });
//   console.log({ data });

//   if (isLoading)
//     return <div className="p-10 text-gray-500">Loading devices...</div>;
//   if (isError)
//     return <div className="p-10 text-red-500">Error loading devices</div>;

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-6">Connected Devices</h1>
//       <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
//         <thead>
//           <tr className="bg-gray-200 dark:bg-gray-700 text-left text-sm uppercase">
//             <th className="px-4 py-2">Device ID</th>
//             <th className="px-4 py-2">Discover Time</th>
//             <th className="px-4 py-2">Capabilities</th>
//             <th className="px-4 py-2">Default Function</th>
//             <th className="px-4 py-2">Device Hardware</th>
//             <th className="px-4 py-2">Base Topic</th>
//             <th className="px-4 py-2">Connection State</th>
//             <th className="px-4 py-2">Firmware Ver</th>
//             <th className="px-4 py-2">MAC Address</th>
//             <th className="px-4 py-2">IP Address</th>
//             <th className="px-4 py-2">Last Reboot</th>
//             <th className="px-4 py-2">Location</th>
//             <th className="px-4 py-2">Default Protocol</th>
//             <th className="px-4 py-2">Additional Info</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((device: DiscoveryResponseDto) => (
//             <tr
//               key={device.deviceId}
//               className="border-t border-gray-300 dark:border-gray-700"
//             >
//               <td className="px-4 py-2">{device.deviceId}</td>
//               <td className="px-4 py-2">
//                 {new Date(device.timestamp).toLocaleString()}
//               </td>
//               <td className="px-4 py-2">{device.capabilities.join(", ")}</td>
//               <td className="px-4 py-2">{device.deviceHardware}</td>
//               <td className="px-4 py-2">{device.topicPrefix}</td>
//               <td className="px-4 py-2">
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-semibold ${
//                     device.connectionState === "online"
//                       ? "bg-green-400 text-green-800"
//                       : "bg-red-400 text-red-700"
//                   }`}
//                 >
//                   {device.connectionState}
//                 </span>
//               </td>
//               <td className="px-4 py-2">{device.firmware}</td>
//               <td className="px-4 py-2">{device.mac}</td>
//               <td className="px-4 py-2">{device.ip}</td>
//               <td className="px-4 py-2">
//                 {device.location
//                   ? `${device.location.site}|${device.location.floor}|${device.location.unit}`
//                   : "N/A"}
//               </td>
//               <td className="px-4 py-2">{device.protocol}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
