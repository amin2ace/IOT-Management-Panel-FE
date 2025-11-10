import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useQuery } from '@tanstack/react-query';
import { deviceApi } from '../api/deviceApi';
import { useSocket } from '../hooks/useSocket';

export default function TelemetryChart({ deviceId }: { deviceId: string }) {
  const [series, setSeries] = useState<number[][]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const socket = useSocket({
    'device.telemetry': (payload: any) => {
      if (payload.deviceId === deviceId) {
        setSeries((s) => [...s.slice(-199), [payload.timestamp, payload.value]]);
        setTimes((t) => [...t.slice(-199), new Date(payload.timestamp).toLocaleTimeString()]);
      }
    },
  });

  // initial historical load
  useEffect(() => {
    (async () => {
      const res = await deviceApi.telemetry({ deviceId, limit: 200 });
      const points = (res.data || []).map((p: any) => [p.timestamp, p.value]);
      setSeries(points);
      setTimes(points.map((p: any) => new Date(p[0]).toLocaleTimeString()));
    })();
  }, [deviceId]);

  const option = {
    xAxis: { type: 'category', data: times },
    yAxis: { type: 'value' },
    series: [{ data: series.map((p) => p[1]), type: 'line', showSymbol: false }],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
