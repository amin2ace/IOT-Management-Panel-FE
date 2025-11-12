import { useEffect, useState } from "react";
import api from "@/api/axios";
import {
  SensorFunctionalityRequest,
  SensorType,
  RequestMessageCode,
  DiscoveryResponse,
} from "@/types";

export default function AssignPage() {
  const [devices, setDevices] = useState<DiscoveryResponse[]>([]);
  const [selectedFunctionality, setSelectedFunctionality] = useState<
    Record<string, SensorType | "">
  >({});
  const [loading, setLoading] = useState(false);

  // 🧠 1. Load unassigned devices from backend
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get("/device/unassigned");
        setDevices(response.data || []);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      }
    };

    fetchDevices();
  }, []);

  // 🧩 2. Handle dropdown selection
  const handleFunctionalitySelect = (deviceId: string, func: SensorType) => {
    setSelectedFunctionality((prev) => ({
      ...prev,
      [deviceId]: func,
    }));
  };

  // 🧩 3. Send provisioning request
  const handleAssign = async (device: DiscoveryResponse) => {
    const func = selectedFunctionality[device.sensorId];
    if (!func) {
      alert("Please select functionality before assigning");
      return;
    }

    const payload: SensorFunctionalityRequest = {
      userId: "admin",
      requestId: `req-fn-${Math.floor(Math.random() * 1000)}`,
      requestCode: RequestMessageCode.ASSIGN_DEVICE_FUNCTION,
      deviceId: device.sensorId,
      timestamp: Date.now(),
      functionality: [func],
      publishTopic:
        device.deviceBaseTopic || `sensors/${device.sensorId}/assign`,
      interval: 5000,
      highSetPoint: JSON.stringify({ high: 25 }),
      lowSetPoint: JSON.stringify({ low: 10 }),
      ackRequired: true,
      signature: "secure_signature_123",
    };

    try {
      setLoading(true);
      await api.put("/device/deviceFunctionalityProvision", payload);
      alert(`Device ${device.sensorId} assigned as ${func}`);
    } catch (error) {
      console.error("Assign error:", error);
      alert("Failed to assign functionality");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Assign Device Functionality</h2>

      {devices.length === 0 && (
        <p className="text-gray-400">No unassigned devices found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div
            key={device.sensorId}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <h3 className="text-lg font-bold mb-2">{device.sensorId}</h3>
            <p className="text-sm mb-1 text-gray-400">MAC: {device.mac}</p>
            <p className="text-sm mb-3 text-gray-400">
              Capabilities: {device.capabilities?.join(", ")}
            </p>

            <select
              value={selectedFunctionality[device.sensorId] || ""}
              onChange={(e) => {
                const selected = e.target.value as keyof typeof SensorType;
                handleFunctionalitySelect(
                  device.sensorId,
                  SensorType[selected]
                );
              }}
              className="w-full p-2 rounded bg-gray-700 text-white mb-3"
            >
              <option value="">Select Functionality</option>
              {Object.values(SensorType)
                .filter((cap) => device.capabilities.includes(cap))
                .map((cap) => (
                  <option key={cap} value={cap}>
                    {cap.charAt(0).toUpperCase() + cap.slice(1)}
                  </option>
                ))}
            </select>

            <button
              onClick={() => handleAssign(device)}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
            >
              {loading ? "Assigning..." : "Assign Functionality"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
