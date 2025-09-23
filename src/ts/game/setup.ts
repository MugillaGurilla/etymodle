import { lowercase, sentencecase } from "../../helpers/helpers.js";

export default class Setup {
  private untranslated : string = "Gorta";
  private translated : string = "Famine, Privation";
  private language: string = "Irish";  
  private languageCode : string = "ga";
  private maxGuesses : number = 6;
  private milestones : Record<string, boolean> = {};

  public get(key: "language" | "languageCode" | "maxGuesses" | "translated") : any {
    const value : any = this[key];
    if (value === undefined) {
      throw new Error(`Property ${key} does not exist on Setup.`);
    }
    return value;
  }

  async init() {
    await this.prepareData();
    this.pushTodaysWord();
  }


  private async prepareData() : Promise<void> {
    await fetch(("./answer/today.json"))
      .then((response) => response.json())
      .then((data) => {
        this.untranslated = lowercase(data.untranslated);
        this.translated = lowercase(data.translated);
        this.language = lowercase(data.language);
        this.languageCode = lowercase(data.languageCode);
        this.milestones.dataPrepared = true;
        console.log("Today's word data prepared.");
      })
      .catch((error) => {
        console.error("Error fetching today's word:", error);
      });
  }

  private pushTodaysWord() : void {
    if (!this.milestones.dataPrepared) {
      throw new Error("Data not prepared yet.");
    }
    document.getElementsByClassName("word-display")[0].textContent = sentencecase(this.untranslated);
    console.log("Today's word pushed to display.");
  }
};