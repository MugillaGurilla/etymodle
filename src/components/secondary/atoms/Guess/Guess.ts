import { addStylesheet, sentencecase } from "../../../../helpers/helpers.js";
import { translations } from "../../../../translations/root.js";

export default class Guess {
  public matchingLanguage : string = "";
  private matchInfo : HTMLElement | null = null;
  private matchCountry : HTMLElement | null = null;
  private completed : boolean = false;
  
  constructor(options : Record<string, string> = {}) {
    addStylesheet("atom", "Guess", "secondary");
    this.matchingLanguage = options.language || "";
    this.matchInfo = document.getElementById("match-info");
    this.matchCountry = document.getElementById("match-country");
    if (options.match === "close") this.closeMatch();
    if (options.match === "none") this.noMatch();
    if (options.reset) this.removeAll();
  }

  private closeMatch() : void {
    if (this.sanity()) { 
      this.matchInfo!.textContent = translations.en.closeMatch;
      this.matchCountry!.textContent = sentencecase(this.matchingLanguage) + "?";
      this.completed = true;
    }
  }

  private noMatch() : void {
    this.matchCountry!.textContent = sentencecase(this.matchingLanguage);
    this.matchInfo!.textContent = translations.en.noMatch;
    this.completed = true;
  }

  private removeAll() : void {
    if (this.sanity({ reset: true})) {
      this.matchInfo!.textContent = "";
      this.matchCountry!.textContent = "";
      this.completed = true;
    }
  }

  private sanity(options : Record<string, any> = {}) : boolean {
    if (this.completed) {
      throw new Error("Already completed.");
    }
    if (!this.matchInfo) {  
      throw new Error("Match info span not found.");
    }
    if (!this.matchCountry) {
      throw new Error("Match country span not found.");
    }
    if (!this.matchingLanguage && !options.reset) {
      throw new Error("No matching language provided for no match.");
    }
    return true;
  }
}