import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/context/AuthContext";
import { DeviceCapabilities } from "@/api";
import { RequestMessageCode } from "@/api/models/enums/MessageCodeEnum";
import { QueryUnassignedDevicesDto } from "@/api/models/device/QueryUnassignedDevicesDto";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";

// Constants
export const ASSIGN_CONSTANTS = {
  INTERVAL: { min: 500, max: 30000, step: 100 },
  LOW_SET_POINT: { min: 2, max: 36, step: 0.1 },
  HIGH_SET_POINT: { min: 36, max: 120, step: 0.1 },
};

export interface DeviceEditState {
  functionality: DeviceCapabilities[];
  publishTopic: string;
  interval: number;
  highSetPoint: number;
  lowSetPoint: number;
}

/**
 * Hook to load unassigned devices from WebSocket
 * Handles device fetching and deduplication
 */
export function useLoadUnassignedDevices() {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [devices, setDevices] = useState<ResponseGetDevice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket || !user?.userId) return;

    const listener = (newDevices: ResponseGetDevice[]) => {
      setDevices((prev) => {
        const existingMap = new Map(
          prev.map((device) => [device.deviceId, device])
        );

        newDevices.forEach((device) => {
          if (!existingMap.has(device.deviceId)) {
            existingMap.set(device.deviceId, device);
          }
        });

        return Array.from(existingMap.values());
      });
      setLoading(false);
    };

    const payload: QueryUnassignedDevicesDto = {
      userId: user.userId,
      requestId: `req-discovery-${crypto.randomUUID()}`,
      requestCode: RequestMessageCode.REQUEST_ASSIGN_DEVICE_FUNCTION,
      deviceId: "",
      timestamp: Date.now(),
    };

    socket.emit("react/message/device/query/unassinged/request", payload);
    socket.on("ws/message/unassinged/query/response", listener);

    return () => {
      socket.off("ws/message/unassinged/query/response");
    };
  }, [socket, user?.userId]);

  return { devices, loading };
}

/**
 * Hook to manage edit state for device assignments
 * Handles initialization and updates
 */
export function useAssignEditState(devices: ResponseGetDevice[]) {
  const [editState, setEditState] = useState<Record<string, DeviceEditState>>(
    {}
  );

  // Initialize edit state for new devices
  useEffect(() => {
    if (!devices?.length) return;

    const newState: Record<string, DeviceEditState> = {};

    devices.forEach((device) => {
      if (device?.deviceId && !editState[device.deviceId]) {
        newState[device.deviceId] = {
          functionality:
            device.capabilities && device.capabilities.length > 0
              ? [device.capabilities[0]]
              : [],
          publishTopic:
            device.deviceBaseTopic || `sensors/${device.deviceId}/assign`,
          interval: 5000,
          highSetPoint: 50,
          lowSetPoint: 10,
        };
      }
    });

    if (Object.keys(newState).length > 0) {
      setEditState((prev) => ({ ...prev, ...newState }));
    }
  }, [devices, editState]);

  const updateFor = (deviceId: string, patch: Partial<DeviceEditState>) => {
    setEditState((prev) => ({
      ...prev,
      [deviceId]: {
        ...(prev[deviceId] ?? getDefaultState(deviceId)),
        ...patch,
      },
    }));
  };

  const toggleFunctionality = (deviceId: string, cap: DeviceCapabilities) => {
    const current = editState[deviceId]?.functionality ?? [];
    const exists = current.includes(cap);
    updateFor(deviceId, {
      functionality: exists
        ? current.filter((c) => c !== cap)
        : [...current, cap],
    });
  };

  const resetDevice = (deviceId: string) => {
    updateFor(deviceId, getDefaultState(deviceId));
  };

  return { editState, updateFor, toggleFunctionality, resetDevice };
}

/**
 * Get default edit state for a device
 */
function getDefaultState(deviceId: string): DeviceEditState {
  return {
    functionality: [],
    publishTopic: `sensors/${deviceId}/assign`,
    interval: 5000,
    highSetPoint: 50,
    lowSetPoint: 10,
  };
}
