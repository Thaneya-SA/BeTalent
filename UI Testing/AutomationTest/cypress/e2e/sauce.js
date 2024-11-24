describe('Teste de Login - Credencial Válida', () => {
    it('Deve logar com sucesso com credenciais válidas', () => {
      cy.visit('/');
      cy.get('[data-test="username"]').type(Cypress.env('username'));
      cy.get('[data-test="password"]').type(Cypress.env('password'));
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    });
  });

  describe('Teste de Login - Credencial Inválida', () => {
    it('Deve exibir mensagem de erro para credenciais inválidas', () => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('usuario_invalido');
      cy.get('[data-test="password"]').type('senha_invalida');
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface');
    });
  });

  describe('Teste de Navegação de Produtos', () => {
    before(() => {
      cy.login(); // Função personalizada de login (veja abaixo como criar)
    });
  
    it('Deve listar todos os produtos com nome, imagem e preço visíveis', () => {
      cy.get('.inventory_item').should('have.length.greaterThan', 0);
      cy.get('.inventory_item').each(($item) => {
        cy.wrap($item).find('.inventory_item_name').should('be.visible');
        cy.wrap($item).find('.inventory_item_img').should('be.visible');
        cy.wrap($item).find('.inventory_item_price').should('be.visible');
      });
    });
  });

  describe('Teste de Adição de Produto ao Carrinho', () => {
    before(() => {
      cy.login();
    });
  
    it('Deve adicionar um produto ao carrinho e atualizar o ícone do carrinho', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  });

  describe('Teste de Remoção de Produto do Carrinho', () => {
    before(() => {
      cy.login();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });
  
    it('Deve remover um produto do carrinho', () => {
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="remove-sauce-labs-backpack"]').click();
      cy.get('.cart_item').should('not.exist');
    });
  });

  describe('Teste de Processo de Checkout', () => {
    before(() => {
      cy.login();
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });
  
    it('Deve completar o processo de checkout com sucesso', () => {
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="finish"]').click();
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
  });

  describe('Teste de Logout', () => {
    before(() => {
      cy.login();
    });
  
    it('Deve realizar logout e redirecionar para a tela de login', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('eq', Cypress.config('baseUrl') + '/');
    });
  });