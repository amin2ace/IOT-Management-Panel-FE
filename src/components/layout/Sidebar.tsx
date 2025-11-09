import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  HomeIcon, 
  DeviceTabletIcon, 
  BellIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
// Add missing SensorIcon

const SensorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);


const navigation = [
  { name: 'dashboard', href: '/', icon: HomeIcon },
  { name: 'devices', href: '/devices', icon: DeviceTabletIcon },
  { name: 'sensors', href: '/sensors', icon: SensorIcon },
  { name: 'alerts', href: '/alerts', icon: BellIcon },
  { name: 'settings', href: '/settings', icon: CogIcon },
];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-primary-500">
          <h1 className="text-xl font-bold text-white">
            IoT Dashboard
          </h1>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200',
                      isActive
                        ? 'text-primary-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {t(item.name)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;