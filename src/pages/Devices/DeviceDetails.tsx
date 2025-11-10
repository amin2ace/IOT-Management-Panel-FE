import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { deviceApi } from '../../api/deviceApi';
import TelemetryChart from '../../components/TelemetryChart';

export default function DeviceDetails() {
  const { id } = useParams();
  const { data } = useQuery(['device', id], () => deviceApi.getAll()); // replace with get by id API
  return (
    <div className="p-6">
      <h2>Device {id}</h2>
      <div className="mt-4">
        <TelemetryChart deviceId={String(id)} />
      </div>
    </div>
  );
}
