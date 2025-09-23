import { addStylesheet } from "../../../helpers/helpers.js";

export default class InstructionsHeader {
  public atom : HTMLDivElement = undefined!;
  
  constructor() {
    addStylesheet("atom", "InstructionsHeader");
    this.create();
  };

  private create(): HTMLHeadingElement {
    const heading = document.createElement("h2");
    heading.classList.add("instructions", "instructions-header");
    this.atom = heading;
    return heading;
  };
};
