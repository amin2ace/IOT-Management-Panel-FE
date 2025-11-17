// src/pages/Discover/DiscoverPage.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/context/AuthContext";
import { DiscoveryRequestDto } from "@/api";
import { useTranslation } from "react-i18next";
import { DiscoveryResponseDto } from "@/api/models/DiscoveryResponseDto";
import DevicesResultTable from "@/components/DiscoveryResultsTable";

export default function DiscoveryPage() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiscoveryResponseDto>();

  // -------------------------------
  // Listen for incoming discovery responses
  // -------------------------------
  useEffect(() => {
    if (!socket) return;
    // clear previous results when entering the page
    // setResult();
    const listener = (res: DiscoveryResponseDto) => {
      if (!res) return;

      toast.success(`Device: ${res.deviceId}`);
      setResult(res); // Add new device
    };

    socket.on("ws/message/discovery/broadcast/response", listener);
    socket.on("ws/message/discovery/unicast/response", listener);

    return () => {
      socket.off("ws/message/discovery/broadcast/response", listener);
      socket.off("ws/message/discovery/unicast/response", listener);
      // optional: also clear when leaving
    };
  }, [socket]);

  // -------------------------------
  // Form schema
  // -------------------------------
  const schema = z.object({
    deviceId: z.string().min(1, "Device ID is required"),
  });

  const method = useForm({ resolver: zodResolver(schema) });
  const { handleSubmit, register } = method;

  // -------------------------------
  // Unicast
  // -------------------------------
  const handleUnicast = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    const payload: DiscoveryRequestDto = {
      userId: user?.userId || "null",
      requestId: crypto.randomUUID(),
      requestCode: 100,
      timestamp: Date.now(),
      deviceId: data.deviceId,
      isBroadcast: false,
    };

    try {
      socket?.emit("react/message/discovery/unicast/request", payload);
      toast.success(t("discoveryUnicastSent"));
    } catch {
      toast.error(t("failedToSendDiscovery"));
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Broadcast
  // -------------------------------
  const handleBroadcast = async () => {
    setLoading(true);
    const payload: DiscoveryRequestDto = {
      userId: user?.userId || "null",
      requestId: crypto.randomUUID(),
      requestCode: 100,
      timestamp: Date.now(),
      isBroadcast: true,
    };

    try {
      socket?.emit("react/message/discovery/broadcast/request", payload);
      toast.success(t("discoveryBroadcastSent"));
    } catch {
      toast.error(t("failedToSendDiscovery"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("discover")}</h1>

      {/* Broadcast */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <p className="text-gray-300 mb-3">{t("discoveryBroadcastTitle")}</p>
        <button
          onClick={handleBroadcast}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? t("sending") : t("broadcastDiscover")}
        </button>
      </div>

      {/* Unicast */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <p className="text-gray-300 mb-3">{t("discoveryUnicastTitle")}</p>

        <form onSubmit={handleSubmit(handleUnicast)} className="flex gap-3">
          <button className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">
            {loading ? t("sending") : t("unicastDiscover")}
          </button>

          <div className="flex items-center gap-2">
            <label>{t("deviceId")}</label>
            <input {...register("deviceId")} className="input w-40" />
          </div>
        </form>
      </div>

      {/* Results Table */}
      <DevicesResultTable result={result} />
    </div>
  );
}
