import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { deviceApi } from '../api/deviceApi';

export default function DeviceDiscoveryButton() {
  const mutation = useMutation((p: any) => deviceApi.discoverBroadcast(p));
  return (
    <button onClick={() => mutation.mutate({ requestCode: 0, isBroadcast: true, requestId: `req-${Date.now()}` })} className="px-4 py-2 rounded bg-primary-500">
      {mutation.isLoading ? 'Discovering...' : 'Discover Devices'}
    </button>
  );
}
