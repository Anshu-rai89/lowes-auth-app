export function loginUser(userName, password) {
    cy.get('input[name="userName"]').type(userName)
    cy.get('input[name="password"]').type(password)

    cy.get("button").contains("Login").click();
}

export function homePageCheck() {
    cy.url().should("eq", `${Cypress.config().baseUrl}#/`);
}

export const creds = {
    userName: "emilys",
    password: "emilyspass"
}