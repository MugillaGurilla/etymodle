import { addStylesheet } from "../../../helpers/helpers.js";

export default class InstructionsBody {
  public atom! : HTMLDivElement;

  constructor() {
    addStylesheet("atom", "InstructionsBody");
    this.create();
  };

  private create(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("instructions-body", "instructions");
    this.atom = div;
    return div;
  };
};