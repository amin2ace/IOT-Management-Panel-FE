import i18n from "./index";

export function applyDirection() {
  const rtlLangs = ["fa", "ar"];
  const dir = rtlLangs.includes(i18n.language) ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
}
