import { addStylesheet, sentencecase } from "../../../../helpers/helpers.js";

export default class ResultsArea {
  public atoms : Record<string, HTMLDivElement> = {};
  public language: string | undefined = undefined;
  public translated: string | undefined = undefined;
  public untranslated: string | undefined = undefined;

  constructor(options : Record<string, string> = {}) {
    addStylesheet("organism", "ResultsArea", "primary");
    this.language = options.language || 
      (() => { throw new Error("Language is required"); })();
    this.translated = options.translated || 
      (() => { throw new Error("Translated is required"); })();
    this.untranslated = options.untranslated || 
      (() => { throw new Error("Untranslated is required"); })();

    this.create();
  }

  private create(): void {
    this.winner();
    this.loser();
  }

  private winner(): HTMLDivElement {
    if (!this.language || !this.translated) {
      throw new Error("Language and word must be defined.");
    }

    const div = document.createElement("div");
    div.className = "results-area";
    div.setAttribute("data-testid", "results-area");

    if  (!this.untranslated) {
      throw new Error("Untranslated property is required for ResultsArea not found or removed.")
    }
    
    // All this needs to be internationalised later
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
    meaning.textContent = `It means "${this.translated}"`;
    div.appendChild(meaning);

    const issue = document.createElement("p");
    issue.setAttribute("data-testid", "issue");
    issue.className = "issue results-prompt";
    issue.textContent = "Is there a problem with this translation?";
    issue.appendChild(document.createElement("br"));
    const link = document.createElement("a");
    link.setAttribute("href", `mailto:etymodle@proton.me?subject=Translation Issue: ${this.untranslated}&body=The translation for the word "${this.untranslated}" seems to be incorrect. The current translation is "${this.translated}". Please provide the correct translation.`);
    link.textContent = "Report it here";
    issue.appendChild(link);
    div.appendChild(issue);
    
    this.atoms.win = div;
    return div;
  }

  private loser(): HTMLDivElement {
    if (!this.language || !this.translated) {
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

    meaning.textContent = `It means "${this.translated}"`;
    div.appendChild(meaning);

    this.atoms.lose = div;
    return div;
  }
};