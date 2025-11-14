import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { TelemetryResponseDto } from "@/api/models/TelemetryResponseDto";

interface MetricData {
  metric: string;
  values: { timestamp: number; value: number }[];
}

export default function TelemetryPage() {
  const { socket, isConnected } = useSocket();
  const [metrics, setMetrics] = useState<Map<string, MetricData>>(new Map());

  useEffect(() => {
    if (!socket) return;

    socket.on("telemetry-update", (data: TelemetryResponseDto) => {
      setMetrics((prev) => {
        const updated = new Map(prev);
        const metric = updated.get(data.metric) || {
          metric: data.metric,
          values: [],
        };

        const updatedValues = [
          ...metric.values,
          { timestamp: data.timestamp, value: data.value },
        ].slice(-20); // keep last 20 readings

        updated.set(data.metric, {
          metric: data.metric,
          values: updatedValues,
        });
        return updated;
      });
    });

    return () => {
      socket.off("telemetry-update");
    };
  }, [socket]);

  return (
    <div className="p-6 min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-wide">
          📊 Live Telemetry Dashboard
        </h2>
        <div
          className={`px-3 py-1 rounded-full text-sm ${
            isConnected
              ? "bg-green-600/30 text-green-400"
              : "bg-red-600/30 text-red-400"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from(metrics.values()).map((metric) => (
          <motion.div
            key={metric.metric}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-5 hover:shadow-indigo-500/20 transition"
          >
            <h3 className="text-lg font-semibold mb-3 capitalize text-indigo-300">
              {metric.metric}
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={metric.values}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(ts) =>
                    new Date(ts).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }
                  stroke="#888"
                  fontSize={10}
                />
                <YAxis domain={["auto", "auto"]} stroke="#888" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "none",
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#818cf8"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="flex justify-between mt-3 text-sm text-gray-400">
              <span>Latest: {metric.values.at(-1)?.value ?? "--"}</span>
              <span>
                {new Date(
                  metric.values.at(-1)?.timestamp ?? 0
                ).toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
