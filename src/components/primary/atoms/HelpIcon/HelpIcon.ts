import { addStylesheet } from "../../../../helpers/helpers.js";
import { translations } from "../../../../translations/root.js";

export default class HelpIcon {
  public atom : HTMLDivElement = undefined!;
  
  constructor() {
    addStylesheet("atom", "HelpIcon", "primary");
    this.create();
    this.render();
  }

  private create(): HTMLDivElement {
    const lang = "en"; 
    const div = document.createElement("div");
    div.classList.add("help-icon");
    div.tabIndex = 0;
    div.title = translations[lang].helpIconTitle;
    div.innerHTML = translations[lang].helpIcon;
    div.addEventListener("click", () => {
      const modal = document.querySelector(".help-modal") as HTMLDivElement;
      modal.classList.toggle("hidden");
      return;
    });
    div.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const modal = document.querySelector(".help-modal") as HTMLDivElement;
        modal.classList.toggle("hidden");
        return;
      }
    });
    this.atom = div;
    return div;
  }

  private render() : void {
    document.querySelectorAll("HelpIcon").forEach((el) => {
      el.replaceWith(this.atom);
    });
  }
}