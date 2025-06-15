import { creds, homePageCheck, loginUser } from "../fixtures/login";
describe("Profile Page" ,()=> {
    beforeEach(()=> {
        cy.visit("/");
    })

    it("Should be redirected to login page if logged out user access profile page" ,() => {
        cy.visit("#/profile");

        cy.url().should("include", "/login");
    })
    
    it("should redirected to profile page when clicked on profile for logged in user" ,()=> {
        cy.get("button").contains("Login").click();

        cy.url().should("include", "/login");

        loginUser(creds.userName, creds.password);
         homePageCheck();
        cy.get("a").contains("Profile").should("exist");
        cy.get("a").contains("Profile").click();

        cy.url().should("include", "profile");
        cy.contains(`UserName: ${creds.userName}`)

    })
})