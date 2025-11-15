import Prompt from "../../components/secondary/atoms/Prompt/Prompt.js";
import { lowercase, sentencecase } from "../../helpers/helpers.js";
import { Match } from "../types/types.js";

import Correcter from "./correcter.js";

export default class Matcher {
  private correcter: Correcter;
  private matching : Match = "none";
  private foundMatch = false;
  private guess : string = "";
  private matchingLanguage : string = "";
  
  constructor(correcter: Correcter) {
    this.correcter = correcter;
  }

  match(guess : string) : Match {
    this.reset();
    this.guess = lowercase(guess);

    if (this.correcter.get("supportedLanguages").includes(this.guess)) {
      this.matching = "exact";
      this.matchingLanguage = sentencecase(this.guess);
      return this.matching;
    }
    this.matchPercentage();
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
    new Prompt({reset: "true"});
  }

  private addCloseMatchInfo() : void {
    new Prompt({match: "close", language: this.matchingLanguage});
  }

  private addNoMatchInfo() : void {
    new Prompt({match: "none", language: this.guess});
  }

  private matchPercentage() {
    const guessAsChars : Array<string> = lowercase(this.guess).split("");

    this.correcter.get("supportedLanguages").forEach((lang : string) => {
      if (this.foundMatch) { return; }
      const languageAsChars : Array<string> = lang.split("");
      let matchCount : number = 0;

      languageAsChars.forEach((char, index) => {
        if (this.foundMatch) { return; }
        if (char === guessAsChars[index]) {
          matchCount++;
        }
      });   

      const matchPercentage : number = (matchCount / languageAsChars.length) * 100;
      if (matchPercentage >= 75) {
        this.matching = "close";
        this.matchingLanguage = lang;
        this.foundMatch = true;
      }
    });
  };
}