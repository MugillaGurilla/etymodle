import Setup from "./setup.js";

export default class Game {
  private setup: Setup;

  constructor() {
    this.setup = new Setup();
    // this.correcter = new Correcter(this);
    // this.announcer = new Announcer(this);
  }

  public async init() : Promise<void> {
    await this.setup.init();
    // await this.correcter.init();
  }
}

(async () => {
  const game = new Game();
  await game.init();
})();