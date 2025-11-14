// src/pages/Topics/TopicsPage.tsx
import { TopicsService } from "@/api";
import React, { useEffect, useState } from "react";

export default function TopicsPage() {
  // const [deviceTopics, setDeviceTopics] = useState<string[]>([]);
  const [subscribed, setSubscribed] = useState<string[]>([]);

  useEffect(() => {
    TopicsService.topicControllerGetSubscribedTopics().then((r) =>
      setSubscribed(r.data || [])
    );
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Topics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded">
          <h3 className="font-semibold mb-2">Subscribed Topics</h3>
          {subscribed.map((t) => (
            <div key={t} className="text-sm text-gray-300 py-1">
              {t}
            </div>
          ))}
        </div>
        <div className="bg-white/5 p-4 rounded">
          <h3 className="font-semibold mb-2">Device Topics</h3>
          <p className="text-sm text-gray-400">
            Select a device to view topics (future)
          </p>
        </div>
      </div>
    </div>
  );
}
