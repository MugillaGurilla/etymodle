import { addStylesheet } from "../../../../helpers/helpers.js";
import { translations } from "../../../../translations/root.js";

export default class ThemeToggle {
  public atom!: HTMLDivElement;

  constructor(options: Record<string, string> = { lang: "en" }) {
    addStylesheet("atom", "ThemeToggle", "primary");
    this.create(options);
  };

  private create(options: Record<string, string> = { lang: "en" }): HTMLDivElement {
    const lang = options.lang || "en";
    const div = document.createElement("div");
    div.classList.add("theme-toggle");
    div.setAttribute("data-testid", "theme-toggle");
    div.tabIndex = 0;
    div.title = translations[lang].toggleThemeTitle;
    div.textContent = translations[lang].toggleTheme;
    div.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const nu = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nu);
    });
    div.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const current = document.documentElement.getAttribute("data-theme");
        const nu = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nu);
      }
    });
    this.atom = div;
    return div;
  };
}