import InstructionsBody from "../../atoms/InstructionsBody/InstructionsBody.js";
import InstructionsHeader from "../../atoms/InstructionsHeader/InstructionsHeader.js";
import ThemeToggle from "../../atoms/ThemeToggle/ThemeToggle.js";
import { addStylesheet } from "../../../../helpers/helpers.js";

export default class HelpModal {
  public atom : HTMLDivElement;
  
  constructor(options : Record<string, string> = {}) {
    addStylesheet("molecule", "HelpModal", "primary");
    this.atom = this.create(options);
    // this.render();
  };

  private create(options: Record<string, string> = {}): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "help-modal hidden";
    container.appendChild(new InstructionsHeader().atom);
    container.appendChild(new InstructionsBody().atom);
    container.appendChild(new ThemeToggle({ lang: options.lang }).atom);
    return container;
  };
};