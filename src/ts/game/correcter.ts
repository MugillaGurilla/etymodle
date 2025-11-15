import { lowercase, sentencecase } from "../../helpers/helpers.js";
import { supportedLanguages } from "../../../data/supported-languages.js";

import Game from "./game.js";
import Matcher from "./matcher.js";

import Results from "./results.js";
import Guess from "../../components/secondary/atoms/Guess/Guess.js";

export default class Correcter {
  private supportedLanguages : Array<string> = [];
  private language : string;
  // private languagecode? : string;
  private guess: string = "";
  private currentGuesses : number = 0;
  private maxGuesses : number;
  private matcher: Matcher;
  private results: Results;
  private input: HTMLInputElement | null = null;

  public get(key: "supportedLanguages") : any {
    const value : any = this[key];
    if (value === undefined) {
      throw new Error(`Property ${key} does not exist on Correcter.`);
    }
    return value;
  };

  constructor(game : Game) {
    if (!game.setup) {
      throw new Error("Setup not initialized in Game.");
    }
    this.language = game.setup.get("language");
    // this.languagecode = game.setup.get("languageCode");
    this.maxGuesses = game.setup.get("maxGuesses");
    this.matcher = new Matcher(this);
    this.results = new Results(game);
  };

  async init() : Promise<void> {
    await this.fetchSupportedLanguages();
    this.addGuessListener();
  };

  private addGuessListener() : void{
    if (!this.maxGuesses) {
      throw new Error("Max guesses not defined.");
    }

    document.getElementById("submit-guess")?.addEventListener("click", () => {
      this.handleGuess();
    });

    document.getElementById("guess-input")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.handleGuess();
      }
    });
  }

  private async handleGuess() : Promise<void> {
    this.input = document.getElementById("guess-input") as HTMLInputElement;
    this.guess = lowercase(this.input.value?.trim());

    if (this.matcher.match(this.guess) !== "exact") {
      this.matcher.prompt();
      return;
    }

    if (this.isCorrect()) {
      this.results.win();
      return; 
    }

    if (this.guess) {
      this.addGuess();
    }
    
    if (this.currentGuesses >= this.maxGuesses) {
      this.results.lose();
      return;
    }
  }
  
  
  private addGuess() : void {
    new Guess({guess: this.guess, correctLanguage: this.language});
    this.currentGuesses += 1;
  }

  private isCorrect() : boolean {
    return this.guess === this.language;
  }

  private async fetchSupportedLanguages() {
    this.supportedLanguages = supportedLanguages;
  }
};

