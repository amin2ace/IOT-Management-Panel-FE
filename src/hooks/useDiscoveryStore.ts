import { useEffect, useState } from "react";
import { DiscoveryResponseDto } from "@/api/models/device/DiscoveryResponseDto";

const STORAGE_KEY = "discovery_devices";

export function useDiscoveryStore() {
  const [devices, setDevices] = useState<DiscoveryResponseDto[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setDevices(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
  }, [devices]);

  // Add new row
  function addDevice(device: DiscoveryResponseDto) {
    setDevices((prev) => {
      // Avoid duplicates (same deviceId)
      const exists = prev.some((d) => d.deviceId === device.deviceId);
      if (exists) {
        return prev.map((d) => (d.deviceId === device.deviceId ? device : d));
      }
      return [...prev, device];
    });
  }

  // 🚀 NEW: Clear all devices
  function clear() {
    localStorage.removeItem(STORAGE_KEY);
    setDevices([]);
  }

  return {
    devices,
    addDevice,
    clear,
  };
}
