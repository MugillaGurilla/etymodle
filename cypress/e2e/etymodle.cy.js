describe("Etymodle Test Dump", () => { 
  it("loads homepage", () => {
    cy.visit("http://localhost:5500");
    cy.contains("Etymodle");
    cy.on('window:alert', msg => {
      expect(msg).to.contains("Correct!");
    });
    cy.fixture("../../answer/today.json").then((answer) => {

      cy.log(answer);
      cy.get(".word-display").should("have.text", answer.untranslated);
      cy.get("#guess-input").type(answer.language)
      cy.get("#submit-guess").click();
    });
  })
});