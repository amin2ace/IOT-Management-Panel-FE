import { useState, useRef, useEffect, useMemo, useId } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, ChevronDown, Check } from "lucide-react";

interface TimezoneSelectProps {
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
}

interface TimezoneOption {
  value: string;
  label: string;
  searchText: string;
  group: string;
  groupKey: string;
}

const TIMEZONE_OPTIONS: TimezoneOption[] = [
  // North America
  {
    value: "America/Anchorage",
    label: "(UTC-09:00) Alaska",
    searchText: "alaska anchorage",
    group: "North America",
    groupKey: "northAmerica",
  },
  {
    value: "America/Los_Angeles",
    label: "(UTC-08:00) Pacific Time",
    searchText: "pacific los angeles california san francisco seattle",
    group: "North America",
    groupKey: "northAmerica",
  },
  {
    value: "America/Denver",
    label: "(UTC-07:00) Mountain Time",
    searchText: "mountain denver colorado phoenix salt lake city",
    group: "North America",
    groupKey: "northAmerica",
  },
  {
    value: "America/Chicago",
    label: "(UTC-06:00) Central Time",
    searchText: "central chicago dallas houston",
    group: "North America",
    groupKey: "northAmerica",
  },
  {
    value: "America/New_York",
    label: "(UTC-05:00) Eastern Time",
    searchText: "eastern new york miami atlanta washington",
    group: "North America",
    groupKey: "northAmerica",
  },
  {
    value: "America/Toronto",
    label: "(UTC-05:00) Toronto",
    searchText: "toronto canada",
    group: "North America",
    groupKey: "northAmerica",
  },
  // Europe
  {
    value: "Europe/London",
    label: "(UTC+00:00) London",
    searchText: "london uk britain",
    group: "Europe",
    groupKey: "europe",
  },
  {
    value: "Europe/Paris",
    label: "(UTC+01:00) Paris",
    searchText: "paris france",
    group: "Europe",
    groupKey: "europe",
  },
  {
    value: "Europe/Berlin",
    label: "(UTC+01:00) Berlin",
    searchText: "berlin germany",
    group: "Europe",
    groupKey: "europe",
  },
  {
    value: "Europe/Rome",
    label: "(UTC+01:00) Rome",
    searchText: "rome italy",
    group: "Europe",
    groupKey: "europe",
  },
  {
    value: "Europe/Madrid",
    label: "(UTC+01:00) Madrid",
    searchText: "madrid spain",
    group: "Europe",
    groupKey: "europe",
  },
  {
    value: "Europe/Athens",
    label: "(UTC+02:00) Athens",
    searchText: "athens greece",
    group: "Europe",
    groupKey: "europe",
  },
  {
    value: "Europe/Istanbul",
    label: "(UTC+03:00) Istanbul",
    searchText: "istanbul turkey",
    group: "Europe",
    groupKey: "europe",
  },
  {
    value: "Europe/Moscow",
    label: "(UTC+03:00) Moscow",
    searchText: "moscow russia",
    group: "Europe",
    groupKey: "europe",
  },
  // Middle East
  {
    value: "Asia/Dubai",
    label: "(UTC+04:00) Dubai",
    searchText: "dubai uae",
    group: "Middle East",
    groupKey: "middleEast",
  },
  {
    value: "Asia/Tehran",
    label: "(UTC+03:30) Tehran",
    searchText: "tehran iran",
    group: "Middle East",
    groupKey: "middleEast",
  },
  {
    value: "Asia/Baghdad",
    label: "(UTC+03:00) Baghdad",
    searchText: "baghdad iraq",
    group: "Middle East",
    groupKey: "middleEast",
  },
  {
    value: "Asia/Riyadh",
    label: "(UTC+03:00) Riyadh",
    searchText: "riyadh saudi arabia",
    group: "Middle East",
    groupKey: "middleEast",
  },
  // Asia
  {
    value: "Asia/Karachi",
    label: "(UTC+05:00) Karachi",
    searchText: "karachi pakistan",
    group: "Asia",
    groupKey: "asia",
  },
  {
    value: "Asia/Kolkata",
    label: "(UTC+05:30) India",
    searchText: "kolkata india mumbai delhi bangalore",
    group: "Asia",
    groupKey: "asia",
  },
  {
    value: "Asia/Bangkok",
    label: "(UTC+07:00) Bangkok",
    searchText: "bangkok thailand",
    group: "Asia",
    groupKey: "asia",
  },
  {
    value: "Asia/Singapore",
    label: "(UTC+08:00) Singapore",
    searchText: "singapore",
    group: "Asia",
    groupKey: "asia",
  },
  {
    value: "Asia/Shanghai",
    label: "(UTC+08:00) Beijing",
    searchText: "shanghai beijing china",
    group: "Asia",
    groupKey: "asia",
  },
  {
    value: "Asia/Tokyo",
    label: "(UTC+09:00) Tokyo",
    searchText: "tokyo japan osaka",
    group: "Asia",
    groupKey: "asia",
  },
  {
    value: "Asia/Seoul",
    label: "(UTC+09:00) Seoul",
    searchText: "seoul korea",
    group: "Asia",
    groupKey: "asia",
  },
  // Oceania
  {
    value: "Australia/Sydney",
    label: "(UTC+10:00) Sydney",
    searchText: "sydney australia melbourne",
    group: "Oceania",
    groupKey: "oceania",
  },
  // Africa
  {
    value: "Africa/Cairo",
    label: "(UTC+02:00) Cairo",
    searchText: "cairo egypt",
    group: "Africa",
    groupKey: "africa",
  },
  {
    value: "Africa/Johannesburg",
    label: "(UTC+02:00) Johannesburg",
    searchText: "johannesburg south africa",
    group: "Africa",
    groupKey: "africa",
  },
];

export default function TimezoneSelect({
  register,
  setValue,
}: TimezoneSelectProps) {
  const { t } = useTranslation();
  const uid = useId();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");

  const selectRef = useRef<HTMLSelectElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const registerProps = register("timezone");

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return TIMEZONE_OPTIONS;
    const query = searchQuery.toLowerCase();
    return TIMEZONE_OPTIONS.filter(
      (option) =>
        option.searchText.includes(query) ||
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const groupedOptions = useMemo(() => {
    const groups: Record<string, TimezoneOption[]> = {};
    filteredOptions.forEach((option) => {
      (groups[option.group] ??= []).push(option);
    });
    return groups;
  }, [filteredOptions]);

  const selectedOption = TIMEZONE_OPTIONS.find(
    (opt) => opt.value === selectedValue,
  );
  const inputValue = isOpen ? searchQuery : (selectedOption?.label ?? "");

  const commitValue = (value: string) => {
    setSelectedValue(value);
    if (selectRef.current) {
      selectRef.current.value = value;
      // Ensures RHF's registered onChange fires even if `setValue` isn't provided
      selectRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setValue?.("timezone", value, { shouldDirty: true, shouldValidate: true });
  };

  const handleOptionSelect = (value: string) => {
    commitValue(value);
    setSearchQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1),
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
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

  useEffect(() => {
    if (!isOpen) return;
    const current = filteredOptions[highlightedIndex];
    if (current) {
      optionRefs.current[current.value]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen, filteredOptions]);

  useEffect(() => {
    // Auto-detect timezone on mount if nothing selected yet
    if (!selectedValue) {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      commitValue(detected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listboxId = `${uid}-listbox`;
  const activeOptionId = filteredOptions[highlightedIndex]
    ? `${uid}-option-${filteredOptions[highlightedIndex].value}`
    : undefined;

  return (
    <div className="relative">
      <label
        htmlFor={`${uid}-input`}
        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {t("config.timezone", "Timezone")}
      </label>

      {/* Hidden native select — keeps RHF registration & submission working */}
      <select
        {...registerProps}
        ref={(el) => {
          selectRef.current = el;
          registerProps.ref(el);
        }}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {TIMEZONE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex w-9 items-center justify-center">
          <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>

        <input
          id={`${uid}-input`}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          autoComplete="off"
          value={inputValue}
          placeholder={t("config.searchTimezones", "Search timezones...")}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setHighlightedIndex(0);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onClick={() => {
            setIsOpen(true);
            setSearchQuery("");
          }}
          className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white/70 py-2 ps-9 pe-9 text-sm text-gray-900 backdrop-blur-sm transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-100 dark:placeholder:text-gray-500"
        />

        <ChevronDown
          className={`pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-transform duration-200 dark:text-gray-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={listboxId}
              role="listbox"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-white/40 bg-white/90 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/90"
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {t(
                    "config.noTimezonesFound",
                    'No timezones found for "{{query}}"',
                    { query: searchQuery },
                  )}
                </div>
              ) : (
                Object.entries(groupedOptions).map(([group, options]) => (
                  <div key={group}>
                    <div className="sticky top-0 bg-gray-50/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 backdrop-blur-sm dark:bg-gray-800/95 dark:text-gray-400">
                      {t(`timezone.group.${options[0].groupKey}`, group)}
                    </div>
                    {options.map((option) => {
                      const absoluteIndex = filteredOptions.findIndex(
                        (opt) => opt.value === option.value,
                      );
                      const isHighlighted = absoluteIndex === highlightedIndex;
                      const isSelected = option.value === selectedValue;
                      return (
                        <button
                          key={option.value}
                          id={`${uid}-option-${option.value}`}
                          ref={(el) => {
                            optionRefs.current[option.value] = el;
                          }}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleOptionSelect(option.value)}
                          onMouseEnter={() =>
                            setHighlightedIndex(absoluteIndex)
                          }
                          className={`flex w-full items-center justify-between px-3 py-2 text-start text-sm transition-colors ${
                            isHighlighted
                              ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                              : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className={isSelected ? "font-semibold" : ""}>
                            {option.label}
                          </span>
                          {isSelected && (
                            <Check className="h-4 w-4 shrink-0 text-indigo-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
