// src/pages/Telemetry/TelemetryPage.tsx
import React, { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket"; // implement socket hook that connects to your gateway
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface MetricData {
  metric: string;
  values: { timestamp: number; value: number }[];
}

export default function TelemetryPage() {
  const { socket, isConnected } = useSocket();
  const [metrics, setMetrics] = useState<Record<string, MetricData>>({});

  useEffect(() => {
    if (!socket) return;
    const handler = (data: TelemetryResponse) => {
      setMetrics((prev) => {
        const existing = prev[data.metric] ?? {
          metric: data.metric,
          values: [],
        };
        const vals = [
          ...existing.values,
          { timestamp: data.timestamp, value: data.value },
        ].slice(-30);
        return {
          ...prev,
          [data.metric]: { metric: data.metric, values: vals },
        };
      });
    };

    socket.on("telemetry-update", handler);
    return () => {
      socket.off("telemetry-update", handler);
    };
  }, [socket]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Telemetry</h1>
        <div
          className={`px-3 py-1 rounded ${isConnected ? "bg-green-700" : "bg-red-700"}`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(metrics).map((m) => (
          <div
            key={m.metric}
            className="p-4 bg-white/5 rounded-lg backdrop-blur-md"
          >
            <h3 className="text-lg font-semibold capitalize">{m.metric}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={m.values}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip />
                <Line dataKey="value" stroke="#818cf8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-sm text-gray-300">
              Latest: {m.values.at(-1)?.value ?? "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
