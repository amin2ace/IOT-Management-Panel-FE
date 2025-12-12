import { LogLevel, Protocol } from "@/api";
import { MeasurementUnit } from "@/api/models/enums/MeasurementUnits";
import { z } from "zod";

// ---------------------------------------------
// Sub-schemas (recommended for DTO reusability)
// ---------------------------------------------

export const ThresholdSchema = z.object({
  high: z.number().optional(), // High threshold limit
  low: z.number().optional(), // Low threshold limit
  unit: z.enum(MeasurementUnit).optional(), // Measurement unit
});

const NetworkConfigSchema = z
  .object({
    mac: z.string().optional().default("null"),
    wifiSsid: z.string().optional().default("null"),
    wifiPassword: z.string().optional().default("null"),
    dhcp: z.boolean().optional().default(true),
    ip: z.string().optional().default("null"),
    subnetMask: z.string().optional().default("null"),
    gateway: z.string().optional().default("null"),
    dnsServer1: z.string().optional().default("null"),
    dnsServer2: z.string().optional().default("null"),
    accessPointSsid: z.string().optional().default("null"),
    accessPointPassword: z.string().optional().default("null"),
  })
  .superRefine((net, ctx) => {
    if (!net.dhcp) {
      if (!net.ip || net.ip === "null") {
        ctx.addIssue({
          code: "custom",
          path: ["ip"],
          message: "Static IP is required when DHCP is disabled",
        });
      }
      if (!net.subnetMask || net.subnetMask === "null") {
        ctx.addIssue({
          code: "custom",
          path: ["subnetMask"],
          message: "Subnet mask is required when DHCP is disabled",
        });
      }
      if (!net.gateway || net.gateway === "null") {
        ctx.addIssue({
          code: "custom",
          path: ["gateway"],
          message: "Gateway is required when DHCP is disabled",
        });
      }
    }
  });

const LoggingConfigSchema = z.object({
  level: z.enum(LogLevel).optional().default(LogLevel.ERROR),
  enableSerial: z.boolean().optional().default(true),
  buadrate: z.number().int().optional().default(1000),
  externalServer: z.string().optional().default("null"),
});

const OtaConfigSchema = z.object({
  enabled: z.boolean().optional().default(false),
  url: z.string().url().optional().default("null"),
  checkInterval: z.number().optional().default(-1),
});

const DeviceLocationSchema = z.object({
  site: z.string().optional().default("null"),
  floor: z.number().int().optional().default(-1),
  unit: z.string().optional().default("null"),
});

// ---------------------------------------------
// FINAL SENSOR CONFIG SCHEMA
// ---------------------------------------------

export const SensorConfigSchema = z.object({
  deviceId: z.string().min(1, "Device is required"),

  threshold: ThresholdSchema.optional(),

  baseTopic: z.string().optional(),

  network: NetworkConfigSchema.optional(),

  timezone: z.string().optional().default("null"),

  logging: LoggingConfigSchema.optional(),

  ota: OtaConfigSchema.optional(),

  interval: z.number().optional(),

  location: DeviceLocationSchema.optional(),

  protocol: z.enum(Protocol).optional().default(Protocol.MQTT),

  configVersion: z.number().optional(),
});

// Generate exact DTO type
export type SensorConfigDto = z.infer<typeof SensorConfigSchema>;
