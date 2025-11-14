/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NetworkConfigDto = {
  /**
   * WiFi SSID
   */
  wifiSsid?: string;
  /**
   * WiFi Password
   */
  wifiPassword?: string;
  /**
   * DHCP server address
   */
  dhcp?: boolean;
  /**
   * Device IP address if dhcp disabled
   */
  ip?: string;
  /**
   * Subnet Mask
   */
  subnetMask?: string;
  /**
   * gateway address
   */
  gateway?: string;
  /**
   * Primary dns server address
   */
  dnsServer1?: string;
  /**
   * Secondary dns server address
   */
  dnsServer2?: string;
};
