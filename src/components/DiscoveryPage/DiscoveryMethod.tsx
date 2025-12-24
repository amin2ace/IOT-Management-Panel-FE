import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

enum DiscoverMethod {
  BROADCAST = "Broadcast",
  UNICAST = "Unicast",
}

type UnicastFormData = {
  deviceId: string;
};

type Props = {
  loading: boolean;
  onBroadcast: () => Promise<void>;
  onUnicast: (data: UnicastFormData) => Promise<void>;
  submit?: UseFormHandleSubmit<UnicastFormData>;
  register?: UseFormRegister<UnicastFormData>;
};

export default function DiscoveryMethod({
  loading,
  onBroadcast,
  onUnicast,
  submit,
  register,
}: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<DiscoverMethod>(
    DiscoverMethod.BROADCAST
  );

  return (
    <div className="dashboardDiscoveryContainer">
      {/* Tab Navigation */}
      <menu className="flex border-b border-white/10">
        <li className="flex-1">
          <button
            className={`w-full rounded-lg py-4 px-6 text-center transition-colors duration-200 cursor-pointer ${
              activeTab === DiscoverMethod.BROADCAST
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-950 dark:text-gray-950 dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-950/30"
            }`}
            onClick={() => setActiveTab(DiscoverMethod.BROADCAST)}
          >
            {t("discovery.broadcast") || "Broadcast"}
          </button>
        </li>
        <li className="flex-1">
          <button
            className={`w-full rounded-lg py-4 px-6 text-center transition-colors duration-200 cursor-pointer ${
              activeTab === DiscoverMethod.UNICAST
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-950 dark:text-gray-950 dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-950/30"
            }`}
            onClick={() => setActiveTab(DiscoverMethod.UNICAST)}
          >
            {t("discovery.unicast") || "Unicast"}
          </button>
        </li>
      </menu>

      {/* Tab Content */}
      <div className="p-6">
        {/* Broadcast Tab Content */}
        {activeTab === DiscoverMethod.BROADCAST && (
          <div className="space-y-4">
            <p className="text-gray-900 dark:text-gray-400">
              {t("discovery.broadcastTitle")}
            </p>
            <button
              onClick={onBroadcast}
              disabled={loading}
              className="form-submit md:w-1/4! sm:w-1/2!"
            >
              {loading ? t("common.sending") : t("discovery.broadcastDiscover")}
            </button>
          </div>
        )}

        {/* Unicast Tab Content */}
        {activeTab === DiscoverMethod.UNICAST && (
          <div className="space-y-4">
            <p className="text-gray-900 dark:text-gray-400">
              {t("discovery.unicastTitle") || "Discover specific device by ID"}
            </p>
            {submit && register ? (
              <form
                onSubmit={submit(onUnicast)}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-baseline-last"
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
                  <input
                    {...register("deviceId")}
                    className="form-input w-full! sm:w-3/4! md:w-1/3!"
                    placeholder={t("discovery.enterDeviceId")}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="form-submit w-full! sm:w-2/4! md:w-1/5! whitespace-nowrap"
                  >
                    {loading
                      ? t("common.sending")
                      : t("discovery.unicastDiscover")}
                  </button>
                </div>{" "}
              </form>
            ) : (
              <p className="text-red-400">{t("discovery.formMissConfig")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
