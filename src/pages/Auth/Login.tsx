import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'; // Make sure this import exists
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/UI/Card';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const Login: React.FC = () => {
  // FIX: Specify the namespaces you need
  const { t } = useTranslation(['auth', 'common']);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');
    
    try {
      await login(data.email, data.password);
      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            IoT Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('common:welcome')} {/* Use namespace:key format */}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t('auth:login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Input
                label={t('auth:email')}
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label={t('auth:password')}
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    {...register('rememberMe')}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {t('auth:rememberMe')}
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  {t('auth:forgotPassword')}
                </Link>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                {t('auth:login')}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    {t('auth:signup')}
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;