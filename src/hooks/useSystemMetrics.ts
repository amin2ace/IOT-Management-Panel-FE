import { useEffect, useState } from "react";

/**
 * Type definition for Chrome's performance.memory API
 * Only available in Chromium-based browsers
 */
interface PerformanceMemory {
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
  jsHeapTotalSize: number;
}

/**
 * Extended Performance interface with memory property
 */
interface ExtendedPerformance extends Performance {
  memory?: PerformanceMemory;
}

/**
 * Hook to track application uptime since page load
 * Returns formatted uptime string (HH:MM:SS)
 */
export function useAppUptime() {
  const [uptime, setUptime] = useState<string>("00:00:00");

  useEffect(() => {
    const startTime = Date.now();

    const updateUptime = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;

      setUptime(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateUptime();
    const interval = setInterval(updateUptime, 1000);

    return () => clearInterval(interval);
  }, []);

  return uptime;
}

/**
 * Hook to track JavaScript errors
 * Returns count of errors caught by error boundary
 */
export function useErrorCount() {
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const handleError = () => {
      setErrorCount((prev) => prev + 1);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return errorCount;
}

/**
 * Hook to track console warnings
 * Returns count of console.warn calls
 */
export function useWarningCount() {
  const [warningCount, setWarningCount] = useState(0);

  useEffect(() => {
    const originalWarn = console.warn;

    console.warn = (...args) => {
      setWarningCount((prev) => prev + 1);
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return warningCount;
}

/**
 * Hook to get estimated memory usage (if available)
 * Returns percentage or "--" if not available
 * Note: performance.memory is only available in Chrome
 */
export function useMemoryUsage() {
  const [memoryUsage, setMemoryUsage] = useState<string>("--");

  useEffect(() => {
    const updateMemory = () => {
      const perfMemory = (performance as ExtendedPerformance).memory;
      if (perfMemory) {
        const used = perfMemory.usedJSHeapSize;
        const limit = perfMemory.jsHeapSizeLimit;
        const percentage = Math.round((used / limit) * 100);
        setMemoryUsage(`${percentage}`);
      }
    };

    updateMemory();
    const interval = setInterval(updateMemory, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryUsage;
}

/**
 * Hook to estimate CPU usage based on event loop lag
 * This is a rough estimation and not accurate CPU usage
 * Real CPU usage should come from backend
 */
export function useCpuUsage() {
  const [cpuUsage, setCpuUsage] = useState<string>("--");

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let animationId: number;

    const measureCpu = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= 1000) {
        // Calculate frames per second
        const fps = Math.round((frameCount / elapsed) * 1000);
        // Rough estimation: 60 FPS = 0% lag, lower FPS = higher CPU usage
        const cpuEstimate = Math.max(0, Math.round(((60 - fps) / 60) * 100));
        setCpuUsage(`${cpuEstimate}`);

        frameCount = 0;
        startTime = currentTime;
      }

      animationId = requestAnimationFrame(measureCpu);
    };

    animationId = requestAnimationFrame(measureCpu);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return cpuUsage;
}

/**
 * Hook to get system metrics from WebSocket or API
 * This would be called to fetch real metrics from backend
 */
export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  errors: number;
  warnings: number;
  uptime: string;
}

export function useSystemMetrics(): SystemMetrics {
  const uptime = useAppUptime();
  const errorCount = useErrorCount();
  const warningCount = useWarningCount();
  const memoryUsage = useMemoryUsage();
  const cpuUsage = useCpuUsage();

  return {
    cpuUsage: cpuUsage === "--" ? 0 : parseInt(cpuUsage),
    memoryUsage: memoryUsage === "--" ? 0 : parseInt(memoryUsage),
    errors: errorCount,
    warnings: warningCount,
    uptime,
  };
}
