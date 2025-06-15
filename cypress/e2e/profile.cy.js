describe('Auth Flow: Login -> Home -> Profile', () => {
    const credentials = {
        userName: 'emilys',
        password: 'emilyspass'
    };

    it('should log in the user and redirect to Home page', () => {
        cy.visit('/login');

        // Fill login form
        cy.get('input[name="userName"]').type(credentials.userName);
        cy.get('input[name="password"]').type(credentials.password);
        cy.get('button').contains('Login').click();

        // Wait for redirect to home
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains('Welcome to Lowes Auth APP Home Page');

        // Confirm user is logged in
        cy.contains(credentials.userName);
        cy.get('a').contains('Profile');
        // Click profile link
        cy.get('a').contains('Profile').click();

        cy.url().should('include', '/profile');
        cy.contains('Profile Page');
        cy.contains(`UserName: ${credentials.userName}`);
    });
});
