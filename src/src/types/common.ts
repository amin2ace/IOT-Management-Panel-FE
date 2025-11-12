export interface DeviceLocation {
  site?: string;
  floor?: number;
  unit?: string;
}

export interface NetworkConfig {
  wifiSsid: string;
  wifiPassword: string;
  dhcp: boolean;
  ip?: string;
  subnetMask?: string;
  gateway?: string;
  dnsServer1?: string;
  dnsServer2?: string;
}

export interface LoggingConfig {
  level: string; // LogLevel
  enableSerial: boolean;
  buadrate?: number;
  externalServer?: string;
}

export interface OtaConfig {
  enabled: boolean;
  url?: string;
}

export interface Filter {
  subnet?: string;
  hardware?: string[];
}
