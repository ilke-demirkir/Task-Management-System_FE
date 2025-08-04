describe('Task Management', () => {
  beforeEach(() => {
    cy.loginAsUser()
  })

  it('should display task list page', () => {
    cy.visit('/tasks')
    cy.get('table').should('be.visible')
    cy.get('thead').should('contain', 'Title')
    cy.get('thead').should('contain', 'Description')
    cy.get('thead').should('contain', 'Status')
  })

  it('should create a new task', () => {
    cy.visit('/tasks/create')
    
    // Fill out the form
    cy.get('[formControlName="title"]').type('Test Task')
    cy.get('[formControlName="description"]').type('This is a test task')
    cy.get('[formControlName="dueDate"]').type('2024-12-31')
    cy.get('[formControlName="projectId"]').type('test-project-id')
    cy.get('[formControlName="assignedToId"]').type('test-user-id')
    
    // Submit the form
    cy.get('button[type="submit"]').click()
    
    // Should show success message
    cy.get('.success').should('be.visible')
    cy.get('.success').should('contain', 'Task created!')
  })

  it('should search tasks', () => {
    cy.visit('/tasks')
    
    // Type in search box
    cy.get('app-search-bar input').type('Test Task')
    
    // Should filter results
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

  it('should view task details', () => {
    // First create a task via API
    cy.createTask({
      title: 'Test Task for Details',
      description: 'Task description',
      dueDate: '2024-12-31',
      projectId: 'test-project',
      assignedToId: 'test-user'
    })
    
    cy.visit('/tasks')
    
    // Click on first task to view details
    cy.get('tbody tr').first().click()
    
    // Should show task details
    cy.get('h2').should('contain', 'Test Task for Details')
    cy.get('div').should('contain', 'Task description')
  })

  it('should edit a task', () => {
    // Create a task first
    cy.createTask({
      title: 'Task to Edit',
      description: 'Original description',
      dueDate: '2024-12-31',
      projectId: 'test-project',
      assignedToId: 'test-user'
    })
    
    cy.visit('/tasks')
    cy.get('tbody tr').first().click()
    
    // Navigate to edit page
    cy.url().should('include', '/tasks/')
    cy.url().should('not.include', '/edit')
    
    // Edit the task
    cy.get('[formControlName="title"]').clear().type('Updated Task Title')
    cy.get('[formControlName="description"]').clear().type('Updated description')
    cy.get('button[type="submit"]').click()
    
    // Should show success message
    cy.get('.success').should('contain', 'Task updated!')
  })
}) 