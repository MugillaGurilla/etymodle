import { addStylesheet } from "../../../../helpers/helpers.js";

export default class Guesses {
  public atom : HTMLDivElement;

  constructor(options : Record<string, string> = {}) {
    addStylesheet("atom", "Guesses", "primary");
    addStylesheet("atom", "Guess", "secondary"); // This is here because a Guess component is in the help menu. 
    this.atom = this.create();
  }
  
  private create() : HTMLDivElement {
    const container = document.createElement("div");
    container.className = "guesses";
    container.setAttribute("data-testid", "guesses");
    return container;
  };
};