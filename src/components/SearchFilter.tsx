import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from './UI/Input';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Record<string, string>) => void;
  filters: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter, filters }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder={t('search') || "Search..."}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        {filters.map(filter => (
          <select
            key={filter}
            className="input"
            onChange={(e) => onFilter({ [filter]: e.target.value })}
          >
            <option value="">All {filter}</option>
            {/* Options would be populated dynamically */}
          </select>
        ))}
        
        <select className="input" onChange={(e) => onFilter({ timeRange: e.target.value })}>
          <option value="realtime">Real-time</option>
          <option value="1h">1 Hour</option>
          <option value="24h">24 Hours</option>
          <option value="7d">7 Days</option>
          <option value="30d">30 Days</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;