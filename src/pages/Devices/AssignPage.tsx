import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { DeviceCapabilities, SensorFunctionalityRequestDto } from "@/api";
import { RequestMessageCode } from "@/api/models/MessageCode";
import { useProvisionDevice } from "@/hooks/useDevices";
import { useAuth } from "@/context/AuthContext";
import { CapabilityColorMap } from "@/api/models/ColorMaps";
import { QueryUnassignedDevicesDto } from "@/api/models/QueryUnassignedDevicesDto";
import { ResponseGetSensors } from "@/api/models/GetSensorResponseDto";

// same constants…
const INTERVAL_MIN = 500;
const INTERVAL_MAX = 30000;
const LOW_MIN = 2;
const LOW_MAX = 36;
const HIGH_MIN = 36;
const HIGH_MAX = 120;

function CapabilityChip({ cap, selected, onToggle }: any) {
  return (
    <button
      type="button"
      onClick={() => onToggle(cap)}
      className={`px-2 py-1 rounded-md text-xs font-medium border transition inline-flex items-center gap-2 ${
        selected
          ? "ring-2 ring-indigo-400 bg-indigo-700 text-white"
          : `${CapabilityColorMap[cap]} hover:scale-105`
      }`}
    >
      {cap}
    </button>
  );
}

function NumberInput({
  value,
  setValue,
  min,
  max,
  step = 1,
  label,
  placeholder,
}: any) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-gray-300">{label}</label>}
      <input
        type="number"
        value={value ?? ""}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (Number.isNaN(v)) return setValue(min);
          setValue(v);
        }}
        className="w-full p-2 rounded bg-gray-700 text-sm"
      />
      <div className="text-xs text-gray-400">
        {min} - {max}
      </div>
    </div>
  );
}

export default function AssignPage() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { user } = useAuth();

  // socket-only device storage
  const [devices, setDevices] = useState<ResponseGetSensors[]>([]);
  const [loading, setLoading] = useState(true);

  // edit states
  const [editState, setEditState] = useState<Record<string, any>>({});

  // SOCKET-ONLY DEVICE FETCH
  useEffect(() => {
    if (!socket) return;

    const payload: QueryUnassignedDevicesDto = {
      userId: user?.userId || "",
      requestId: `req-discovery-${crypto.randomUUID()}`,
      requestCode: RequestMessageCode.ASSIGN_DEVICE_FUNCTION,
      deviceId: "",
      timestamp: Date.now(),
    };
    // request
    socket.emit("react/message/device/query/unassinged/request", payload);

    // response listener
    socket.on(
      "ws/message/unassinged/query/response",
      (device: ResponseGetSensors) => {
        setDevices((prev) => {
          const exists = prev.find((d) => d.deviceId === device.deviceId);
          if (exists) return prev;
          return [...prev, device];
        });
        setLoading(false);
      }
    );

    return () => {
      socket.off("ws/message/unassinged/query/response");
    };
  }, [socket]);

  // initialize editState only once per device
  useEffect(() => {
    if (devices.length === 0) return;

    const next: any = {};
    devices.forEach((d) => {
      next[d.deviceId] = {
        functionality: d.capabilities.length ? [d.capabilities[0]] : [],
        publishTopic: d.deviceBaseTopic || `sensors/${d.deviceId}/assign`,
        interval: 5000,
        highSetPoint: 50,
        lowSetPoint: 10,
      };
    });

    setEditState((prev) => ({ ...next, ...prev }));
  }, [devices]);

  function updateFor(deviceId: string, patch: Partial<ResponseGetSensors>) {
    setEditState((prev) => ({
      ...prev,
      [deviceId]: {
        ...(prev[deviceId] ?? {}),
        ...patch,
      },
    }));
  }

  function toggleFunctionality(deviceId: string, cap: DeviceCapabilities) {
    const cur = editState[deviceId]?.functionality ?? [];
    const exists = cur.includes(cap);
    updateFor(deviceId, {
      assignedFunctionality: exists
        ? cur.filter((c: DeviceCapabilities) => c !== cap)
        : [...cur, cap],
    });
  }

  const provisionMutation = useProvisionDevice();

  async function handleSend(device: ResponseGetSensors) {
    if (!socket) return;

    const model = editState[device.deviceId];

    if (!model || model.functionality.length === 0) {
      toast.error("Select at least one functionality");
      return;
    }

    const payload: SensorFunctionalityRequestDto = {
      userId: user?.userId ?? "null",
      requestId: `req-fn-${crypto.randomUUID()}`,
      requestCode: RequestMessageCode.ASSIGN_DEVICE_FUNCTION,
      deviceId: device.deviceId,
      timestamp: Date.now(),
      functionality: model.functionality,
      publishTopic: model.publishTopic,
      interval: model.interval,
      highSetPoint: JSON.stringify({ high: model.highSetPoint }),
      lowSetPoint: JSON.stringify({ low: model.lowSetPoint }),
      ackRequired: true,
      signature: "client-signature",
    };

    try {
      socket.emit("react/message/device/function/assign/request", payload);
      await provisionMutation.mutateAsync(payload);

      toast.success("Assign request sent");
    } catch (err) {
      console.error(err);
      toast.error("Assign request failed");
    }
  }

  return (
    <div className="dashboardContainer">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("assignTab")}</h1>
      </header>

      <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
        <p className="text-gray-300 mb-2">
          {t("dashoard.assignIntro") ||
            "Assign functionalities to unassigned sensors"}
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-sm uppercase">
                <th className="px-4 py-2">Device ID</th>
                <th className="px-4 py-2">Capabilities</th>
                <th className="px-4 py-2">Functionality</th>
                <th className="px-4 py-2">Publish Topic</th>
                <th className="px-4 py-2">Interval (ms)</th>
                <th className="px-4 py-2">Low SP</th>
                <th className="px-4 py-2">High SP</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-400">
                    {t("loading")}
                  </td>
                </tr>
              )}

              {!loading && devices.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-400">
                    No unassigned devices
                  </td>
                </tr>
              )}

              {devices?.map((device) => {
                const model = editState[device.deviceId];

                return (
                  <tr
                    key={device.deviceId}
                    className="border-t border-gray-700"
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium">{device.deviceId}</div>
                      <div className="text-xs text-gray-400">
                        {device.deviceHardware}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-2 flex-wrap">
                        {device?.capabilities?.map((cap) => (
                          <span
                            key={cap}
                            className="px-2 py-1 bg-indigo-600/30 text-indigo-300 rounded-md text-[11px]"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-2 flex-wrap">
                        {device.capabilities.map((cap) => (
                          <CapabilityChip
                            key={cap}
                            cap={cap}
                            selected={model.functionality.includes(cap)}
                            onToggle={() =>
                              toggleFunctionality(device.deviceId, cap)
                            }
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top w-64">
                      <input
                        className="w-full p-2 rounded bg-gray-700 text-sm"
                        value={model.publishTopic}
                        onChange={(e) =>
                          updateFor(device.deviceId, {
                            deviceBaseTopic: e.target.value,
                          })
                        }
                      />
                    </td>

                    <td className="px-4 py-3 align-top w-40">
                      <NumberInput
                        label={t("interval")}
                        value={model.interval}
                        setValue={(v: number) =>
                          updateFor(device.deviceId, { interval: v })
                        }
                        min={INTERVAL_MIN}
                        max={INTERVAL_MAX}
                        step={100}
                      />
                    </td>

                    <td className="px-4 py-3 align-top w-32">
                      <NumberInput
                        label={t("lowSetPoint")}
                        value={model.lowSetPoint}
                        setValue={(v: number) =>
                          updateFor(device.deviceId, { lowSetPoint: v })
                        }
                        min={LOW_MIN}
                        max={LOW_MAX}
                        step={0.1}
                      />
                    </td>

                    <td className="px-4 py-3 align-top w-32">
                      <NumberInput
                        label={t("highSetPoint")}
                        value={model.highSetPoint}
                        setValue={(v: number) =>
                          updateFor(device.deviceId, { highSetPoint: v })
                        }
                        min={HIGH_MIN}
                        max={HIGH_MAX}
                        step={0.1}
                      />
                    </td>

                    <td className="px-4 py-3 align-top w-36">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleSend(device)}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
                        >
                          {t("assign")}
                        </button>

                        <button
                          onClick={() =>
                            updateFor(device.deviceId, {
                              assignedFunctionality: [],
                              deviceBaseTopic: `sensors/${device.deviceId}/assign`,
                              interval: 5000,
                              highSetPoint: 50,
                              lowSetPoint: 10,
                            })
                          }
                          className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm"
                        >
                          {t("reset")}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
