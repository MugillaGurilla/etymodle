import Correcter from "./correcter.js";
import Results from "./results.js";
import Setup from "./setup.js";

export default class Game {
  setup?: Setup;
  correcter?: Correcter;
  results?: Results;

  constructor() {}
  
  public async init() : Promise<void> {
    this.setup = new Setup();
    await this.setup.init();

    this.correcter = new Correcter(this);
    await this.correcter.init();

    this.results = new Results(this);
  }

  public async finish() : Promise<void> {
    console.log("Game finished.");
  }
}

(async () => {
  const game = new Game();
  await game.init();
})();