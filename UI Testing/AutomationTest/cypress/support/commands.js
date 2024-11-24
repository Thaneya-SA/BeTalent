Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(Cypress.env('username'));
    cy.get('[data-test="password"]').type(Cypress.env('password'));
    cy.get('[data-test="login-button"]').click();
  });