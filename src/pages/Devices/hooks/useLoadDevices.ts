import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { GetAllDevicesDto } from "@/api/models/device/QueryAllDevicesDto";
import { useTranslation } from "react-i18next";
import { SensorDto } from "@/api/models/device/SensorDto";

/**
 * Hook to load devices from socket and manage device state
 * Handles socket communication and error handling
 */
export function useLoadDevices() {
  const [devices, setDevices] = useState<SensorDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useSocket();
  const { t } = useTranslation();

  useEffect(() => {
    if (!socket) return;

    setIsLoading(true);

    const listener = (res: GetAllDevicesDto) => {
      console.log({ res });
      if (!res || !res.data) {
        toast.error(t("config.getAllSensorsError"));
        setIsLoading(false);
        return;
      }
      toast.success(t("config.getAllSensorsSuccess"));
      setDevices((old) => [...old, ...res.data]);
      setIsLoading(false);
    };

    socket.emit("react/message/query/devices/all/request");
    socket.on("ws/message/query/devices/all/response", listener);

    return () => {
      socket.off("ws/message/query/devices/all/response", listener);
    };
  }, [socket, t]);

  return { devices, isLoading };
}
