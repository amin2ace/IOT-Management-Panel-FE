import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { cn } from '../utils/cn';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    document.documentElement.dir = languageCode === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode;
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:block">{currentLanguage.nativeName}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {languages.map((language) => (
            <MenuItem key={language.code}>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage(language.code)}
                  className={cn(
                    active ? 'bg-gray-100 dark:bg-gray-700' : '',
                    'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                  )}
                >
                  <span className="mr-3">{language.flag}</span>
                  <span>{language.nativeName}</span>
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default LanguageSwitcher;