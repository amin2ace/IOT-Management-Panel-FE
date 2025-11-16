// src/pages/Discover/DiscoverPage.tsx
import { DiscoveryRequestDto } from "@/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import z from "zod";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/context/AuthContext";

// Component: Broadcast Discovery Page 'READ_ONLY'
export default function DiscoveryPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { socket } = useSocket();
  const { user } = useAuth();

  socket?.on("ws/message/discovery/broadcast/response", (res) => {
    toast.success(res);
  });
  // Get device id from input tag
  const schema = z.object({
    deviceId: z.string().min(1, { error: "Device ID is required" }),
  });
  const method = useForm({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, register } = method;

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
      socket?.emit("react/message/discovery/unicast/req", payload);
      toast.success(t("discoveryUnicastSent"));
    } catch (err) {
      console.error(err);
      toast.error(t("failedToSendDiscovery"));
    } finally {
      setLoading(false);
    }
  };
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
      socket?.emit("react/message/discovery/broadcast/req", payload);
      toast.success(t("discoveryBroadcastSent"));
    } catch (err) {
      console.error(err);
      toast.error(t("failedToSendDiscovery"));
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
        <p className="text-gray-300 mb-4">{t("discoveryBroadcastTitle")}</p>

        <div className="flex gap-3">
          <button
            onClick={handleBroadcast}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            {loading ? t("sending") : t("broadcastDiscover")}
          </button>
        </div>
      </div>
      <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10">
        <p className="text-gray-300 mb-4">{t("discoveryUnicastTitle")}</p>

        <form onSubmit={handleSubmit(handleUnicast)} className="flex gap-3">
          <button
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            {loading ? t("sending") : t("unicastDiscover")}
          </button>
          <div className="flex place-items-center">
            <label className="w-1/2">{t("deviceId") + ":"}</label>
            <input {...register("deviceId")} className="input" />
          </div>
        </form>
      </div>
    </div>
  );
}
