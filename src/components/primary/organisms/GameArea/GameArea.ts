import { addStylesheet } from "../../../../helpers/helpers.js";
import Guesses from "../../atoms/Guesses/Guesses.js";
import Match from "../../atoms/Match/Match.js";
import InputArea from "../../molecules/InputArea/InputArea.js";


export default class GameArea {
  public atom : HTMLDivElement;

  constructor() {
    addStylesheet("organism", "GameArea", "primary");
    this.atom = this.create();
    this.render();
  }
  
  private create() : HTMLDivElement {
    const container = document.createElement("div");
    container.className = "game-area";
    container.appendChild(new InputArea({
      placeholder: "Enter Your Guess Here",
      label: "Submit"
    }).atom);
    container.appendChild(new Match().atom);
    container.appendChild(new Guesses().atom);
    return container;
  };
  
  private render() : void {
    const elements = document.querySelectorAll("GameArea");
    elements.forEach((el) => {
      const gameAreaElement = this.atom;
      el.replaceWith(gameAreaElement);
    });
  }
}