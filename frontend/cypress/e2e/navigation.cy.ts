import { FRONT_END_URL } from '../../src/config';
import { fakeNavigation } from '../support/navigation';

describe('Navigation Tests', () => {
  fakeNavigation.forEach((data) => {
    describe(`Navigate to ${data.name} Page`, () => {
      it(`should visit the ${data.name} page and verify the correct URL`, () => {
        cy.visit(`${FRONT_END_URL}${data.path}`);
        cy.url().should('include', data.path);
      });
    });
  });
});
