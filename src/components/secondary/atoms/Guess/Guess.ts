import { addStylesheet, sentencecase } from "../../../../helpers/helpers.js";

export default class Guess {
  private guess : string = "";
  private input : HTMLInputElement;
  private container : HTMLElement;

  constructor(options : Record<string, string>) {
    addStylesheet("atom", "Guess", "secondary");
    this.guess = options.guess || "";
    this.input = document.getElementById("guess-input") as HTMLInputElement;
    this.container = document.querySelector(".guesses") as HTMLElement;
    this.render();
  };

  private sanity() : boolean {
    if (!this.input) {
      throw new Error("Guess input not found.");
    }
    if (!this.container) {
      throw new Error("Guesses container not found.");
    }
    return true;
  }

  private render()  {
    if (!this.sanity()) {
      
    };

    const guessElement : HTMLElement = document.createElement("div");
    guessElement.textContent = sentencecase(this.guess);
    guessElement.className = "guess";
    this.container.appendChild(guessElement);
    if (!this.input) {
      throw new Error("Input element not found, unable to clear.");
    }
    this.input.value = "";
  }
}