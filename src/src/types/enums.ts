export enum RequestMessageCode {
  DISCOVERY = 100,
  ASSIGN_DEVICE_FUNCTION = 101,
  SENSOR_CONFIGURATION = 102,
  NETWORK_CONFIGURATION = 103,
  FIRMWARE_UPDATE = 104,
  REBOOT_COMMAND = 105,
  AUTO_DIAGNOSTIC = 106,
  OFFLINE_COMMAND_QUEUE = 107,
  STATUS = 108,
  HEARTBEAT = 109,
  HARDWARE_METRICS = 110,
  TELEMETRY_DATA = 111,
}

export enum SensorType {
  TEMPERATURE = "temperature",
  HUMIDITY = "humidity",
  PRESSURE = "pressure",
  LIGHT = "light",
  MOTION = "motion",
  CO2 = "co2",
  RELAY = "relay",
  GPS = "gps",
  AMMONIA = "ammonia",
}

export enum Protocol {
  MQTT = "MQTT",
  HTTP = "HTTP",
  MODBUS_TCP = "MODBUS_TCP",
  MODBUS_RTU = "MODBUS_RTU",
}

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export enum QoS {
  AtMostOnce = 0,
  AtLeastOnce = 1,
  ExactlyOnce = 2,
}

export enum ProvisionState {
  DISCOVERED = "discovered", // received capabilities but not assigned
  UNASSIGEND = "unassigned", // was assigned but now unassigned
  ASSIGNED = "assigned", // assigned a type, config sent
  ACTIVE = "active", // sending valid data
  ERROR = "error", // data invalid or offline
}
