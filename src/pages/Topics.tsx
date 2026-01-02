// src/pages/Topics/TopicsPage.tsx
import { TopicsService } from "@/api";
import type { TopicDto } from "@/api/models/Mqtt/TopicDto";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { SensorDto } from "@/api/models/device/SensorDto";
import DeviceSelector from "@/components/ConfigPage/DeviceSelector";
import "@/styles/pages/topics.css";
import { useLoadDevices } from "@/hooks/useLoadDevices";

export default function TopicsPage() {
  const { t } = useTranslation();
  const { register } = useForm();
  const { devices } = useLoadDevices(); //TODO: this is loading forever
  const [selectedDevice, setSelectedDevice] = useState<SensorDto | null>(null);
  const [deviceTopics, setDeviceTopics] = useState<TopicDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // // Fetch available devices
  // useEffect(() => {
  //   DevicesService.deviceControllerGetAllSensors()
  //     .then((devices) => setDevices(devices || []))
  //     .catch((err) => console.error("Failed to fetch devices", err));
  // }, []);

  // Handle device selection
  const handleSelectDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      setSelectedDevice(null);
      setDeviceTopics([]);
      return;
    }
    const deviceId = e.target.value;
    const device = devices.find((d) => d.deviceId === deviceId);
    setSelectedDevice(device || null);

    // Fetch device topics from API
    if (deviceId) {
      setIsLoading(true);
      TopicsService.topicControllerGetDeviceTopicsByDeviceId(deviceId)
        .then((topics) => setDeviceTopics(topics || []))
        .catch((err) => {
          console.error("Failed to fetch device topics", err);
          setDeviceTopics([]);
        })
        .finally(() => setIsLoading(false));
    } else {
      setDeviceTopics([]);
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

      {/* Topics Table */}
      <div className="topics-table-container">
        {!selectedDevice ? (
          <div className="topics-empty-message">
            <p>
              {t("topic.selectDeviceMessage") ||
                "Select a device to view topics"}
            </p>
          </div>
        ) : isLoading ? (
          <div className="topics-loading-message">
            <p>{t("common.loading") || "Loading..."}</p>
          </div>
        ) : deviceTopics.length === 0 ? (
          <div className="topics-empty-message">
            <p>{t("topic.noDeviceTopics") || "No topics for this device"}</p>
          </div>
        ) : (
          <table className="topics-table">
            <thead className="topics-table-head">
              <tr className="topics-table-header-row">
                <th className="topics-table-header">
                  {t("topic.topic") || "Topic"}
                </th>
                <th className="topics-table-header">
                  {t("topic.brokerUrl") || "Broker URL"}
                </th>
                <th className="topics-table-header">
                  {t("topic.useCase") || "Use Case"}
                </th>
                <th className="topics-table-header">
                  {t("topic.subscribed") || "Subscribed"}
                </th>
                <th className="topics-table-header">
                  {t("topic.createdAt") || "Created At"}
                </th>
              </tr>
            </thead>
            <tbody className="topics-table-body">
              {deviceTopics.map((topic) => (
                <tr
                  key={`${topic.deviceId}-${topic.topic}`}
                  className="topics-table-row"
                >
                  <td className="topics-table-cell topics-table-topic">
                    {topic.topic}
                  </td>
                  <td className="topics-table-cell topics-table-broker">
                    {topic.brokerUrl}
                  </td>
                  <td className="topics-table-cell">
                    <span className="topic-use-case-badge">
                      {topic.useCase}
                    </span>
                  </td>
                  <td className="topics-table-cell topics-table-subscribed">
                    <span
                      className={`subscription-badge ${topic.isSubscribed ? "subscribed" : "unsubscribed"}`}
                    >
                      {topic.isSubscribed
                        ? t("common.yes") || "Yes"
                        : t("common.no") || "No"}
                    </span>
                  </td>
                  <td className="topics-table-cell topics-table-date">
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
