// src/pages/AssignPage.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSocket } from "@/hooks/useSocket";
import { DeviceCapabilities } from "@/api";
import { RequestMessageCode } from "@/api/models/enums/MessageCodeEnum";
import { useAuth } from "@/context/AuthContext";
import { QueryUnassignedDevicesDto } from "@/api/models/device/QueryUnassignedDevicesDto";
import AssignTable from "@/components/AssignTable";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";

// Constants
const INTERVAL_MIN = 500;
const INTERVAL_MAX = 30000;
const LOW_MIN = 2;
const LOW_MAX = 36;
const HIGH_MIN = 36;
const HIGH_MAX = 120;

export interface DeviceEditState {
  functionality: DeviceCapabilities[];
  publishTopic: string;
  interval: number;
  highSetPoint: number;
  lowSetPoint: number;
}

export default function AssignPage() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { user } = useAuth();

  const [devices, setDevices] = useState<ResponseGetDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState<Record<string, DeviceEditState>>(
    {}
  );

  // Socket-only device fetch
  useEffect(() => {
    if (!socket) return;

    const listener = (devices: ResponseGetDevice[]) => {
      setDevices((prev) => {
        // Create a map of existing devices for quick lookup
        const existingDevices = new Map(
          prev.map((device) => [device.deviceId, device])
        );

        // Add new devices that don't exist already
        devices.forEach((device) => {
          if (!existingDevices.has(device.deviceId)) {
            existingDevices.set(device.deviceId, device);
          }
        });

        // Convert back to array
        return Array.from(existingDevices.values());
      });
      setLoading(false);
    };

    const payload: QueryUnassignedDevicesDto = {
      userId: user?.userId || "",
      requestId: `req-discovery-${crypto.randomUUID()}`,
      requestCode: RequestMessageCode.REQUEST_ASSIGN_DEVICE_FUNCTION,
      deviceId: "",
      timestamp: Date.now(),
    };

    socket.emit("react/message/device/query/unassinged/request", payload);

    // If the backend sends an array of devices
    socket.on("ws/message/unassinged/query/response", listener);

    return () => {
      socket.off("ws/message/unassinged/query/response");
    };
  }, [socket, user?.userId]);

  // Initialize editState only once per device - FIXED VERSION
  useEffect(() => {
    // Add null/undefined check and empty array fallback
    const devicesArray = devices || [];

    if (devicesArray.length === 0) return;

    const next: Record<string, DeviceEditState> = {};

    devicesArray.forEach((d) => {
      // Add safety check for device properties
      if (d && d.deviceId) {
        next[d.deviceId] = {
          functionality:
            d.capabilities && d.capabilities.length > 0
              ? [d.capabilities[0]]
              : [],
          publishTopic: d.deviceBaseTopic || `sensors/${d.deviceId}/assign`,
          interval: 5000,
          highSetPoint: 50,
          lowSetPoint: 10,
        };
      }
    });

    setEditState((prev) => ({ ...prev, ...next }));
  }, [devices]);

  const updateFor = (deviceId: string, patch: Partial<DeviceEditState>) => {
    setEditState((prev) => ({
      ...prev,
      [deviceId]: {
        ...(prev[deviceId] ?? {
          functionality: [],
          publishTopic: `sensors/${deviceId}/assign`,
          interval: 5000,
          highSetPoint: 50,
          lowSetPoint: 10,
        }),
        ...patch,
      },
    }));
  };

  const toggleFunctionality = (deviceId: string, cap: DeviceCapabilities) => {
    const current = editState[deviceId]?.functionality ?? [];
    const exists = current.includes(cap);
    updateFor(deviceId, {
      functionality: exists
        ? current.filter((c: DeviceCapabilities) => c !== cap)
        : [...current, cap],
    });
  };

  const resetDevice = (deviceId: string) => {
    updateFor(deviceId, {
      functionality: [],
      publishTopic: `sensors/${deviceId}/assign`,
      interval: 5000,
      highSetPoint: 50,
      lowSetPoint: 10,
    });
  };

  return (
    <div className="dashboardAssignContainer">
      <header className="flex items-center justify-between mb-5 ml-3">
        <h1 className="text-2xl font-semibold">{t("path.assignTab")}</h1>
      </header>

      <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
        <p className="text-gray-600 dark:text-gray-300 mb-5">
          {t("assign.assignIntro") ||
            "Assign functionalities to unassigned sensors"}
        </p>

        <AssignTable
          devices={devices} // Ensure devices is always an array
          loading={loading}
          editState={editState}
          onUpdate={updateFor}
          onToggleFunctionality={toggleFunctionality}
          onReset={resetDevice}
          constants={{
            interval: { min: INTERVAL_MIN, max: INTERVAL_MAX, step: 100 },
            lowSetPoint: { min: LOW_MIN, max: LOW_MAX, step: 0.1 },
            highSetPoint: { min: HIGH_MIN, max: HIGH_MAX, step: 0.1 },
          }}
        />
      </div>
    </div>
  );
}
