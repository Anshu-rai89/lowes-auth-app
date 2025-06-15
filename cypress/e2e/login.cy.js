import { loginUser, creds } from "../fixtures/login";


describe("Login Flow" ,() => {
    beforeEach(()=> {
        cy.visit("#/login")
    })

    it("should login with valid creds and redirect to home" ,() =>{
        loginUser(creds.userName, creds.password);

        // once clicked it should redirect to home page 
        // url should change to home page from login 

        cy.url().should("eq", `${Cypress.config().baseUrl}#/`);

        // home page should contins my user name
        cy.contains("emilys");
    });

    it("should be redirected to home when accessing login page for logged in user", () => {
       
        loginUser(creds.userName, creds.password);
        // once clicked it should redirect to home page 
        // url should change to home page from login 

        cy.url().should("eq", `${Cypress.config().baseUrl}#/`);

        // home page should contins my user name
        cy.contains("emilys");

        cy.visit("#/login");

        cy.url().should("eq", `${Cypress.config().baseUrl}#/`);
    });
})