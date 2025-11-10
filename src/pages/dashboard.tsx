import React from 'react';
import DevicesList from './Devices/DevicesList';
import DeviceDiscoveryButton from '../components/DeviceDiscoveryButton';
import { useSocket } from '../hooks/useSocket';
import { useQueryClient } from '@tanstack/react-query';

export default function Dashboard() {
  const qc = useQueryClient();

  useSocket({
    'device.discovered': (payload) => qc.invalidateQueries(['devices']),
    'device.updated': (payload) => qc.invalidateQueries(['devices']),
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Dashboard</h2>
        <DeviceDiscoveryButton />
      </div>
      <DevicesList />
    </div>
  );
}
