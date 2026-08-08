import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/context/AuthContext";
import { DiscoveryRequestDto } from "@/api";
import { useTranslation } from "react-i18next";
import { DiscoveryResponseDto } from "@/api/models/device/ResponseDiscoveryDto";
import DevicesResultTable from "@/components/DiscoveryPage/DiscoveryResultsTable";
import DiscoveryMethod from "@/components/DiscoveryPage/DiscoveryMethod";
import { useDiscoveryStore } from "@/hooks/useDiscoveryStore";

// Broadcast has no definitive "done" signal from the server — multiple devices
// can respond over time — so we keep the UI in a "scanning" state for a fixed
// window instead. Unicast expects exactly one device, so it also stops early
// as soon as a response arrives.
const BROADCAST_WINDOW_MS = 6000;
const UNICAST_TIMEOUT_MS = 8000;

export default function DiscoveryPage() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { devices, addDevice, clear } = useDiscoveryStore();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const modeRef = useRef<"broadcast" | "unicast" | null>(null);

  useEffect(() => {
    if (!socket) return;
    const listener = (res: DiscoveryResponseDto) => {
      if (!res || !res.responseId) {
        toast.error(t("discovery.failedToSendDiscovery"));
        return;
      }
      toast.success(`${t("discovery.device")}: ${res.sensorData?.deviceId}`);
      addDevice(res);

      if (modeRef.current === "unicast") {
        clearTimeout(timeoutRef.current);
        setLoading(false);
      }
    };

    socket.on("ws/message/discovery/broadcast/response", listener);
    socket.on("ws/message/discovery/unicast/response", listener);

    return () => {
      socket.off("ws/message/discovery/broadcast/response", listener);
      socket.off("ws/message/discovery/unicast/response", listener);
    };
  }, [socket]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const schema = z.object({
    deviceId: z.string().min(1, "Device ID is required"),
  });

  const method = useForm({ resolver: zodResolver(schema) });
  const { handleSubmit, register } = method;

  const handleUnicast = async (data: z.infer<typeof schema>) => {
    clear();
    clearTimeout(timeoutRef.current);
    modeRef.current = "unicast";
    setLoading(true);

    const payload: DiscoveryRequestDto = {
      userId: user?.userId || "null",
      timestamp: Date.now(),
      deviceId: data.deviceId,
    };

    try {
      socket?.emit("react/message/discovery/unicast/request", payload);
      toast.success(t("discovery.unicastSent"));
      timeoutRef.current = setTimeout(
        () => setLoading(false),
        UNICAST_TIMEOUT_MS,
      );
    } catch {
      toast.error(t("discovery.failedToSendDiscovery"));
      setLoading(false);
    }
  };

  const handleBroadcast = async () => {
    clear();
    clearTimeout(timeoutRef.current);
    modeRef.current = "broadcast";
    setLoading(true);

    const payload: DiscoveryRequestDto = {
      userId: user?.userId || "null",
      timestamp: Date.now(),
    };

    try {
      socket?.emit("react/message/discovery/broadcast/request", payload);
      toast.success(t("discovery.broadcastSent"));
      timeoutRef.current = setTimeout(
        () => setLoading(false),
        BROADCAST_WINDOW_MS,
      );
    } catch {
      toast.error(t("discovery.failedToSendDiscovery"));
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {t("discovery.discover")}
      </h1>

      <DiscoveryMethod
        loading={loading}
        onBroadcast={handleBroadcast}
        onUnicast={handleUnicast}
        submit={handleSubmit}
        register={register}
      />

      <DevicesResultTable
        devices={devices}
        onClear={clear}
        isDiscovering={loading}
      />
    </div>
  );
}
