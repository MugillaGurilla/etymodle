export default class Correcter {
  private supportedLanguages : Array<string> = [];
  private language? : string;
  private languagecode? : string;
  private maxGuesses? : number;

  constructor(game : any) {
    
    this.language = game.setup.language;
    this.languagecode = game.setup.languageCode;
    this.maxGuesses = game.setup.maxGuesses;
  }

  async init() : Promise<void> {
    await this.fetchSupportedLanguages();
    this.correctWord();
  }

  private correctWord() {
    throw new Error("Method not implemented.");
  }

  private fetchSupportedLanguages() {
    throw new Error("Method not implemented.");
  }
};

