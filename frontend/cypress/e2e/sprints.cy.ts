import { BACK_END_URL, FRONT_END_URL } from '../../src/config';
import { fakeNewSprintCode, fakeNewSprintTitle } from '../support/sprints';

describe('Sprints Get', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BACK_END_URL}/sprints*`).as('getSprints');
    cy.visit(`${FRONT_END_URL}sprints`);
    cy.wait('@getSprints');
  });
  it('Displays the sprints', () => {
    cy.get('[data-testid="cy-table-loader"]').should('not.exist');
    cy.get('[data-testid="cy-table-error"]').should('not.exist');
  });
});

describe('Create new sprint', () => {
  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}sprints`);
    cy.get('[data-testid="cy-add-sprint-btn"]').should('exist');
    cy.get('[data-testid="cy-add-sprint-btn"]').click();
  });

  it('Set fields and click create new sprint', () => {
    cy.get('[data-testid="cy-new-sprintCode-field"]').type(fakeNewSprintCode);
    cy.get('[data-testid="cy-new-sprintTitle-field"]').type(fakeNewSprintTitle);
    cy.get('[data-testid="cy-confirm-create-sprint-btn"]').click();
  });
});

describe('Update sprint', () => {
  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}sprints`);
    cy.get('[data-testid="cy-update-sprint-btn"]').first().should('exist');
    cy.get('[data-testid="cy-update-sprint-btn"]').first().click();
  });

  it('Set new fields and update sprint', () => {
    cy.get('[data-testid="cy-update-sprintCode-field"]').type(`${fakeNewSprintCode}U`);
    cy.get('[data-testid="cy-update-sprintTitle-field"]').type(`${fakeNewSprintCode}U`);
    cy.get('[data-testid="cy-confirm-update-sprint-btn"]').click();
  });
});
describe('Delete sprint', () => {
  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}sprints`);
    cy.get('[data-testid="cy-delete-sprint-btn"]').first().should('exist');
    cy.get('[data-testid="cy-delete-sprint-btn"]').first().click();
  });

  it('Confirmed to delete sprint', () => {
    cy.get('[data-testid="cy-confirm-delete-sprint-btn"]').click();
  });
});
