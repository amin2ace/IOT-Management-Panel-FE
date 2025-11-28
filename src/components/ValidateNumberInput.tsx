import React from "react";

interface NumberInputProps {
  value: number | null;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  placeholder?: string;
}

export function ValidateNumberInput({
  value,
  setValue,
  min,
  max,
  step = 1,
  label,
  placeholder,
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Handle empty input
    if (inputValue === "") {
      setValue(min ?? 0);
      return;
    }

    const numericValue = Number(inputValue);

    // Validate if it's a valid number
    if (Number.isNaN(numericValue)) {
      setValue(min ?? 0);
      return;
    }

    // Apply min/max constraints
    let finalValue = numericValue;

    if (min !== undefined && numericValue < min) {
      finalValue = min;
    } else if (max !== undefined && numericValue > max) {
      finalValue = max;
    }

    setValue(finalValue);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-gray-300">{label}</label>}
      <input
        type="number"
        value={value ?? ""}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-700 text-sm"
      />
      <div className="text-xs text-gray-400">
        {min ?? "No min"} - {max ?? "No max"}
      </div>
    </div>
  );
}
