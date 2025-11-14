// src/pages/Assign/AssignPage.tsx
import { DeviceCapabilities, SensorFunctionalityRequestDto } from "@/api";
import { useProvisionDevice, useUnassignedDevices } from "@/hooks/useDevices";
import React, {  useState } from "react";

export default function AssignPage() {
  const { data: devices = [], isLoading } = useUnassignedDevices();
  const provision = useProvisionDevice();

  const [selection, setSelection] = useState<
    Record<string, DeviceCapabilities>
  >({});
  const [assigned, setAssigned] = useState<Set<string>>(new Set());

  const onSelect = (id: string, val: DeviceCapabilities) =>
    setSelection((s) => ({ ...s, [id]: val }));

  const assign = async (device: {
    deviceId: string;
    publishTopic?: string;
  }) => {
    const func = selection[device.deviceId];
    if (!func) return alert("Select a capability");
    const payload: SensorFunctionalityRequestDto = {
      userId: "ui-user",
      requestId: crypto.randomUUID(),
      requestCode: 101,
      deviceId: device.deviceId,
      timestamp: Date.now(),
      functionality: [func],
      publishTopic: device.publishTopic ?? `sensors/${device.deviceId}/assign`,
      interval: 5000,
      highSetPoint: JSON.stringify({ high: 25 }),
      lowSetPoint: JSON.stringify({ low: 10 }),
      ackRequired: true,
      signature: "ui-signature",
    };

    try {
      await provision.mutateAsync(payload);
      setAssigned((s) => new Set(s).add(device.deviceId));
    } catch (err) {
      console.error(err);
      alert("Provision failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Assign Functionality</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <div>Loading devices...</div>}
        {devices.map((d: ) => {
          const isAssigned = assigned.has(d.deviceId);
          return (
            <div
              key={d.deviceId}
              className={`p-4 rounded-lg ${isAssigned ? "bg-green-900/20" : "bg-gray-800"}`}
            >
              <h3 className="font-semibold">{d.deviceId}</h3>
              <p className="text-sm text-gray-400">MAC: {d.mac}</p>
              <p className="text-sm text-gray-400">
                Capabilities: {(d.capabilities || []).join(", ")}
              </p>

              <select
                value={selection[d.deviceId] ?? ""}
                disabled={isAssigned}
                onChange={(e) =>
                  onSelect(d.deviceId, e.target.value as DeviceCapabilities)
                }
                className="mt-3 w-full p-2 rounded bg-gray-700"
              >
                <option value="">Select</option>
                {(d.capabilities || []).map((c: DeviceCapabilities) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                onClick={() => assign(d)}
                disabled={isAssigned}
                className="mt-3 w-full py-2 rounded bg-indigo-600"
              >
                {isAssigned ? "Assigned" : "Assign"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
