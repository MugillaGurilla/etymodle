import { supportedLanguages } from "../../data/supported-languages.js";
import { sentencecase } from "../../src/helpers/helpers.js";

describe("Etymodle Test Dump", () => { 
  it("loads homepage", () => {
    cy.window().then((win) => {
      cy.spy(win, 'alert').as('alertSpy');
    });
    const stub = cy.stub()
    cy.on ('window:alert', stub)
    
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.fixture("../../answer/today.json").then((answer) => {
      cy.log(answer);
      cy.get(".word-display").should("have.text", answer.untranslated);
      cy.get("#guess-input").type(answer.language, { force: true });
      cy.get("#submit-guess").click({ force: true });
      cy.then(() => {                       
        expect(stub.getCall(0)).to.be.calledWith('Correct!');
      });
    });
  });

  it("wrong guess, valid language is registered", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
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
    cy.get("#guess-input").type("asdfghjkl")
    cy.get("#submit-guess").click();
    cy.get("[data-testid=\"match-info\"]").should("contain", "No close matches found for: ");
    cy.get("[data-testid=\"match-country\"]").should("contain", "Asdfghjkl");
  });

  it("correct, lowercase input is accepted", () => {
    const stub = cy.stub()
    cy.on ('window:alert', stub)
    
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.on('window:alert', msg => {
      expect(msg).to.contains("Correct!");
    });
    cy.fixture("../../answer/today.json").then((answer) => {
      cy.log(answer);
      cy.get(".word-display").should("have.text", answer.untranslated);
      cy.get("#guess-input").type(answer.language.toLowerCase(), { force: true });
      cy.get("#submit-guess").click({ force: true });
      cy.then(() => {                       
        expect(stub.getCall(0)).to.be.calledWith('Correct!');
      });
    });
  });

  it("correct, uppercase input is accepted", () => {
    const stub = cy.stub()
    cy.on ('window:alert', stub)

    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.on('window:alert', msg => {
      expect(msg).to.contains("Correct!");
    });
    cy.fixture("../../answer/today.json").then((answer) => {
      cy.log(answer);
      cy.get(".word-display").should("have.text", answer.untranslated);
      cy.get("#guess-input").type(answer.language.toUpperCase(), { force: true });
      cy.get("#submit-guess").click({ force: true });
      cy.then(() => {                       
        expect(stub.getCall(0)).to.be.calledWith('Correct!');
      });
    });
  });
});