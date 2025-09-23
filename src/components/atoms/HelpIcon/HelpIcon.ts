import { addStylesheet } from "../../../helpers/helpers.js";
import { translations } from "../../../translations/root.js";

export default class HelpIcon {
  public atom : HTMLDivElement = undefined!;
  
  constructor() {
    addStylesheet("atom", "HelpIcon");
    this.create();
    this.render();
  }

  private create(): HTMLDivElement {
    const lang = "en"; 
    const div = document.createElement("div");
    div.classList.add("help-icon");
    div.tabIndex = 0;
    div.innerHTML = translations[lang].helpIcon;
    this.atom = div;
    return div;
  }

  private render() : void {
    document.querySelectorAll("HelpIcon").forEach((el) => {
      el.replaceWith(this.atom);
    });
  }
}