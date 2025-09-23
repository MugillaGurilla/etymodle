export default function toggleDarkTheme() {
  const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", systemPref);
  
  const darkThemeToggle = document.querySelector(".theme-toggle");
  if (!darkThemeToggle) return;
  
  darkThemeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const nu = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nu);
  });
  
  darkThemeToggle.setAttribute("title", "Toggle Theme");
}