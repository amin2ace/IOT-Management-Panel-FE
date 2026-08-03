import { useTranslation } from "react-i18next";
import logo from "./assets/image/logo.png";
import FadeOutRedirect from "./components/FadeOutRedirect";

export default function Landing() {
  const { t } = useTranslation();

  return (
    <FadeOutRedirect to="/login" delay={2000} duration={800} pulse={false}>
      <img
        src={logo}
        width={200}
        height={200}
        alt={t("app.name", "IIoT Management Panel")}
        className="mx-auto rounded-2xl border border-white/30 shadow-xl"
      />

      <h1 className="mb-2 mt-5 text-3xl font-bold text-gray-900 dark:text-white">
        {t("app.name", "IIoT Management Panel")}
      </h1>

      <p className="text-gray-600 dark:text-gray-400">
        {t("app.initializing", "Initializing system...")}
      </p>

      {/* Progress indicator so the wait doesn't feel frozen */}
      <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-gray-200/70 dark:bg-gray-800/70">
        <div className="h-full w-1/3 animate-[loading-bar_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
      </div>
    </FadeOutRedirect>
  );
}
