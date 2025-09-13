import { addStylesheet } from "../../../helpers/helpers.js";

export default class GuessSubmit {
  public atom : HTMLButtonElement;

  constructor(options: Record<string, string> = { label: "Submit" }) {
    addStylesheet("atom", "GuessSubmit");
    this.atom = this.create(options.label);
  }

  private create(label : string = "Submit") : HTMLButtonElement {
    const container = document.createElement("button");
    container.className = "guess-submit";
    container.setAttribute("id", "submit-guess");
    container.setAttribute("data-testid", "submit-guess");
    container.textContent = label;
    return container;
  };
};