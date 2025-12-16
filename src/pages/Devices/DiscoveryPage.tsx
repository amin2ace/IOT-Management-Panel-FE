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
import { DiscoveryResponseDto } from "@/api/models/device/ResponseDiscoveryDto";
import DevicesResultTable from "@/components/DiscoveryResultsTable";
import DiscoveryMethod from "@/components/DiscoveryMethod";
import { useDiscoveryStore } from "@/hooks/useDiscoveryStore";

export default function DiscoveryPage() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  // const [result, setResult] = useState<DiscoveryResponseDto>();
  const { devices, addDevice, clear } = useDiscoveryStore();

  // Whenever new discovery result comes from API:

  // -------------------------------
  // Listen for incoming discovery responses
  // -------------------------------
  useEffect(() => {
    if (!socket) return;
    const listener = (res: DiscoveryResponseDto) => {
      if (!res || !res.responseId) {
        toast.error(t("discovery.failedToSendDiscovery"));
        return;
      }
      toast.success(`${t("discovery.device")}: ${res.sensorData?.deviceId}`);
      addDevice(res);
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
    //Clear the devices list discovered
    clear();
    setLoading(true);
    const payload: DiscoveryRequestDto = {
      userId: user?.userId || "null",
      timestamp: Date.now(),
      deviceId: data.deviceId,
    };

    try {
      socket?.emit("react/message/discovery/unicast/request", payload);
      toast.success(t("discovery.UnicastSent"));
    } catch {
      toast.error(t("discovery.failedToSendDiscovery"));
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Broadcast
  // -------------------------------
  const handleBroadcast = async () => {
    //Clear the devices list discovered
    clear();
    setLoading(true);
    const payload: DiscoveryRequestDto = {
      userId: user?.userId || "null",
      timestamp: Date.now(),
    };

    try {
      socket?.emit("react/message/discovery/broadcast/request", payload);
      toast.success(t("discovery.broadcastSent"));
    } catch {
      toast.error(t("discovery.failedToSendDiscovery"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-10 sm:px-12 md:px-1 w-full h-full space-y-4">
      <h1 className="text-2xl font-semibold">{t("discovery.discover")}</h1>

      {/* Single DiscoveryMethod component with tabs */}
      <DiscoveryMethod
        loading={loading}
        onBroadcast={handleBroadcast}
        onUnicast={handleUnicast}
        submit={handleSubmit}
        register={register}
      />

      {/* Results Table */}
      <DevicesResultTable devices={devices} />
    </div>
  );
}
