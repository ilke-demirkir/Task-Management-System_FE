describe('Authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('should display login page', () => {
    cy.visit('/login')
    cy.get('[formControlName="email"]').should('be.visible')
    cy.get('[formControlName="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should login successfully with valid credentials', () => {
    cy.loginAsUser()
    cy.url().should('not.include', '/login')
    // Should redirect to a protected page or dashboard
  })

  it('should show error with invalid credentials', () => {
    cy.visit('/login')
    cy.get('[formControlName="email"]').type('invalid@example.com')
    cy.get('[formControlName="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    
    // Should show error message
    cy.get('.error').should('be.visible')
  })

  it('should logout successfully', () => {
    cy.loginAsUser()
    cy.logout()
    cy.url().should('include', '/login')
  })

  it('should redirect to login when accessing protected routes without auth', () => {
    cy.visit('/tasks')
    cy.url().should('include', '/login')
  })
}) 