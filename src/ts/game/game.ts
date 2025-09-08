import Correcter from "./correcter.js";
import Setup from "./setup.js";

export default class Game {
  setup?: Setup;
  correcter?: Correcter;

  constructor() {
    // this.announcer = new Announcer(this);
  }
  
  public async init() : Promise<void> {
    this.setup = new Setup();
    await this.setup.init();

    this.correcter = new Correcter(this);
    await this.correcter.init();
  }
}

(async () => {
  const game = new Game();
  await game.init();
})();