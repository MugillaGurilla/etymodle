import { translations } from "../../translations/root.js";

export default class Help {
  private container : HTMLDivElement;
  private icon : HTMLDivElement;
  private wrapper : HTMLDivElement;
  private lang : string;
  private instructions : Record<string, HTMLElement> = {}

  constructor() {
    this.container = document.querySelector(".help-modal") as HTMLDivElement;
    this.icon = document.querySelector(".help-icon") as HTMLDivElement;
    this.wrapper = document.querySelector(".help") as HTMLDivElement;
    this.lang = "en";
    this.instructions.header = document.querySelector(".instructions-header") as HTMLElement;
    this.instructions.body = document.querySelector(".instructions-body") as HTMLElement;
    this.toggle();
    this.propagate();
  }

  toggle() {
    this.icon.addEventListener("click", () => {
      this.container.classList.toggle("hidden");
      return;
    });
  }

  propagate() {
    const lang = "en";
    this.instructions.header.innerText = translations[lang].instructionTitle;
 
    const list = document.createElement("ol");
    for (const key in translations[lang].instructions) {
      const text = translations[lang].instructions[key];
      const p = document.createElement("li");
      p.innerText = text;
      list.appendChild(p);
    }
    this.instructions.body.appendChild(list);
  }
};

new Help();