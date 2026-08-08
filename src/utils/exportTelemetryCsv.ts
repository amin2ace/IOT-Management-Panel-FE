import { MetricData } from "@/pages/Telemetry";

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportTelemetryCsv(metrics: Record<string, MetricData>) {
  const rows: { metric: string; timestamp: number; value: number }[] = [];

  Object.values(metrics).forEach((m) => {
    m.values.forEach((v) => {
      rows.push({ metric: m.metric, timestamp: v.timestamp, value: v.value });
    });
  });

  rows.sort(
    (a, b) => a.timestamp - b.timestamp || a.metric.localeCompare(b.metric),
  );

  const header = ["Metric", "Timestamp", "Value"];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        escapeCsvValue(r.metric),
        escapeCsvValue(new Date(r.timestamp).toISOString()),
        escapeCsvValue(r.value),
      ].join(","),
    ),
  ];

  const csvContent = lines.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `telemetry-export-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
