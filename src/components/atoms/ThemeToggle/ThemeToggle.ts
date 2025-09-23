import { addStylesheet } from "../../../helpers/helpers.js";
import { translations } from "../../../translations/root.js";

export default class ThemeToggle {
  public atom!: HTMLDivElement;

  constructor(options: Record<string, string> = { lang: "en" }) {
    addStylesheet("atom", "ThemeToggle");
    this.create(options);
  };

  private create(options: Record<string, string> = { lang: "en" }): HTMLDivElement {
    const lang = options.lang || "en";
    const div = document.createElement("div");
    div.classList.add("theme-toggle");
    div.tabIndex = 0;
    div.title = translations[lang].toggleThemeTitle;
    div.innerHTML = translations[lang].toggleTheme;
    this.atom = div;
    return div;
  };
}