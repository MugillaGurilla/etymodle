export default function toggleDarkTheme() {
  const darkThemeToggle = document.querySelector('.dark-theme-toggle');
  if (!darkThemeToggle) return;

  const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', systemPref);

  darkThemeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const nu = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nu);
  });

  darkThemeToggle.setAttribute('title', 'Toggle Theme');
}