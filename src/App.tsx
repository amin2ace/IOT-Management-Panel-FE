import logo from "./assets/image/logo.png";
import FadeOutRedirect from "./components/FadeOutRedirect";
export default function Landing() {
  return (
    <FadeOutRedirect to="/login" delay={2000} duration={800} pulse={false}>
      <img src={logo} width={200} height={200} className="items-center"></img>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        IIoT Management Panel
      </h1>
      <p className="text-gray-700 dark:text-gray-300">Initializing system...</p>
    </FadeOutRedirect>
  );
}
