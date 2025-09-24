import { translations } from "../../../../translations/root.js";
import { addStylesheet } from "../../../../helpers/helpers.js";

export default class CloseHelpIcon {
  public atom!: HTMLDivElement;
  constructor(options: Record<string, string> = { lang: "en" }) {

    addStylesheet("atom", "CloseHelpIcon", "primary");
    this.create(options);
  };

  private create(options: Record<string, string> = { lang: "en" }): HTMLDivElement {
    const lang = options.lang || "en";
    const div = document.createElement("div");
    div.classList.add("close-help-icon");
    div.setAttribute("data-testid", "close-help-icon");
    div.tabIndex = 0;
    div.title = translations[lang].closeHelpTitle;
    div.textContent = translations[lang].closeHelp;
    div.addEventListener("click", () => {
      const modal = document.querySelector(".help-modal") as HTMLDivElement;
      modal.classList.add("hidden");
      return;
    });
    div.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const modal = document.querySelector(".help-modal") as HTMLDivElement;
        modal.classList.add("hidden");
        return;
      }
    });
    this.atom = div;
    return div;
  };
};