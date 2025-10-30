import Game from "./game.js";

import ResultsArea from "../../components/primary/organisms/ResultsArea/ResultsArea.js";

export default class Results {
  private language : string;
  private translated : string;
  private untranslated : string;
  private languagecode : string;

  constructor(game : Game) {
    if (!game.setup) {
      throw new Error("Setup not initialized in Game.");
    }
    this.language = game.setup.get("language");
    this.translated = game.setup.get("translated");
    this.untranslated = game.setup.get("untranslated");
    this.languagecode = game.setup.get("languageCode");
  }

  public win() : void {
    const gameArea = document.querySelector(".game-area");
    if (!gameArea) {
      throw new Error("gameArea element does not exist.")
    }
    if (!gameArea.firstChild) {
      throw new Error("main element has no children.");
    }
    gameArea.innerHTML = "";
    const resultsArea = new ResultsArea({
      language: this.language,
      translated: this.translated,
      untranslated: this.untranslated
    });
    gameArea.appendChild(resultsArea.atoms.win);
  };

  public lose() : void {
    const gameArea = document.querySelector(".game-area");
    if (!gameArea) {
      throw new Error("gameArea element not found.");
    }
    if (!gameArea.firstChild) {
      throw new Error("gameArea element has no children.");
    }
    gameArea.innerHTML = "";
    const resultsArea = new ResultsArea({
      language: this.language,
      translated: this.translated,
      untranslated: this.untranslated
    });
    gameArea.appendChild(resultsArea.atoms.lose);
  };
};