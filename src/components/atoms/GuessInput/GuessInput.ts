import { addStylesheet } from "../../../helpers/helpers.js";

export default class GuessInput {
  public atom : HTMLInputElement;

  constructor(options : Record<string, string>) {
    addStylesheet("atom", "GuessInput");
    this.atom = this.create(options.placeholder || "");
  }

  private create(placeholder: string) : HTMLInputElement {
    const container = document.createElement("input");
    container.className = "guess-input";
    container.setAttribute("id", "guess-input");
    container.setAttribute("maxlength", "20");
    container.setAttribute("data-testid", "guess-input");
    container.setAttribute("type", "text");
    container.setAttribute("placeholder", placeholder);
    return container;
  }
}