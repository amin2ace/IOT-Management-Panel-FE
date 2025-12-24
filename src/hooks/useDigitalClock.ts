import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Hook to manage digital clock display
 * Returns current time in HH:MM:SS format
 */
export function useDigitalClock() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    // Set initial time immediately
    updateTime();

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Return empty string on server-side or before mount to avoid hydration mismatch
  return mounted ? time : "";
}

/**
 * Formats time to 12-hour format with AM/PM
 */
export function useDigitalClock12Hour() {
  const [time, setTime] = useState<string>("");
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? t("common.PM") : t("common.AM");
      const hours12 = String(hours % 12 || 12).padStart(2, "0");

      setTime(`${hours12}:${minutes}:${seconds} ${ampm}`);
    };

    // Set initial time immediately
    updateTime();

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [t]); // Added t as dependency to update when language changes

  // Return empty string on server-side or before mount to avoid hydration mismatch
  return mounted ? time : "";
}
