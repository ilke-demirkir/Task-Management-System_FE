/// <reference types="cypress" />

describe('Notification UI', () => {
  beforeEach(() => {
    // Replace with your login command or logic
    // cy.login('user@example.com', 'password');
    cy.visit('/');
    // Optionally, seed notifications via API or fixture if your backend supports it
    // cy.request('POST', '/api/test/seed-notifications', { userId: 1 });
  });

  it('shows a badge on the notification bell when there are unread notifications', () => {
    cy.get('[data-cy=notification-bell]').should('exist');
    cy.get('[data-cy=notification-badge]').should('be.visible');
  });

  it('displays notifications when the bell is clicked', () => {
    cy.get('[data-cy=notification-bell]').click();
    cy.get('[data-cy=notification-list]').should('be.visible');
    cy.get('[data-cy=notification-item]').should('have.length.at.least', 1);
  });

  it('marks notification as read when clicked', () => {
    cy.get('[data-cy=notification-bell]').click();
    cy.get('[data-cy=notification-item]').first().click();
    cy.get('[data-cy=notification-badge]').should('not.exist');
  });
});

describe('Toast Notifications', () => {
  beforeEach(() => {
    // cy.login('user@example.com', 'password');
    cy.visit('/');
  });

  it('shows a toast when a new notification is received', () => {
    // Simulate a new notification event (customize as needed for your app)
    cy.window().then(win => {
      win.dispatchEvent(new CustomEvent('new-notification', { detail: { message: 'Test Notification' } }));
    });
    cy.get('[data-cy=toast]').should('contain', 'Test Notification');
  });
}); 