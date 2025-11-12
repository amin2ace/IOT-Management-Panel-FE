import i18n from "./index";

export function applyDirection() {
  const rtlLangs = ["fa", "ar"];
  const dir = rtlLangs.includes(i18n.language) ? "rtl" : "ltr";

  // Update document direction
  document.documentElement.setAttribute("dir", dir);

  // Optional: add a class for RTL to control styling in Tailwind if needed
  document.documentElement.classList.toggle("rtl", dir === "rtl");
}
