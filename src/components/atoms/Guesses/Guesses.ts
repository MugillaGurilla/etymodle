import { addStylesheet } from "../../../helpers/helpers.js";

export default class Guesses {
  public atom : HTMLDivElement;

  constructor(options : Record<string, string> = {}) {
    addStylesheet('atom', 'Guesses');
    this.atom = this.create();
  }
  
  private create() : HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'guesses';
    container.setAttribute('data-testid', 'guesses');
    return container;
  };
};