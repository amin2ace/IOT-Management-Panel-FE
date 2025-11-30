import { ConnectionState } from "../enums/ConnectionStateEnum";
import { DeviceCapabilities } from "./DeviceCapabilities";
import { Protocol } from "./Protocol";

export const CapabilityColorMap: Record<DeviceCapabilities | string, string> = {
  [DeviceCapabilities.TEMPERATURE]: "bg-red-600/30 text-red-300",
  [DeviceCapabilities.HUMIDITY]: "bg-blue-600/30 text-blue-300",
  [DeviceCapabilities.PRESSURE]: "bg-yellow-600/30 text-yellow-300",
  [DeviceCapabilities.LIGHT]: "bg-green-600/30 text-green-300",
  [DeviceCapabilities.MOTION]: "bg-purple-600/30 text-purple-300",
  [DeviceCapabilities.RELAY]: "bg-purple-600/30 text-purple-300",
  [DeviceCapabilities.GPS]: "bg-purple-600/30 text-purple-300",
  [DeviceCapabilities.AMMONIA]: "bg-purple-600/30 text-purple-300",

  // fallback color for unknown values
  default: "bg-gray-600/30 text-gray-300",
};

export const ProtocolColorMap: Record<Protocol | string, string> = {
  [Protocol.MQTT]: "bg-green-600/30 text-green-300",
  [Protocol.HTTP]: "bg-blue-600/30 text-blue-300",
  [Protocol.MODBUS_TCP]: "bg-purple-600/30 text-purple-300",
  [Protocol.MODBUS_RTU]: "bg-orange-600/30 text-orange-300",

  // fallback for unexpected protocol values
  default: "bg-gray-600/30 text-gray-300",
};

export const ConnectionStateColorMap: Record<ConnectionState | string, string> =
  {
    [ConnectionState.ONLINE]: "bg-green-600/30 text-green-300",
    [ConnectionState.OFFLINE]: "bg-gray-600/30 text-gray-300",
    [ConnectionState.ERROR]: "bg-red-600/30 text-red-300",

    // fallback for unexpected values
    default: "bg-white/20 text-white",
  };
