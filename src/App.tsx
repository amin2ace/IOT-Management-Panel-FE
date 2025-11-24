import logo from "./assets/image/logo.png";
import FadeOutRedirect from "./components/FadeOutRedirect";
export default function Landing() {
  return (
    <FadeOutRedirect to="/login" delay={2000} duration={800} pulse={false}>
      <img
        src={logo}
        width={200}
        height={200}
        className="mx-auto rounded-lg shadow-xl backdrop-blur-sm border border-white/20"
      ></img>

      <h1 className="text-3xl py-5 font-bold text-gray-900 dark:text-white mb-2">
        IIoT Management Panel
      </h1>
      <p className="text-gray-700 dark:text-gray-300">Initializing system...</p>
    </FadeOutRedirect>
  );
}
