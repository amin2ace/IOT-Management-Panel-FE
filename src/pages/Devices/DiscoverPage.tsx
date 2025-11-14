// src/pages/Discover/DiscoverPage.tsx
import { DevicesService, DiscoveryRequestDto } from "@/api";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Component: Broadcast Discovery Page 'READ_ONLY'
export default function DiscoverPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleBroadcast = async () => {
    setLoading(true);
    const payload: DiscoveryRequestDto = {
      userId: "ui-user",
      requestId: crypto.randomUUID(),
      requestCode: 100,
      deviceId: "",
      timestamp: Date.now(),
      isBroadcast: true,
      filters: { subnet: "192.168.1.0/24", hardware: ["ESP32", "ESP8266"] },
    };
    try {
      await DevicesService.deviceControllerDiscoverDevicesBroadcast(payload);
      alert("Discovery broadcast sent");
    } catch (err) {
      console.error(err);
      alert("Failed to send discovery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("discover")}</h1>
      </header>

      <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10">
        <p className="text-gray-300 mb-4">
          Start broadcast or unicast discovery to find devices on the LAN.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleBroadcast}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            {loading ? "Sending..." : "Broadcast Discover"}
          </button>
        </div>
      </div>
    </div>
  );
}
