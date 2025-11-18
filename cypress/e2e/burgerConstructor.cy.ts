describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user' });
    cy.intercept('POST', '/api/orders', { fixture: 'order' });
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit('http://localhost:4000');
    // find bun item
    const bunTestId = 'itemIngredient_bun1';
    cy.get(`li[data-testid=${bunTestId}]`).should('be.visible').as('bun1');
  });

  it('add bun and main ingredients', () => {
    // add the bun
    cy.get('@bun1').find('button').should('be.visible').click();

    // check top bun
    cy.get('[data-testid=constructorTop]')
      .should('be.visible')
      .should('contain.text', 'TestBun1Name')
      .should('contain.text', '(верх)');

    // check bottom bun
    cy.get('[data-testid=constructorBottom]')
      .should('be.visible')
      .should('contain.text', 'TestBun1Name')
      .should('contain.text', '(низ)');

    cy.get('li[data-testid=itemIngredient_ingr1] button')
      .should('be.visible')
      .click();
    cy.get('li[data-testid=itemIngredient_sauce1] button')
      .should('be.visible')
      .click();

    // check items block
    cy.get('[data-testid=constructorItems]')
      .should('be.visible')
      .find('li')
      .should('have.length', 2)
      .as('items');

    // check ingredients
    cy.get('@items').eq(0).should('contain.text', 'TestIngredient1Name');
    cy.get('@items').eq(1).should('contain.text', 'TestSauce1Name');
  });

  describe('Test modal', () => {
    beforeEach(() => {
      // click on the bun
      cy.get('@bun1').find('a').should('be.visible').click();

      // find modal
      cy.get('[data-testid=modalContent]')
        .should('be.visible')
        .should('contain.text', 'TestBun1Name')
        .as('modalContent');

      // check the title
      cy.get('@modalContent')
        .find('[data-testid=modalTitle]')
        .should('contain.text', 'Детали ингредиента');
    });

    it('open ingredient modal and close by the button', () => {
      cy.get('@modalContent')
        .find('button[data-testid=modalCloseButton]')
        .should('be.visible')
        .click();

      // modal is closed
      cy.get('[data-testid=modalContent]').should('not.exist');
    });

    it('open ingredient modal and close by the overlay click', () => {
      cy.get('[data-testid=modalOverlay]')
        .should('exist')
        .click(0, 0, { force: true });

      // modal is closed
      cy.get('[data-testid=modalContent]').should('not.exist');
    });
  });

  it('create new order', () => {
    const TestOrderNumber = '123456';

    // add the bun
    cy.get('@bun1').find('button').should('be.visible').click();

    // add 2 ingredients
    cy.get('li[data-testid=itemIngredient_ingr1] button')
      .should('be.visible')
      .click();
    cy.get('li[data-testid=itemIngredient_sauce1] button')
      .should('be.visible')
      .click();

    cy.get('[data-testid=orderBottomContainer] button')
      .should('be.visible')
      .click();

    // find modal
    cy.get('[data-testid=modalContent]')
      .should('be.visible')
      .should('contain.text', TestOrderNumber)
      .as('modalContent');

    // close modal
    cy.get('@modalContent')
      .find('button[data-testid=modalCloseButton]')
      .should('be.visible')
      .click();

    // check top bun
    cy.get('[data-testid=constructorTopEmpty]').should('be.visible');

    // check bottom bun
    cy.get('[data-testid=constructorBottomEmpty]').should('be.visible');

    // check items block
    cy.get('[data-testid=constructorItems]')
      .should('be.visible')
      .should('contain.text', 'Выберите начинку')
      .find('li')
      .should('have.length', 0);
  });
});
