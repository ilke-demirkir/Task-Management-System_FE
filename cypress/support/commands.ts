/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login with email and password
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[formControlName="email"]').type(email)
  cy.get('[formControlName="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('not.include', '/login')
})

// Login as regular user
Cypress.Commands.add('loginAsUser', () => {
  const { email, password } = Cypress.env('testUser')
  cy.login(email, password)
})

// Login as admin user
Cypress.Commands.add('loginAsAdmin', () => {
  const { email, password } = Cypress.env('adminUser')
  cy.login(email, password)
})

// Logout
Cypress.Commands.add('logout', () => {
  // Clear localStorage to simulate logout
  cy.clearLocalStorage()
  cy.visit('/login')
})

// Create a test task
Cypress.Commands.add('createTask', (taskData: any) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/tasks`,
    body: taskData,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    }
  })
})

// Create a test project
Cypress.Commands.add('createProject', (projectData: any) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/projects`,
    body: projectData,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    }
  })
})

// Clear test data (useful for cleanup)
Cypress.Commands.add('clearTestData', () => {
  // This would typically call your backend cleanup endpoints
  // For now, we'll just clear localStorage
  cy.clearLocalStorage()
})