describe('Role-Based Access Control', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('should allow admin to access all features', () => {
    cy.loginAsAdmin()
    
    // Admin should be able to access all routes
    cy.visit('/tasks')
    cy.url().should('include', '/tasks')
    
    cy.visit('/projects')
    cy.url().should('include', '/projects')
    
    cy.visit('/users')
    cy.url().should('include', '/users')
    
    cy.visit('/tenants')
    cy.url().should('include', '/tenants')
  })

  it('should allow regular user to access basic features', () => {
    cy.loginAsUser()
    
    // Regular user should access basic features
    cy.visit('/tasks')
    cy.url().should('include', '/tasks')
    
    cy.visit('/projects')
    cy.url().should('include', '/projects')
    
    // But not admin features
    cy.visit('/users')
    cy.url().should('not.include', '/users')
    
    cy.visit('/tenants')
    cy.url().should('not.include', '/tenants')
  })

  it('should show appropriate UI elements based on role', () => {
    cy.loginAsAdmin()
    cy.visit('/tasks')
    
    // Admin should see create buttons
    cy.get('a[href*="/create"]').should('be.visible')
    cy.get('button').contains('Create').should('be.visible')
    
    // Admin should see edit/delete options
    cy.get('tbody tr').first().should('contain', 'Edit')
  })

  it('should restrict create access based on role', () => {
    cy.loginAsUser()
    cy.visit('/projects/create')
    
    // Regular user should not be able to create projects
    cy.url().should('not.include', '/projects/create')
    // Should redirect to login or show access denied
  })

  it('should show role-specific navigation', () => {
    cy.loginAsAdmin()
    cy.visit('/')
    
    // Admin should see admin navigation items
    cy.get('nav').should('contain', 'Users')
    cy.get('nav').should('contain', 'Tenants')
    
    cy.loginAsUser()
    cy.visit('/')
    
    // Regular user should not see admin items
    cy.get('nav').should('not.contain', 'Users')
    cy.get('nav').should('not.contain', 'Tenants')
  })

  it('should handle unauthorized access gracefully', () => {
    // Try to access admin routes without proper role
    cy.loginAsUser()
    cy.visit('/users')
    
    // Should show access denied or redirect
    cy.get('body').should('contain', 'Access Denied')
  })
}) 