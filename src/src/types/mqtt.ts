import { QoS } from "./enums";

export interface MqttPublish {
  topic: string;
  message: string;
  qos: QoS;
  retain: boolean;
}

export interface MqttSubscribe {
  topic: string;
  deviceId: string;
}
