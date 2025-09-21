import { lowercase, sentencecase } from "../../helpers/helpers.js";
import { supportedLanguages } from "../../../data/supported-languages.js";

import Game from "./game.js";
import Matcher from "./matcher.js";

import ResultsArea from "../../components/organisms/ResultsArea/ResultsArea.js";
import Results from "./results.js";

export default class Correcter {
  private supportedLanguages : Array<string> = [];
  private language? : string;
  private languagecode? : string;
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
    this.languagecode = game.setup.get("languageCode");
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
      console.log("Correct!");
      return; 
    }

    if (this.guess) {
      this.addGuess();
    }
    
    if (this.currentGuesses >= this.maxGuesses) {
      this.results.lose();
      console.log("Out of guesses!");
      return;
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
    console.log(this.currentGuesses);
    this.currentGuesses += 1;
  }

  private isCorrect() : boolean {
    return this.guess === this.language;
  }

  private async fetchSupportedLanguages() {
    this.supportedLanguages = supportedLanguages;
  }
};

