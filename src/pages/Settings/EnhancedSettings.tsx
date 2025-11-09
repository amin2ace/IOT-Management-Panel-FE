import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { mqttService } from '../../services/mqttService';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';

// Validation schemas
const mqttSettingsSchema = z.object({
  brokerUrl: z.string().url('Invalid URL format').min(1, 'Broker URL is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().optional(),
  topics: z.array(z.string().min(1, 'Topic cannot be empty')).min(1, 'At least one topic is required'),
});

const systemSettingsSchema = z.object({
  dataRetentionDays: z.number().min(1, 'Must be at least 1 day').max(365, 'Cannot exceed 365 days'),
  updateIntervalMs: z.number().min(1000, 'Must be at least 1000ms').max(60000, 'Cannot exceed 60000ms'),
  alertThreshold: z.number().min(0, 'Must be at least 0').max(100, 'Cannot exceed 100'),
});

type MQTTSettings = z.infer<typeof mqttSettingsSchema>;
type SystemSettings = z.infer<typeof systemSettingsSchema>;

interface TestConnectionResult {
  success: boolean;
  message: string;
  status?: 'connected' | 'disconnected' | 'error';
}

const EnhancedSettings: React.FC = () => {
  const { t } = useTranslation(['settings', 'common']);

  // MQTT Settings Form
  const {
    register: registerMqtt,
    handleSubmit: handleMqttSubmit,
    formState: { errors: mqttErrors, isDirty: isMqttDirty },
    setValue: setMqttValue,
    watch: watchMqtt,
  } = useForm<MQTTSettings>({
    resolver: zodResolver(mqttSettingsSchema),
    defaultValues: {
      brokerUrl: 'mqtt://localhost:1883',
      username: 'admin',
      password: '',
      topics: ['sensors/#', 'devices/#'],
    },
  });

  // System Settings Form
  const {
    register: registerSystem,
    handleSubmit: handleSystemSubmit,
    formState: { errors: systemErrors, isDirty: isSystemDirty },
  } = useForm<SystemSettings>({
    resolver: zodResolver(systemSettingsSchema),
    defaultValues: {
      dataRetentionDays: 30,
      updateIntervalMs: 5000,
      alertThreshold: 80,
    },
  });

  const [testConnectionLoading, setTestConnectionLoading] = useState(false);
  const [testConnectionResult, setTestConnectionResult] = useState<TestConnectionResult | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // Watch MQTT topics for real-time updates
  const watchedTopics = watchMqtt('topics');

  const testConnection = async () => {
    setTestConnectionLoading(true);
    setTestConnectionResult(null);

    try {
      const status = await mqttService.getStatus();
      const result: TestConnectionResult = {
        success: status.connected,
        message: status.connected 
          ? 'Successfully connected to MQTT broker' 
          : 'Disconnected from MQTT broker',
        status: status.connected ? 'connected' : 'disconnected',
      };
      setTestConnectionResult(result);
    } catch (error) {
      const result: TestConnectionResult = {
        success: false,
        message: 'Failed to connect to MQTT broker',
        status: 'error',
      };
      setTestConnectionResult(result);
      console.error('Connection test failed:', error);
    } finally {
      setTestConnectionLoading(false);
    }
  };

  const handleSaveMqttSettings = async (data: MQTTSettings) => {
    setSaveLoading(true);
    try {
      // Here you would typically save to your backend
      console.log('Saving MQTT settings:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message or update state
    } catch (error) {
      console.error('Failed to save MQTT settings:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSaveSystemSettings = async (data: SystemSettings) => {
    setSaveLoading(true);
    try {
      // Here you would typically save to your backend
      console.log('Saving system settings:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message or update state
    } catch (error) {
      console.error('Failed to save system settings:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleTopicsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const topicsArray = e.target.value
      .split('\n')
      .map(topic => topic.trim())
      .filter(topic => topic.length > 0);
    
    setMqttValue('topics', topicsArray, { shouldDirty: true });
  };

  const getConnectionStatusColor = (status?: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/50 dark:border-green-800';
      case 'disconnected':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/50 dark:border-yellow-800';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/50 dark:border-red-800';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/50 dark:border-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* MQTT Configuration */}
      <form onSubmit={handleMqttSubmit(handleSaveMqttSettings)}>
        <Card>
          <CardHeader>
            <CardTitle>MQTT Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Connection Test Result */}
            {testConnectionResult && (
              <div className={`p-4 border rounded-lg ${getConnectionStatusColor(testConnectionResult.status)}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{testConnectionResult.message}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    testConnectionResult.status === 'connected' ? 'bg-green-500' :
                    testConnectionResult.status === 'disconnected' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Broker URL"
                type="url"
                error={mqttErrors.brokerUrl?.message}
                {...registerMqtt('brokerUrl')}
                placeholder="mqtt://localhost:1883"
              />
              
              <Input
                label= {t('common: username')}
                error={mqttErrors.username?.message}
                {...registerMqtt('username')}
                placeholder="MQTT username"
              />
              
              <Input
                label="Password"
                type="password"
                error={mqttErrors.password?.message}
                {...registerMqtt('password')}
                placeholder="MQTT password"
              />
              
              <div className="flex items-end space-x-2">
                <Button
                  type="button"
                  onClick={handleMqttSubmit(testConnection)}
                  loading={testConnectionLoading}
                  variant="outline"
                  className="flex-1"
                >
                  Test Connection
                </Button>
                
                <Button
                  type="submit"
                  loading={saveLoading}
                  disabled={!isMqttDirty}
                  className="flex-1"
                >
                  Save Settings
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topics to Monitor
                {mqttErrors.topics && (
                  <span className="text-red-500 text-sm ml-2">
                    {mqttErrors.topics.message}
                  </span>
                )}
              </label>
              <textarea
                className="input resize-none"
                rows={3}
                value={watchedTopics?.join('\n') || ''}
                onChange={handleTopicsChange}
                placeholder="Enter one topic per line&#10;Example:&#10;sensors/room1/temperature&#10;devices/room1/relay"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {watchedTopics?.length || 0} topic(s) configured
              </p>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* System Configuration */}
      <form onSubmit={handleSystemSubmit(handleSaveSystemSettings)}>
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Data Retention (days)"
                type="number"
                error={systemErrors.dataRetentionDays?.message}
                {...registerSystem('dataRetentionDays', { valueAsNumber: true })}
                min={1}
                max={365}
              />
              
              <Input
                label="Update Interval (ms)"
                type="number"
                error={systemErrors.updateIntervalMs?.message}
                {...registerSystem('updateIntervalMs', { valueAsNumber: true })}
                min={1000}
                max={60000}
                step={1000}
              />
              
              <Input
                label="Alert Threshold (%)"
                type="number"
                error={systemErrors.alertThreshold?.message}
                {...registerSystem('alertThreshold', { valueAsNumber: true })}
                min={0}
                max={100}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                loading={saveLoading}
                disabled={!isSystemDirty}
              >
                Save System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default EnhancedSettings;