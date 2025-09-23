import { addStylesheet } from "../../../../helpers/helpers.js";
import HelpIcon from "../../atoms/HelpIcon/HelpIcon.js";
import HelpModal from "../../molecules/HelpModal/HelpModal.js";

export default class HelpArea {
  public atom : HTMLDivElement;
  
  constructor(options : Record<string, string> = {
    lang: "en"
  }) {
    addStylesheet("organism", "HelpArea", "primary");
    this.atom = this.create();
    this.render();
  };

  private create(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("help-area");
    div.appendChild(new HelpIcon().atom);
    div.appendChild(new HelpModal().atom);
    this.atom = div;
    return div;
  };

  private render(): void {
    document.querySelectorAll("HelpArea").forEach((el) => {
      el.replaceWith(this.atom);
    });
  };
};