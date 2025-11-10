import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { deviceApi } from '../../api/deviceApi';
import { Link } from 'react-router-dom';

export default function DevicesList() {
  const { data, isLoading } = useQuery(['devices'], deviceApi.getAll);

  if (isLoading) return <div>Loading...</div>;

  const devices = data?.data || [];

  return (
    <div className="grid grid-cols-3 gap-4">
      {devices.map((d: any) => (
        <Link to={`/devices/${d.deviceId}`} key={d.deviceId} className="p-4 bg-white/5 rounded">
          <h3 className="text-lg">{d.name || d.deviceId}</h3>
          <p>{d.assignedType || 'unassigned'}</p>
        </Link>
      ))}
    </div>
  );
}
