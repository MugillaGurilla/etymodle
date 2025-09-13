import { addStylesheet } from "../../../helpers/helpers.js";

export default class Match {
  public atom : HTMLDivElement;

  constructor(options : Record<string, string> = {}) {
    addStylesheet('atom', 'Match');
    this.atom = this.create();
    // this.render();
  }
  
  private create() : HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'match';
    container.setAttribute('data-testid', 'match-item');
    const matchInfo = document.createElement('span');
    matchInfo.setAttribute('data-testid', 'match-info');
    matchInfo.setAttribute('id', 'match-info');
    const matchCountry = document.createElement('span');
    matchCountry.setAttribute('data-testid', 'match-country');
    matchCountry.setAttribute('id', 'match-country');
    container.appendChild(matchInfo);
    container.appendChild(matchCountry);
    return container;
  };
}