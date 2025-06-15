describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should show login button if user is not logged in', () => {
        cy.contains('Welcome to Lowes Auth APP Home Page');
        cy.get('button').contains('Login').should('exist');
    });

    it('should redirect to login page when clicking Login button', () => {
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/login');
    });

    it('should show username and profile when logged in', () => {
        // mock user login via localStorage
        const user = {
            username: 'kminchelle',
            firstName: 'John',
            lastName: 'Doe',
            token: 'fake-token'
        };

        window.localStorage.setItem('auth-user', JSON.stringify(user));

        // Reload page to reflect login state
        cy.visit('/');

        // Should see user info and profile link
        cy.contains(user.username);
        cy.get('a').contains('Profile');
        cy.get('button').contains('Logout');
    });

    it('should logout and show login button again', () => {
        // Mock login
        const user = {
            username: 'kminchelle',
            firstName: 'John',
            lastName: 'Doe',
            token: 'fake-token'
        };
        window.localStorage.setItem('auth-user', JSON.stringify(user));
        cy.visit('/');

        // Logout
        cy.get('button').contains('Logout').click();

        // Check if redirected and logged out
        cy.get('button').contains('Login').should('exist');
        cy.contains(user.username).should('not.exist');
    });
});
