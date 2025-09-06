export default class Setup {
  private untranslated : string = "Gorta";
  private translated : string = "Famine, Privation";
  private language : string = "Irish";  
  private languageCode : string = "ga";
  private maxGuesses : number = 6;
  private milestones : Record<string, boolean> = {};

  async init() {
    await this.prepareData();
    this.pushTodaysWord();
  }


  private async prepareData() : Promise<void> {
    await fetch(('./answer/today.json'))
      .then((response) => response.json())
      .then((data) => {
        this.untranslated = data.untranslated;
        this.translated = data.translated;
        this.language = data.language;
        this.languageCode = data.languageCode;
        this.maxGuesses = data.maxGuesses;
        this.milestones.dataPrepared = true;
        console.log("Today's word data prepared.");
      })
      .catch((error) => {
        console.error('Error fetching today\'s word:', error);
      });
  }

  private pushTodaysWord() : void {
    if (!this.milestones.dataPrepared) {
      throw new Error("Data not prepared yet.");
    }
    document.getElementsByClassName("word-display")[0].textContent = this.untranslated;
    console.log("Today's word pushed to display.");
  }
};