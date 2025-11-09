import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webSocketService } from '../../services/websocketService';
import Button from '../../components/UI/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';
import LoadingSpinner from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { CmdParams } from '../../types';

interface Device {
  id: string;
  name: string;
  type: 'relay' | 'led' | 'motor' | 'other';
  status: 'online' | 'offline';
  lastSeen: string;
  location: string;
}

const Devices: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [command, setCommand] = useState('');
  const [parameters, setParameters] = useState('');

  const { data: devices, isLoading } = useQuery<Device[]>({
    queryKey: ['devices'],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return [
        {
          id: 'relay_01',
          name: 'Main Relay',
          type: 'relay',
          status: 'online',
          lastSeen: new Date().toISOString(),
          location: 'Room 1',
        },
        {
          id: 'led_01',
          name: 'LED Strip',
          type: 'led',
          status: 'online',
          lastSeen: new Date().toISOString(),
          location: 'Room 1',
        },
        {
          id: 'motor_01',
          name: 'Fan Motor',
          type: 'motor',
          status: 'offline',
          lastSeen: new Date(Date.now() - 3600000).toISOString(),
          location: 'Room 2',
        },
      ];
    },
  });

  const sendCommandMutation = useMutation({
    mutationFn: async ({ deviceId, command, params }: { 
      deviceId: string; 
      command: string; 
      params?: CmdParams 
    }) => {
      webSocketService.sendCommand(deviceId, command, params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });

  const handleSendCommand = (deviceId: string) => {
    if (!command) return;

    let parsedParams;
    try {
      parsedParams = parameters ? JSON.parse(parameters) : undefined;
    } catch (error) {
      alert('Invalid JSON parameters');
      console.log(error)
      return;
    }

    sendCommandMutation.mutate({
      deviceId,
      command,
      params: parsedParams,
    });

    setCommand('');
    setParameters('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" children={undefined} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('devices')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devices List */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices?.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {device.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {device.type} • {device.location}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Last seen: {new Date(device.lastSeen).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        device.status === 'online'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {device.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Command Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Device Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Device
                </label>
                <select className="input">
                  {devices?.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.name} ({device.type})
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Command"
                placeholder="e.g., toggle, set_brightness, set_speed"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Parameters (JSON)
                </label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  placeholder='{"state": "on", "brightness": 50}'
                  value={parameters}
                  onChange={(e) => setParameters(e.target.value)}
                />
              </div>

              <Button
                onClick={() => {
                  const select = document.querySelector('select');
                  if (select) handleSendCommand(select.value);
                }}
                disabled={!command}
                className="w-full"
              >
                Send Command
              </Button>

              {/* Quick Actions */}
              <div className="border-t dark:border-gray-700 pt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCommand('toggle');
                      setParameters('');
                    }}
                  >
                    Toggle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCommand('set_state');
                      setParameters('{"state": "on"}');
                    }}
                  >
                    Turn On
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCommand('set_state');
                      setParameters('{"state": "off"}');
                    }}
                  >
                    Turn Off
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCommand('get_status');
                      setParameters('');
                    }}
                  >
                    Get Status
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Devices;