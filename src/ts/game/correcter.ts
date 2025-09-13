import { sentencecase } from "../../helpers/helpers.js";
import { supportedLanguages } from "../../../data/supported-languages.js";

import Game from "./game.js";
import Matcher from "./matcher.js";

export default class Correcter {
  private supportedLanguages : Array<string> = [];
  private language? : string;
  private languagecode? : string;
  private guess: string = "";
  private maxGuesses? : number;
  private matcher: Matcher;
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
    this.languagecode = game.setup.get("languageCode");
    this.maxGuesses = game.setup.get("maxGuesses");
    this.matcher = new Matcher(this);
  };

  async init() : Promise<void> {
    await this.fetchSupportedLanguages();
    this.addGuessListener();
    // this.correctWord();
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

  private handleGuess() : void {
    this.input = document.getElementById("guess-input") as HTMLInputElement;
    this.guess = this.input.value?.trim();

    if (this.matcher.match(this.guess) !== "exact") {
      this.matcher.prompt();
      return;
    }

    if (this.isCorrect()) {
      alert("Correct!");
      console.log("Correct!");
      return; 
    }

    if (this.guess) {
      this.addGuess();
    }
  }


  private addGuess() : void {
    // This can be React-ified later
    const guessesContainer : HTMLElement | null = document.querySelector(".guesses");
    if (!guessesContainer) {
      throw new Error("Guesses container not found.");
    }
    const guessElement : HTMLElement = document.createElement("div");
    guessElement.textContent = sentencecase(this.guess);
    guessElement.className = "guess";
    guessesContainer.appendChild(guessElement);
    if (!this.input) {
      throw new Error("Input element not found, unable to clear.");
    }
    this.input.value = "";
  }

  private isCorrect() : boolean {
    return this.guess === this.language;
  }

  private async fetchSupportedLanguages() {
    this.supportedLanguages = supportedLanguages;
  }
};

