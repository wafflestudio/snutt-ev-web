describe('/main 페이지', () => {
  beforeEach(() => {
    cy.visit('/main');
  });

  it('헤더가 존재한다', () => {
    cy.get('[data-testid="app-bar"')
      .should('exist')
      .should('contain.text', '강의평');
  });
});
