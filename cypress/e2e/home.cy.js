import { loginUser, creds } from "../fixtures/login";

describe("Home page",() => {
    beforeEach(()=> {
        cy.visit("/");
    })

    it("Should show login button when user is not logged in" ,() => {
        cy.contains("Welcome to Lowes Auth APP Home Page");
        cy.get("button").contains("Login").should("exist");
    })

    it("Should redirect user to login page when clicked on login", ()=> {
        cy.get("button").contains("Login").click();

        cy.url().should("include", "/login");
    })

    it("Should show user details, profile and logout when user is logged in ", ()=> {
        cy.get("button").contains("Login").click();

        cy.url().should("include", "/login");

         loginUser(creds.userName, creds.password);
        cy.url().should("eq", `${Cypress.config().baseUrl}#/`);

        // home page should contins my user name
        cy.contains("emilys");

        cy.get("a").contains("Profile").should("exist");

        cy.get("button").contains("Logout").should("exist");

    } )

    it("When logout user should see login btn not profile , logout and username" ,() => {
        cy.get("button").contains("Login").click();

        cy.url().should("include", "/login");

          loginUser(creds.userName, creds.password);
        cy.url().should("eq", `${Cypress.config().baseUrl}#/`);
        cy.get("button").contains("Logout").click();
        cy.get("button").contains("Login").should("exist");

    })
})