import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ThemeToggle from '../../components/ThemeToggle';

const profileSchema = z.object({
  userName: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { theme } = useTheme();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: user?.userName || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log('Profile update:', data);
    // Implement profile update logic
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log('Password change:', data);
    // Implement password change logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('settings')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <Input
                label="Username"
                {...profileForm.register('userName')}
                error={profileForm.formState.errors.userName?.message}
              />
              
              <Input
                label="Email"
                type="email"
                {...profileForm.register('email')}
                error={profileForm.formState.errors.email?.message}
              />
              
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                {...passwordForm.register('currentPassword')}
                error={passwordForm.formState.errors.currentPassword?.message}
              />
              
              <Input
                label="New Password"
                type="password"
                {...passwordForm.register('newPassword')}
                error={passwordForm.formState.errors.newPassword?.message}
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                {...passwordForm.register('confirmPassword')}
                error={passwordForm.formState.errors.confirmPassword?.message}
              />
              
              <Button type="submit" className="w-full">
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current: {theme === 'light' ? 'Light' : 'Dark'}
                  </p>
                </div>
                <ThemeToggle />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Language</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose your preferred language
                  </p>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">App Version:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">API Base URL:</span>
                <span className="font-medium">{import.meta.env.VITE_API_BASE_URL}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">WebSocket URL:</span>
                <span className="font-medium">{import.meta.env.VITE_WS_URL}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Environment:</span>
                <span className="font-medium">{import.meta.env.MODE}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MQTT Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>MQTT Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Broker URL"
              defaultValue="mqtt://localhost:1883"
              disabled
            />
            <Input
              label="Username"
              defaultValue="admin"
              disabled
            />
            <Input
              label="Password"
              type="password"
              defaultValue="password"
              disabled
            />
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Test Connection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;