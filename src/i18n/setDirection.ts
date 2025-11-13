export function applyDirection(language: string) {
  const rtlLangs = ["fa", "ar"];
  const dir = rtlLangs.includes(language) ? "rtl" : "ltr";

  // Update HTML direction attribute
  document.documentElement.setAttribute("dir", dir);

  // Optional Tailwind class for RTL-specific styling
  document.documentElement.classList.toggle("rtl", dir === "rtl");
}
