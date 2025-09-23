import GuessInput from "../../atoms/GuessInput/GuessInput.js";
import GuessSubmit from "../../atoms/GuessSubmit/GuessSubmit.js";
import { addStylesheet } from "../../../helpers/helpers.js";

export default class InputArea {
  public atom: HTMLDivElement;

  constructor(options: Record<string, string> = {}) {
    addStylesheet("molecule", "InputArea");
    this.atom = this.create(options);
  }

  private create(options: Record<string, string> = {}): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "input-area";
    container.appendChild(new GuessInput({
      placeholder: options.placeholder || "Enter Your Guess Here"
    }).atom);
    container.appendChild(new GuessSubmit({
      label: options.label || "Submit"
    }).atom);
    return container;
  }
}