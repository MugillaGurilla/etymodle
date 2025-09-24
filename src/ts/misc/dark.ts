export default function toggleDarkTheme() {
  const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", systemPref);
}