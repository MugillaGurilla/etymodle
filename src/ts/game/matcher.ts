import { lowercase, sentencecase } from "../../../helpers/helpers.js";
import { match } from "../types/types.js";

import Correcter from "./correcter.js";

export default class Matcher {
  private correcter: Correcter;
  private matching : match = "none";
  private guess : string = "";
  private matchingLanguage : string = "";
  
  constructor(correcter: Correcter) {
    this.correcter = correcter;
  }

  match(guess : string) : match {
    this.reset();
    this.guess = lowercase(guess);

    if (this.correcter.get("supportedLanguages").includes(this.guess)) {
      this.matching = "exact";
      this.matchingLanguage = sentencecase(this.guess);
      return this.matching;
    }

    const guessAsChars : Array<string> = lowercase(this.guess).split("");

    this.correcter.get("supportedLanguages").forEach((lang : string) => {
      const languageAsChars : Array<string> = lang.split("");
      let matchCount : number = 0;

      languageAsChars.forEach((char, index) => {
        if (char === guessAsChars[index]) {
          matchCount++;
        }
      });   

      const matchPercentage : number = (matchCount / languageAsChars.length) * 100;
      if (matchPercentage >= 75) {
        this.matching = "close";
        this.matchingLanguage = lang;
        return;
      }
    });
    return this.matching;
  };

  prompt() : void {
    if (this.matching === "exact") {
      return;
    }

    if (this.matching === "none") {
      this.addNoMatchInfo();
      return;
    }

    if (this.matching === "close") {
      this.addCloseMatchInfo();
      return;
    }
  }

  private reset() : void {
    this.matching = "none";
    this.guess = "";
    this.matchingLanguage = "";
    this.removeAllMatchInfo();
  }

  private addCloseMatchInfo() : void {
    // This can be React-ified later
    const matchInfo : HTMLElement | null = document.getElementById("match-info");
    const matchCountry : HTMLElement | null = document.getElementById("match-country");
    if (!matchInfo) {
      throw new Error("Match info span not found.");
    }
    if (!matchCountry) {
      throw new Error("Match country span not found.");
    }
    matchInfo.textContent = "Did you mean: ";
    matchCountry.textContent = sentencecase(this.matchingLanguage) + "?";
  }

  private addNoMatchInfo() : void {
    // This can be React-ified later
    const matchInfo : HTMLElement | null = document.getElementById("match-info");
    const matchCountry : HTMLElement | null = document.getElementById("match-country");
    if (!matchInfo) {
      throw new Error("Match info span not found.");
    }
    if (!matchCountry) {
      throw new Error("Match country span not found.");
    }
    matchInfo.textContent = "No close matches found for: ";
    matchCountry.textContent = sentencecase(this.guess);
  }

  private removeAllMatchInfo() : void {
    // This can be React-ified later
    const matchInfo : HTMLElement | null = document.getElementById("match-info");
    const matchCountry : HTMLElement | null = document.getElementById("match-country");
    if (!matchInfo) {
      throw new Error("Match info span not found.");
    }
    if (!matchCountry) {
      throw new Error("Match country span not found.");
    }
    matchInfo.textContent = "";
    matchCountry.textContent = "";
  }
}