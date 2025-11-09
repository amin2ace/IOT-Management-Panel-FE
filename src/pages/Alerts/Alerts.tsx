/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { webSocketService } from '../../services/websocketService';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  severity: 'low' | 'medium' | 'high';
  message: string;
  sensorId?: string;
  timestamp: Date;
  acknowledged: boolean;
}

const Alerts: React.FC = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'unacknowledged'>('all');

  useEffect(() => {
    webSocketService.connect();

    webSocketService.on('system-alert', (data: any) => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: data.type || 'warning',
        severity: data.severity || 'medium',
        message: data.message,
        sensorId: data.sensorId,
        timestamp: new Date(data.timestamp),
        acknowledged: false,
      };
      
      setAlerts(prev => [newAlert, ...prev]);
    });

    return () => {
      webSocketService.off('system-alert', () => {});
    };
  }, []);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const acknowledgeAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => !alert.acknowledged);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'error':
        return '🔴';
      case 'warning':
        return '🟡';
      case 'info':
        return '🔵';
      default:
        return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('alerts')}
        </h1>
        
        <div className="flex space-x-4">
          <select
            className="input w-48"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All Alerts</option>
            <option value="unacknowledged">Unacknowledged Only</option>
          </select>
          
          <Button
            onClick={acknowledgeAll}
            disabled={alerts.every(alert => alert.acknowledged)}
            variant="outline"
          >
            Acknowledge All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start justify-between p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg mt-0.5">{getTypeIcon(alert.type)}</span>
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      {alert.sensorId && (
                        <p className="text-sm opacity-75 mt-1">
                          Sensor: {alert.sensorId}
                        </p>
                      )}
                      <p className="text-sm opacity-75 mt-1">
                        {alert.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {!alert.acknowledged && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No alerts to display. Alerts will appear here when system events occur.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {alerts.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Alerts
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">
                {alerts.filter(a => a.severity === 'high').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                High Severity
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">
                {alerts.filter(a => a.severity === 'medium').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Medium Severity
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {alerts.filter(a => a.acknowledged).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Acknowledged
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;