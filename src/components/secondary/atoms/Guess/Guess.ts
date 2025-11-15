import { addStylesheet, lowercase, sentencecase } from "../../../../helpers/helpers.js";
import { familyToLanguages, languageToFamily } from "../../../../../data/language-families.js";

export default class Guess {
  private guess : string = "";
  private input : HTMLInputElement;
  private container : HTMLElement;
  private correctLanguage : string;

  constructor(options : Record<string, string>) {
    this.guess = options.guess || "";
    this.input = document.getElementById("guess-input") as HTMLInputElement;
    this.container = document.querySelector(".guesses") as HTMLElement;
    this.correctLanguage = options.correctLanguage || "";
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
    guessElement.setAttribute("data-testid", "guess");
    guessElement.setAttribute("data-language", lowercase(this.guess));
    if (this.isInLanguageFamily()) {
      guessElement.classList.add("same-family");
    }
    this.container.appendChild(guessElement);
    if (!this.input) {
      throw new Error("Input element not found, unable to clear.");
    }
    this.input.value = "";
  }

  private isInLanguageFamily() : boolean {
    const family = languageToFamily[this.guess.toLowerCase()] ?? null;
    if (!family) {
      console.log("No close language families found because language is isolated (per this game).");
      return false;
    }
    const related : boolean = familyToLanguages[family].includes(this.correctLanguage.toLowerCase());
    if (!related) {
      console.log("No close language families found because language is not related.");
      return false;
    }
    return true;
  }
}