export function setTheme(theme: 'dark' | 'light' | 'system') {
  const html = document.documentElement;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('dark', prefersDark);
    html.classList.toggle('light', !prefersDark);
  } else {
    html.classList.toggle('dark', theme === 'dark');
    html.classList.toggle('light', theme === 'light');
  }
}
