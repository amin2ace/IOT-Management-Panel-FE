import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";

interface DiscoveryResponse {
  deviceId: string;
  mac: string;
  capabilities?: string[];
  timestamp: string;
}

export default function DiscoveryPage() {
  const { socket, isConnected } = useSocket();
  const [devices, setDevices] = useState<DiscoveryResponse[]>([]);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Subscribe to discovery events
    socket.emit("/ws/discovery");

    // Handle subscription confirmation
    const handleSubscribed = () => {
      console.log("✅ Subscribed to discovery events");
      setSubscribed(true);
    };

    // Handle actual discovery events
    const handleDiscovery = (message: {
      event: string;
      data: DiscoveryResponse;
      timestamp: string;
      clientCount: number;
    }) => {
      console.log("📡 New device discovered:", message.data);
      setDevices((prev) => {
        // Avoid duplicates
        const exists = prev.some((d) => d.deviceId === message.data.deviceId);
        return exists ? prev : [...prev, message.data];
      });
    };

    // Handle errors
    const handleError = (error: any) => {
      console.error("❌ Subscription error:", error);
      setSubscribed(false);
    };

    socket.on("discovery-subscribed", handleSubscribed);
    socket.on("/ws/discovery", handleDiscovery);
    socket.on("subscription-error", handleError);

    return () => {
      socket.off("discovery-subscribed", handleSubscribed);
      socket.off("device-discovery", handleDiscovery);
      socket.off("subscription-error", handleError);
    };
  }, [socket, isConnected]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
        {subscribed && " | Listening for devices..."}
      </h2>

      {devices.length === 0 ? (
        <p className="text-gray-400">Waiting for devices to be discovered...</p>
      ) : (
        <div className="grid gap-4">
          {devices.map((device) => (
            <div
              key={device.deviceId}
              className="border border-green-500 rounded-lg p-4 bg-gray-900"
            >
              <h3 className="text-lg font-semibold text-green-400">
                {device.deviceId}
              </h3>
              <p className="text-gray-300">MAC: {device.mac}</p>
              {device.capabilities && (
                <p className="text-gray-300">
                  Capabilities: {device.capabilities.join(", ")}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                {new Date(device.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-400">
        <p>Connected clients: {devices.length}</p>
      </div>
    </div>
  );
}
