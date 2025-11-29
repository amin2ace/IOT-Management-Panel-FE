import React, { useState, useRef, useEffect, useMemo } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

// interface TimezoneFormData {
//   timezone?: string;
// }

interface TimezoneSelectProps {
  register: UseFormRegister<anu>;
  setValue?: UseFormSetValue<any>;
}

interface TimezoneOption {
  value: string;
  label: string;
  searchText: string;
  group: string;
}

export default function TimezoneSelect({
  register,
  setValue,
}: TimezoneSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Timezone data with enhanced search capabilities
  const timezoneOptions: TimezoneOption[] = useMemo(
    () => [
      // North America
      {
        value: "America/Anchorage",
        label: "(UTC-09:00) Alaska",
        searchText: "alaska anchorage",
        group: "North America",
      },
      {
        value: "America/Los_Angeles",
        label: "(UTC-08:00) Pacific Time",
        searchText: "pacific los angeles california san francisco seattle",
        group: "North America",
      },
      {
        value: "America/Denver",
        label: "(UTC-07:00) Mountain Time",
        searchText: "mountain denver colorado phoenix salt lake city",
        group: "North America",
      },
      {
        value: "America/Chicago",
        label: "(UTC-06:00) Central Time",
        searchText: "central chicago dallas houston",
        group: "North America",
      },
      {
        value: "America/New_York",
        label: "(UTC-05:00) Eastern Time",
        searchText: "eastern new york miami atlanta washington",
        group: "North America",
      },
      {
        value: "America/Toronto",
        label: "(UTC-05:00) Toronto",
        searchText: "toronto canada",
        group: "North America",
      },

      // Europe
      {
        value: "Europe/London",
        label: "(UTC+00:00) London",
        searchText: "london uk britain",
        group: "Europe",
      },
      {
        value: "Europe/Paris",
        label: "(UTC+01:00) Paris",
        searchText: "paris france",
        group: "Europe",
      },
      {
        value: "Europe/Berlin",
        label: "(UTC+01:00) Berlin",
        searchText: "berlin germany",
        group: "Europe",
      },
      {
        value: "Europe/Rome",
        label: "(UTC+01:00) Rome",
        searchText: "rome italy",
        group: "Europe",
      },
      {
        value: "Europe/Madrid",
        label: "(UTC+01:00) Madrid",
        searchText: "madrid spain",
        group: "Europe",
      },
      {
        value: "Europe/Athens",
        label: "(UTC+02:00) Athens",
        searchText: "athens greece",
        group: "Europe",
      },
      {
        value: "Europe/Istanbul",
        label: "(UTC+03:00) Istanbul",
        searchText: "istanbul turkey",
        group: "Europe",
      },
      {
        value: "Europe/Moscow",
        label: "(UTC+03:00) Moscow",
        searchText: "moscow russia",
        group: "Europe",
      },

      // Middle East & Asia
      {
        value: "Asia/Dubai",
        label: "(UTC+04:00) Dubai",
        searchText: "dubai uae",
        group: "Middle East",
      },
      {
        value: "Asia/Tehran",
        label: "(UTC+03:30) Tehran",
        searchText: "tehran iran",
        group: "Middle East",
      },
      {
        value: "Asia/Baghdad",
        label: "(UTC+03:00) Baghdad",
        searchText: "baghdad iraq",
        group: "Middle East",
      },
      {
        value: "Asia/Riyadh",
        label: "(UTC+03:00) Riyadh",
        searchText: "riyadh saudi arabia",
        group: "Middle East",
      },
      {
        value: "Asia/Karachi",
        label: "(UTC+05:00) Karachi",
        searchText: "karachi pakistan",
        group: "Asia",
      },
      {
        value: "Asia/Kolkata",
        label: "(UTC+05:30) India",
        searchText: "kolkata india mumbai delhi bangalore",
        group: "Asia",
      },
      {
        value: "Asia/Bangkok",
        label: "(UTC+07:00) Bangkok",
        searchText: "bangkok thailand",
        group: "Asia",
      },
      {
        value: "Asia/Singapore",
        label: "(UTC+08:00) Singapore",
        searchText: "singapore",
        group: "Asia",
      },
      {
        value: "Asia/Shanghai",
        label: "(UTC+08:00) Beijing",
        searchText: "shanghai beijing china",
        group: "Asia",
      },
      {
        value: "Asia/Tokyo",
        label: "(UTC+09:00) Tokyo",
        searchText: "tokyo japan osaka",
        group: "Asia",
      },
      {
        value: "Asia/Seoul",
        label: "(UTC+09:00) Seoul",
        searchText: "seoul korea",
        group: "Asia",
      },

      // Oceania
      {
        value: "Australia/Sydney",
        label: "(UTC+10:00) Sydney",
        searchText: "sydney australia melbourne",
        group: "Oceania",
      },

      // Africa
      {
        value: "Africa/Cairo",
        label: "(UTC+02:00) Cairo",
        searchText: "cairo egypt",
        group: "Africa",
      },
      {
        value: "Africa/Johannesburg",
        label: "(UTC+02:00) Johannesburg",
        searchText: "johannesburg south africa",
        group: "Africa",
      },
    ],
    []
  );

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return timezoneOptions;

    const query = searchQuery.toLowerCase();
    return timezoneOptions.filter(
      (option) =>
        option.searchText.toLowerCase().includes(query) ||
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
    );
  }, [searchQuery, timezoneOptions]);

  // Group filtered options
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: TimezoneOption[] } = {};
    filteredOptions.forEach((option) => {
      if (!groups[option.group]) {
        groups[option.group] = [];
      }
      groups[option.group].push(option);
    });
    return groups;
  }, [filteredOptions]);

  // Get selected timezone label
  const selectedTimezone = timezoneOptions.find(
    (opt) => opt.value === selectRef.current?.value
  );
  const displayValue =
    searchQuery || selectedTimezone?.label || "Search timezones...";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(0);
    setIsOpen(true);
  };

  const handleOptionSelect = (value: string) => {
    if (setValue) {
      setValue("timezone", value);
    }
    setSearchQuery("");
    setIsOpen(false);

    // Update the hidden select element
    if (selectRef.current) {
      selectRef.current.value = value;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex].value);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchQuery("");
        break;
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    // Clear the input to show placeholder when focused (optional)
    // setSearchQuery('');
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding to allow for click events
    setTimeout(() => setIsOpen(false), 200);
    console.log({ event: e });
  };

  const handleInputClick = () => {
    setIsOpen(true);
    setSearchQuery("");
  };

  useEffect(() => {
    // Auto-detect timezone on mount
    if (setValue && !selectRef.current?.value) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setValue("timezone", userTimezone);
    }
  }, [setValue]);

  return (
    <div className="relative">
      <label className="config-label">Timezone</label>

      {/* Hidden select for react-hook-form */}
      <select {...register("timezone")} ref={selectRef} className="hidden">
        {timezoneOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom searchable dropdown */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleInputClick}
          className={`config-select pr-10 cursor-pointer ${
            !searchQuery && selectedTimezone
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        />

        {/* Dropdown indicator */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          ⌄
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 dark:text-gray-400">
                No timezones found for "{searchQuery}"
              </div>
            ) : (
              Object.entries(groupedOptions).map(([group, options]) => (
                <div key={group}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 uppercase tracking-wide">
                    {group}
                  </div>
                  {options.map((option, index) => {
                    const absoluteIndex = filteredOptions.findIndex(
                      (opt) => opt.value === option.value
                    );
                    return (
                      <button
                        key={`${option.value}${index}`}
                        type="button"
                        className={`w-full text-left px-3 py-2 text-sm ${
                          absoluteIndex === highlightedIndex
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                            : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        } ${
                          option.value === selectRef.current?.value
                            ? "font-semibold bg-green-50 dark:bg-green-900/20"
                            : ""
                        }`}
                        onClick={() => handleOptionSelect(option.value)}
                        onMouseEnter={() => setHighlightedIndex(absoluteIndex)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
