import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { webSocketService } from '../../services/websocketService';
import { mqttService } from '../../services/mqttService';
import { SensorData } from '../../types';
import Button from '../../components/UI/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';

const Sensors: React.FC = () => {
  const { t } = useTranslation();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [selectedSensor, setSelectedSensor] = useState<string>('all');

  const { data: topics } = useQuery({
    queryKey: ['mqtt-topics'],
    queryFn: mqttService.getTopics,
  });

  useEffect(() => {
    webSocketService.connect();

    webSocketService.on('sensor-data', (data: SensorData) => {
      setSensorData(prev => [data, ...prev.slice(0, 49)]); // Keep last 50 readings
    });

    webSocketService.on('sensor-data-batch', (data: SensorData[]) => {
      setSensorData(data);
    });

    return () => {
      webSocketService.off('sensor-data', () => {});
      webSocketService.off('sensor-data-batch', () => {});
    };
  }, []);

  const filteredData = selectedSensor === 'all' 
    ? sensorData 
    : sensorData.filter(data => data.sensorId === selectedSensor);

  const uniqueSensors = Array.from(
    new Set(sensorData.map(data => data.sensorId))
  );

  const subscribeToSensor = (sensorId: string, topics: string[]) => {
    webSocketService.subscribeToSensor(sensorId, topics);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('sensors')}
        </h1>
        
        <div className="flex space-x-4">
          <select
            className="input w-48"
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
          >
            <option value="all">All Sensors</option>
            {uniqueSensors.map(sensorId => (
              <option key={sensorId} value={sensorId}>
                {sensorId}
              </option>
            ))}
          </select>
          
          <Button
            onClick={() => subscribeToSensor('sensor_01', ['sensors/room1/temperature/01'])}
            variant="outline"
          >
            Subscribe to Test Sensor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Sensor Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Sensor Readings</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sensor ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Value
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Quality
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr 
                        key={index} 
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                          {data.sensorId}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                          {data.sensorType}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {data.value} {data.unit}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              data.quality === 'good'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : data.quality === 'fair'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : data.quality === 'poor'
                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}
                          >
                            {data.quality}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                          {data.location}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                          {new Date(data.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No sensor data available. Sensors will appear here when data is received.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sensor Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {uniqueSensors.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unique Sensors
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sensorData.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Readings
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sensorData.filter(d => d.quality === 'good').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Good Quality Readings
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sensors;