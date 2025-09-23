import { supportedLanguages } from "../../data/supported-languages.js";
import { lowercase, sentencecase } from "../../src/helpers/helpers.js";
import { coolLetters } from "../../data/loading-screen.js";

describe("Etymodle Test Dump", () => { 
  it("loads homepage", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.fixture("../../answer/today.json").then((answer) => {
      cy.log(answer);
      cy.get(".word-display").should("have.text", sentencecase(answer.untranslated));
      cy.get("#guess-input").type(answer.language, { force: true });
      cy.get("[data-testid=\"results-area\"]").should("not.exist");
      cy.get("#submit-guess").click({ force: true });
      cy.get("[data-testid=\"results-area\"]").should("exist");
      cy.get("[data-testid=\"well-done\"]").should("exist");
      cy.get("[data-testid=\"meaning\"]").should("exist");
      cy.get("[data-testid=\"meaning\"]").should("contain.text", lowercase(answer.translated));
      cy.get("[data-testid=\"language\"]").should("exist");
      cy.get("[data-testid=\"language\"]").should("contain.text", answer.language);
    });
  });

  it("wrong guess, valid language is registered", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.fixture("../../answer/today.json").then((answer) => {
      const langauges = supportedLanguages.filter(item => item !== answer.language);
      const wrongLanguage = langauges[0];
      cy.get("#guess-input").type(wrongLanguage)
      cy.get("#submit-guess").click();
      cy.get(".guesses").should("contain", sentencecase(wrongLanguage));
    });
  });

  it("close match is prompted", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.get("#guess-input").type("Japanes")
    cy.get("#submit-guess").click();
    cy.get(".match").should("contain", sentencecase("Japanese"));
    cy.get(".match").should("contain", "Did you mean: Japanese?");
    cy.get("[data-testid=\"match-info\"]").should("contain.text", "Did you mean: ");
    cy.get("[data-testid=\"match-country\"]").should("contain.text", "Japanese?");
  });

  it("nonsense input is prompted", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.get("#guess-input").type("asdfghjkl", { force: true });
    cy.get("#submit-guess").click({ force: true });
    cy.get("[data-testid=\"match-info\"]").should("contain", "Not found in database: ");
    cy.get("[data-testid=\"match-country\"]").should("contain", "Asdfghjkl");
  });
  
  it("Real, but unsupported, language is not accepted", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.get("#guess-input").type("French");
    cy.get("#submit-guess").click();
    cy.get(".guesses").should("not.contain", "French");
    cy.get("[data-testid=\"match-info\"]").should("contain", "Not found in database: ");
    cy.get("[data-testid=\"match-country\"]").should("contain", "French");
  });

  it("correct, lowercase input is accepted", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.fixture("../../answer/today.json").then((answer) => {
      cy.log(answer);
      cy.get("[data-testid=\"word-display\"]").should("have.text", sentencecase(answer.untranslated));
      cy.get("#guess-input").type(answer.language.toLowerCase(), { force: true });
      cy.get("#submit-guess").click({ force: true });
      cy.get("[data-testid=\"results-area\"]").should("exist");
      cy.get("[data-testid=\"well-done\"]").should("exist");
      cy.get("[data-testid=\"meaning\"]").should("exist");
      cy.get("[data-testid=\"meaning\"]").should("contain.text", lowercase(answer.translated));
      cy.get("[data-testid=\"language\"]").should("exist");
      cy.get("[data-testid=\"language\"]").should("contain.text", answer.language);
    });
  });

  it("correct, uppercase input is accepted", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.fixture("../../answer/today.json").then((answer) => {
      cy.log(answer);
      cy.get(".word-display").should("have.text", sentencecase(answer.untranslated));
      cy.get("#guess-input").type(answer.language.toUpperCase(), { force: true });
      cy.get("#submit-guess").click({ force: true });
      cy.get("[data-testid=\"results-area\"]").should("exist");
      cy.get("[data-testid=\"well-done\"]").should("exist");
      cy.get("[data-testid=\"meaning\"]").should("exist");
      cy.get("[data-testid=\"meaning\"]").should("contain.text", lowercase(answer.translated));
      cy.get("[data-testid=\"language\"]").should("exist");
      cy.get("[data-testid=\"language\"]").should("contain.text", answer.language);
    });
  });

  it("max guesses is enforced", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click({ timeout: 5000 });
    for (let i = 0; i < 6; i++) {
      cy.get("#guess-input").type("Japanese");
      cy.get("#submit-guess").click();
      if (i < 5) {
        cy.get("#guess-input").should("have.value", "");
      }
    }
    cy.get("[data-testid=\"results-area\"]").should("exist");
    cy.get("[data-testid=\"try-again\"]").should("exist");
    cy.get("[data-testid=\"well-done\"]").should("not.exist");
    cy.get("[data-testid=\"meaning\"]").should("exist");
    cy.get("[data-testid=\"language\"]").should("exist");
    cy.get("#guess-input").should("not.exist");
    cy.get("#submit-guess").should("not.exist");
  });
  
  it("loading screen is loaded, removed", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(200);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").should(($element) => {
      expect(coolLetters).to.include($element.text());
    });
    cy.get("div.loading-area").click({ timeout: 5000 });
    cy.get("div.loading-area").should("not.exist");
  });
  
  it.only("help screen is loaded, toggles", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.wait(500);
    cy.get("div.loading-area").should("exist");
    cy.get("div.loading-area").click();
    cy.get("div.loading-area").should("not.exist");
    cy.get("div.help-area").should("exist");
    cy.get("div.help-modal").should("have.class", "hidden");
    cy.get("div.help-icon").should("exist");
    cy.get("div.help-icon").click({ force: true });
    cy.get("div.help-modal").should("be.visible");
    cy.get("h2.instructions-header").should("be.visible");
    cy.get("div.instructions-body").should("be.visible");
    cy.get("h2.instructions-header").should("contain.text", "How To Play");
    cy.get("div.help-icon").click({ force: true });
    cy.get("div.help-modal").should("have.class", "hidden");
  });
});