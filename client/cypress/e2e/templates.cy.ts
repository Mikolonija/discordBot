import { BACK_END_URL, FRONT_END_URL } from '../../src/config';
import { fakeNewTemplateText } from '../support/templates';

describe('Templates Get', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BACK_END_URL}/templates*`).as('getTemplates');
    cy.visit(`${FRONT_END_URL}templates`);
    cy.wait('@getTemplates');
  });
  it('Displays the templates', () => {
    cy.get('[data-testid="cy-table-loader"]').should('not.exist');
    cy.get('[data-testid="cy-table-error"]').should('not.exist');
  });
});

describe('Create new template', () => {
  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}templates`);
    cy.get('[data-testid="cy-add-template-btn"]').should('exist');
    cy.get('[data-testid="cy-add-template-btn"]').click();
  });

  it('Set field and click create new template', () => {
    cy.get('[data-testid="cy-new-template-text-field"]').type(fakeNewTemplateText, {
      parseSpecialCharSequences: false,
    });
    cy.get('[data-testid="cy-confirm-create-sprint-btn"]').click();
  });
});

describe('Update template', () => {
  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}templates`);
    cy.get('[data-testid="cy-update-template-btn"]').first().should('exist');
    cy.get('[data-testid="cy-update-template-btn"]').first().click();
  });

  it('Update sprint', () => {
    cy.get('[data-testid="cy-update-template-text-field"]').type('test');
    cy.get('[data-testid="cy-confirm-update-template-btn"]').click();
  });
});
describe('Delete sprint', () => {
  beforeEach(() => {
    cy.visit(`${FRONT_END_URL}templates`);
    cy.get('[data-testid="cy-delete-template-btn"]').first().should('exist');
    cy.get('[data-testid="cy-delete-template-btn"]').first().click();
  });

  it('Update sprint', () => {
    cy.get('[data-testid="cy-confirm-delete-template-btn"]').click();
  });
});
