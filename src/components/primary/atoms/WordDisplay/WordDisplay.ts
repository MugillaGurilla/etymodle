import { addStylesheet } from "../../../../helpers/helpers.js";

export default class DisplayWord {
  public atom : HTMLDivElement;

  constructor(options : Record<string, string> = {word: ""}) {
    addStylesheet("atom", "WordDisplay", "primary");
    this.atom = this.create(options.word);
  }

  private create(word : string) {
    const container = document.createElement("div");
    container.className = "word-display";
    container.textContent = word;
    container.setAttribute("data-testid", "word-display");
    return container;
  };
}