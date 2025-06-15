describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login'); // Navigate to login page
  });

  it('should login with valid credentials and redirect to home', () => {
    cy.get('input[name="userName"]').type('emilys');
    cy.get('input[name="password"]').type('emilyspass');

    cy.get('button').contains('Login').click();

    // Should redirect to home ("/")
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Confirm user is logged in
    cy.contains('emilys'); // assuming username is displayed on Home page
  });

  it('should redirect to login if accessing profile page unauthenticated', () => {
    cy.visit('/profile');
    cy.url().should('include', '/login');
  });
});
