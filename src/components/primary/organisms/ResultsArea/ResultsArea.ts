import { addStylesheet, sentencecase } from "../../../../helpers/helpers.js";

export default class ResultsArea {
  public atoms : Record<string, HTMLDivElement> = {};
  public language: string | undefined = undefined;
  public word: string | undefined = undefined;

  constructor(options : Record<string, string> = {}) {
    addStylesheet("organism", "ResultsArea", "primary");
    this.language = options.language || 
      (() => { throw new Error("Language is required"); })();
    this.word = options.word || 
      (() => { throw new Error("Word is required"); })();
    this.create();
  }

  private create(): void {
    this.winner();
    this.loser();
  }

  private winner(): HTMLDivElement {
    if (!this.language || !this.word) {
      throw new Error("Language and word must be defined.");
    }

    const div = document.createElement("div");
    div.className = "results-area";
    div.setAttribute("data-testid", "results-area");

    const wellDone = document.createElement("h2");
    wellDone.setAttribute("data-testid", "well-done");
    wellDone.className = "well-done results-prompt";
    wellDone.textContent = "Well Done!";
    div.appendChild(wellDone);

    const language = document.createElement("p");
    language.setAttribute("data-testid", "language");
    language.className = "language results-prompt";
    language.textContent = `This word is ${sentencecase(this.language)}`;
    div.appendChild(language);
    
    const meaning = document.createElement("p");
    meaning.setAttribute("data-testid", "meaning");
    meaning.className = "meaning results-prompt";

    meaning.textContent = `It means "${this.word}"`;
    div.appendChild(meaning);
    
    this.atoms.win = div;
    return div;
  }

  private loser(): HTMLDivElement {
    if (!this.language || !this.word) {
      throw new Error("Language and word must be defined.");
    }

    const div = document.createElement("div");
    div.className = "results-area";
    div.setAttribute("data-testid", "results-area");

    const tryAgain = document.createElement("h2");
    tryAgain.setAttribute("data-testid", "try-again");
    tryAgain.className = "try-again results-prompt";
    tryAgain.textContent = "Try Again Tomorrow!";
    div.appendChild(tryAgain);

    const language = document.createElement("p");
    language.setAttribute("data-testid", "language");
    language.className = "language results-prompt";
    language.textContent = `This word is ${sentencecase(this.language)}`;
    div.appendChild(language);

    const meaning = document.createElement("p");
    meaning.setAttribute("data-testid", "meaning");
    meaning.className = "meaning results-prompt";

    meaning.textContent = `It means "${this.word}"`;
    div.appendChild(meaning);

    this.atoms.lose = div;
    return div;
  }
};