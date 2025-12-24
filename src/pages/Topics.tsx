// src/pages/Topics/TopicsPage.tsx
import { TopicsService, DevicesService } from "@/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { SensorDto } from "@/api/models/device/SensorDto";
import DeviceSelector from "@/components/ConfigPage/DeviceSelector";

export default function TopicsPage() {
  const { t } = useTranslation();
  const { register } = useForm();
  const [subscribed, setSubscribed] = useState<string[]>([]);
  const [devices, setDevices] = useState<SensorDto[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<SensorDto | null>(null);
  const [deviceTopics, setDeviceTopics] = useState<string[]>([]);

  // Fetch subscribed topics
  useEffect(() => {
    TopicsService.topicControllerGetSubscribedTopics().then((r) =>
      setSubscribed(r.data || [])
    );
  }, []);

  // Fetch available devices
  useEffect(() => {
    DevicesService.deviceControllerGetAllSensors()
      .then((devices) => setDevices(devices || []))
      .catch((err) => console.error("Failed to fetch devices", err));
  }, []);

  // Handle device selection
  const handleSelectDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    const device = devices.find((d) => d.deviceId === deviceId);
    setSelectedDevice(device || null);

    // Extract device topics from configuration if available
    if (device?.configuration?.network?.wifiSsid) {
      setDeviceTopics([
        device.configuration.network.wifiSsid,
        // Add more topics as needed from device config
      ]);
    }
  };

  return (
    <div className="topicsPageContainer">
      <header>
        <h1>{t("topic.topics")}</h1>
      </header>

      {/* Device Selector */}
      <div className="topics-action-bar">
        <DeviceSelector
          devices={devices}
          register={register("deviceId")}
          onChange={handleSelectDevice}
        />
      </div>

      <div className="topics-grid">
        <div className="topics-card">
          <h3 className="topics-card-header">{t("topic.subscribedTopics")}</h3>
          <div className="topics-card-content">
            {subscribed.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("topic.noSubscribedTopics") || "No subscribed topics"}
              </p>
            ) : (
              subscribed.map((topic) => (
                <div key={topic} className="topic-item">
                  {topic}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="topics-card">
          <h3 className="topics-card-header">{t("topic.deviceTopics")}</h3>
          <div className="topics-card-content">
            {!selectedDevice ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("topic.selectDeviceMessage") ||
                  "Select a device to view topics"}
              </p>
            ) : deviceTopics.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("topic.noDeviceTopics") || "No topics for this device"}
              </p>
            ) : (
              deviceTopics.map((topic) => (
                <div key={topic} className="topic-item">
                  {topic}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
