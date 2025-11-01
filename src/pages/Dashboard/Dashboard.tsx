import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { webSocketService } from '../../services/websocketService';
import { mqttService } from '../../services/mqttService';
import { SensorData, MQTTStatus } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [realTimeData, setRealTimeData] = useState<SensorData | null>(null);

  const { data: mqttStatus, isLoading: statusLoading } = useQuery<MQTTStatus>({
    queryKey: ['mqtt-status'],
    queryFn: mqttService.getStatus,
    refetchInterval: 10000,
  });

  useEffect(() => {
    // Connect to WebSocket
    webSocketService.connect();

    // Listen for real-time sensor data
    webSocketService.on('sensor-data', (data: SensorData) => {
      setRealTimeData(data);
      setSensorData(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 readings
    });

    // Listen for batch data
    webSocketService.on('sensor-data-batch', (data: SensorData[]) => {
      setSensorData(data);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const metrics = [
    {
      title: 'Connected Devices',
      value: mqttStatus?.connected ? 'Online' : 'Offline',
      status: mqttStatus?.connected ? 'success' : 'error',
    },
    {
      title: 'Active Sensors',
      value: sensorData.length.toString(),
      status: 'info',
    },
    {
      title: 'System Status',
      value: mqttStatus?.connected ? 'Healthy' : 'Disconnected',
      status: mqttStatus?.connected ? 'success' : 'error',
    },
    {
      title: 'Active Alerts',
      value: '0',
      status: 'info',
    },
  ];

  if (statusLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard')}
        </h1>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                    {metric.value}
                  </p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    metric.status === 'success'
                      ? 'bg-green-500'
                      : metric.status === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Sensor Data</CardTitle>
          </CardHeader>
          <CardContent>
            {realTimeData ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Sensor ID:</span>
                  <span className="font-medium">{realTimeData.sensorId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="font-medium">{realTimeData.sensorType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Value:</span>
                  <span className="font-medium">
                    {realTimeData.value} {realTimeData.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                  <span
                    className={`font-medium ${
                      realTimeData.quality === 'good'
                        ? 'text-green-500'
                        : realTimeData.quality === 'fair'
                        ? 'text-yellow-500'
                        : realTimeData.quality === 'poor'
                        ? 'text-orange-500'
                        : 'text-red-500'
                    }`}
                  >
                    {realTimeData.quality}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <span className="font-medium">{realTimeData.location}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Waiting for sensor data...
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Readings</CardTitle>
          </CardHeader>
          <CardContent>
            {sensorData.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {sensorData.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{data.sensorId}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {data.sensorType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {data.value} {data.unit}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(data.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No sensor data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* MQTT Status */}
      <Card>
        <CardHeader>
          <CardTitle>MQTT Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p
                className={`text-lg font-semibold ${
                  mqttStatus?.connected
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {mqttStatus?.connected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Broker</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {mqttStatus?.brokerUrl || 'Unknown'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Subscribed Topics</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {mqttStatus?.subscribedTopics?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Activity</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {mqttStatus?.lastActivity
                  ? new Date(mqttStatus.lastActivity).toLocaleString()
                  : 'Never'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;