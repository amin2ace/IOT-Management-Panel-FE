// src/hooks/useAssignDevice.ts
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useSocket } from "@/hooks/useSocket";
import { SensorFunctionalityRequestDto } from "@/api";
import { RequestMessageCode } from "@/api/models/enums/MessageCodeEnum";
import { useProvisionDevice } from "@/hooks/useDevices";
import { useAuth } from "@/context/AuthContext";
import { DeviceEditState } from "@/pages";
import { ResponseGetDevice } from "@/api/models/device/GetSensorResponseDto";

export function useAssignDevice() {
  const { t } = useTranslation();
  const { socket } = useSocket();
  const { user } = useAuth();
  const provisionMutation = useProvisionDevice();
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssign = async (
    device: ResponseGetDevice,
    model: DeviceEditState
  ) => {
    if (!socket) {
      toast.error(t("socke.notConnected"));
      return;
    }

    if (!model || model.functionality.length === 0) {
      toast.error(t("assign.functionalityNotSelected"));
      return;
    }

    setIsAssigning(true);

    const payload: SensorFunctionalityRequestDto = {
      userId: user?.userId ?? "null",
      requestId: `req-fn-${crypto.randomUUID()}`,
      requestCode: RequestMessageCode.ASSIGN_DEVICE_FUNCTION,
      deviceId: device.deviceId,
      timestamp: Date.now(),
      functionality: model.functionality,
      publishTopic: model.publishTopic,
      interval: model.interval,
      highSetPoint: JSON.stringify({ high: model.highSetPoint }),
      lowSetPoint: JSON.stringify({ low: model.lowSetPoint }),
      ackRequired: true,
      signature: "client-signature",
    };

    try {
      socket.emit("react/message/device/function/assign/request", payload);
      await provisionMutation.mutateAsync(payload);
      toast.success(t("assign.requestSent"));
    } catch (err) {
      console.error(err);
      toast.error(t("assign.requestFailed"));
    } finally {
      setIsAssigning(false);
    }
  };

  return {
    handleAssign,
    isAssigning,
  };
}
