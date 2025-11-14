import { useEffect, useState } from "react";
import api from "@/api/axios";
import { DeviceCapabilities, SensorFunctionalityRequestDto } from "@/api";
import { RequestMessageCode } from "@/api/models/MessageCode";

export default function AssignPage() {
  const [devices, setDevices] = useState<SensorFunctionalityRequestDto[]>([]);
  const [selectedFunctionality, setSelectedFunctionality] = useState<
    Record<string, DeviceCapabilities>
  >({});
  const [assignedDevices, setAssignedDevices] = useState<Set<string>>(
    new Set()
  );
  const [loadingDevice, setLoadingDevice] = useState<string | null>(null);

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
  const handleFunctionalitySelect = (
    deviceId: string,
    func: DeviceCapabilities
  ) => {
    setSelectedFunctionality((prev) => ({
      ...prev,
      [deviceId]: func,
    }));
  };

  // 🧩 3. Send provisioning request
  const handleAssign = async (device: SensorFunctionalityRequestDto) => {
    const func = selectedFunctionality[device.deviceId];
    if (!func) {
      alert("Please select functionality before assigning");
      return;
    }

    const payload: SensorFunctionalityRequestDto = {
      userId: "admin",
      requestId: `req-fn-${Math.floor(Math.random() * 1000)}`,
      requestCode: RequestMessageCode.ASSIGN_DEVICE_FUNCTION,
      deviceId: device.deviceId,
      timestamp: Date.now(),
      functionality: [func],
      publishTopic: device.publishTopic || `sensors/${device.deviceId}/assign`,
      interval: 5000,
      highSetPoint: JSON.stringify({ high: 25 }),
      lowSetPoint: JSON.stringify({ low: 10 }),
      ackRequired: true,
      signature: "secure_signature_123",
    };

    try {
      setLoadingDevice(device.deviceId);
      await api.put("/device/deviceFunctionalityProvision", payload);
      setAssignedDevices((prev) => new Set([...prev, device.deviceId]));
    } catch (error) {
      console.error("Assign error:", error);
      alert("Failed to assign functionality");
    } finally {
      setLoadingDevice(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Assign Device Functionality</h2>

      {devices.length === 0 && (
        <p className="text-gray-400">No unassigned devices found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device: SensorFunctionalityRequestDto) => {
          const assigned = assignedDevices.has(device.deviceId);
          // const selected = selectedFunctionality[device.deviceId] || "";

          return (
            <div
              key={device.deviceId}
              className={`p-4 rounded-lg border ${
                assigned
                  ? "border-green-600 bg-green-900/30"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <h3 className="text-lg font-bold mb-2">{device.deviceId}</h3>
              <p className="text-sm mb-1 text-gray-400">
                TOPIC: {device.publishTopic}
              </p>
              <p className="text-sm mb-3 text-gray-400">
                Capabilities: {device.functionality?.join(", ")}
              </p>

              <select
                value={selectedFunctionality[device.deviceId] || ""}
                onChange={(e) => {
                  const selected = e.target
                    .value as keyof typeof DeviceCapabilities;
                  handleFunctionalitySelect(
                    device.deviceId,
                    DeviceCapabilities[selected]
                  );
                }}
                className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              >
                <option value="">Select Functionality</option>
                {Object.values(DeviceCapabilities)
                  .filter((cap) => device.functionality?.includes(cap))
                  .map((cap) => (
                    <option key={cap} value={cap}>
                      {cap.charAt(0).toUpperCase() + cap.slice(1)}
                    </option>
                  ))}
              </select>

              {assigned ? (
                <div className="text-green-400 text-center font-semibold">
                  ✅ Assigned
                </div>
              ) : (
                <button
                  onClick={() => handleAssign(device)}
                  disabled={loadingDevice === device.deviceId}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
                >
                  {loadingDevice === device.deviceId
                    ? "Assigning..."
                    : "Assign Functionality"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
