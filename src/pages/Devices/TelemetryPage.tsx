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
import { ResponseTelemetryDto } from "@/api/models/device/ResponseTelemetryDto";
import "@/styles/pages/telemetry.css";

interface MetricData {
  metric: string;
  values: { timestamp: number; value: number }[];
}

// Component: Sensor Telemetry Page 'READ_ONLY'
export default function TelemetryPage() {
  const { socket, isConnected } = useSocket();
  const [metrics, setMetrics] = useState<Map<string, MetricData>>(new Map());

  useEffect(() => {
    if (!socket) return;

    socket.on("telemetry-update", (data: ResponseTelemetryDto) => {
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
    <div className="telemetryPageContainer">
      <header className="telemetry-header">
        <h1>Live Telemetry Dashboard</h1>
        <div
          className={`telemetry-status-badge ${
            isConnected
              ? "telemetry-status-connected"
              : "telemetry-status-disconnected"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </header>

      <div className="telemetry-grid">
        {Array.from(metrics.values()).map((metric) => (
          <motion.div
            key={metric.metric}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="telemetry-card"
          >
            <h3 className="telemetry-card-title">{metric.metric}</h3>

            <div className="telemetry-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metric.values}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="telemetry-chart-grid"
                  />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(ts) =>
                      new Date(ts).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    }
                    className="telemetry-chart-axis"
                    fontSize={10}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    className="telemetry-chart-axis"
                    fontSize={10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(31, 41, 55, 0.95)",
                      borderRadius: "8px",
                      border: "1px solid rgba(107, 114, 128, 0.3)",
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    className="telemetry-chart-line"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="telemetry-card-stats">
              <div className="telemetry-stat-item">
                <span className="telemetry-stat-label">Latest Value</span>
                <span className="telemetry-stat-value">
                  {metric.values.at(-1)?.value ?? "--"}
                </span>
              </div>
              <div className="telemetry-stat-item">
                <span className="telemetry-stat-label">Last Update</span>
                <span className="telemetry-stat-value">
                  {new Date(
                    metric.values.at(-1)?.timestamp ?? 0
                  ).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {metrics.size === 0 && (
        <div className="telemetry-empty-state">
          <p className="telemetry-empty-message">No Telemetry Data</p>
          <p className="telemetry-empty-description">
            Waiting for telemetry updates from connected devices...
          </p>
        </div>
      )}
    </div>
  );
}
