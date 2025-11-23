/**
 * Shows the page for discover all devices in lan
 *
 * Path ---->> "/devices/discover"
 *
 *
 */
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
import DiscoveryMethod from "@/components/DiscoveryMethod";

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

    const listener = (res: DiscoveryResponseDto) => {
      if (!res) return;
      toast.success(`Device: ${res.deviceId}`);
      setResult(res);
    };

    socket.on("ws/message/discovery/broadcast/response", listener);
    socket.on("ws/message/discovery/unicast/response", listener);

    return () => {
      socket.off("ws/message/discovery/broadcast/response", listener);
      socket.off("ws/message/discovery/unicast/response", listener);
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
    <div className="space-y-6  p-4">
      <h1 className="text-2xl font-semibold text-white">{t("discover")}</h1>

      {/* Single DiscoveryMethod component with tabs */}
      <DiscoveryMethod
        loading={loading}
        onBroadcast={handleBroadcast}
        onUnicast={handleUnicast}
        submit={handleSubmit}
        register={register}
      />

      {/* Results Table */}
      <DevicesResultTable result={result} />
    </div>
  );
}
