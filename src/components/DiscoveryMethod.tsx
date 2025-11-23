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
    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
      {/* Tab Navigation */}
      <menu className="flex border-b border-white/10">
        <li className="flex-1">
          <button
            className={`w-full py-4 px-6 text-center transition-colors duration-200 ${
              activeTab === DiscoverMethod.BROADCAST
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`}
            onClick={() => setActiveTab(DiscoverMethod.BROADCAST)}
          >
            {t("broadcast") || "Broadcast"}
          </button>
        </li>
        <li className="flex-1">
          <button
            className={`w-full py-4 px-6 text-center transition-colors duration-200 ${
              activeTab === DiscoverMethod.UNICAST
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-white/5"
            }`}
            onClick={() => setActiveTab(DiscoverMethod.UNICAST)}
          >
            {t("unicast") || "Unicast"}
          </button>
        </li>
      </menu>

      {/* Tab Content */}
      <div className="p-6">
        {/* Broadcast Tab Content */}
        {activeTab === DiscoverMethod.BROADCAST && (
          <div className="space-y-4">
            <p className="text-gray-300">{t("discoveryBroadcastTitle")}</p>
            <button
              onClick={onBroadcast}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200 font-medium"
            >
              {loading ? t("sending") : t("broadcastDiscover")}
            </button>
          </div>
        )}

        {/* Unicast Tab Content */}
        {activeTab === DiscoverMethod.UNICAST && (
          <div className="space-y-4">
            <p className="text-gray-300">
              {t("discoveryUnicastTitle") || "Discover specific device by ID"}
            </p>
            {submit && register ? (
              <form
                onSubmit={submit(onUnicast)}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-baseline-last"
              >
                <div>
                  <input
                    {...register("deviceId")}
                    className="w-1/2 form-input"
                    placeholder={t("Enter device ID")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 form-submit"
                >
                  {loading ? t("sending") : t("unicastDiscover")}
                </button>
              </form>
            ) : (
              <p className="text-red-400">{t("Form configuration missing")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
