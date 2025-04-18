import { BACK_END_URL, FRONT_END_URL } from '../../src/config';
import {
  fakeMessagesEmpty,
  fakeMessagesMultiple,
  fakeMessagesSearchResult,
} from '../support/messages';

describe('Messages Get Empty', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BACK_END_URL}/messages?sprintCode=`, fakeMessagesEmpty).as(
      'getMessagesEmpty',
    );
    cy.visit(FRONT_END_URL);
    cy.wait('@getMessagesEmpty');
  });
  it('Displays the "No data" message', () => {
    cy.get('[data-testid="cy-table-loader"]').should('not.exist');
    cy.get('[data-testid="cy-table-error"]').should('not.exist');
    cy.get('[data-testid="cy-table-no-data"]').should('be.visible').and('contain', 'No data');
  });
});

describe('Messages Get Not Empty', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BACK_END_URL}/messages?sprintCode=`, fakeMessagesMultiple).as(
      'getMessagesNotEmpty',
    );
    cy.visit(FRONT_END_URL);
    cy.wait('@getMessagesNotEmpty');
  });
  it('Displays the messages data', () => {
    cy.get('[data-testid="cy-table-loader"]').should('not.exist');
    cy.get('[data-testid="cy-table-error"]').should('not.exist');
    cy.get('[data-testid="cy-table-no-data"]').should('not.exist');
  });
});

describe('Messages Search', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BACK_END_URL}/messages?sprintCode=test2`, fakeMessagesSearchResult).as(
      'getMessagesTest2',
    );
    cy.visit(FRONT_END_URL);
  });

  it('Displays only messages for sprintCode=test2', () => {
    cy.get('[data-testid="cy-message-search-input"]').type('test2');
    cy.get('[data-testid="cy-message-search-btn"]').click();
    cy.get('[data-testid="cy-table-loader"]').should('not.exist');
    cy.get('[data-testid="cy-table-error"]').should('not.exist');
    cy.get('[data-testid="cy-table-no-data"]').should('not.exist');
    cy.contains('tester2').should('be.visible');
    cy.contains('test2').should('be.visible');
  });
});
