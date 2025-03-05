describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/'); // Adjust the URL as per your routing setup
    });
  
    it('should display the login page with necessary fields', () => {
      cy.get('input[placeholder="Username"]').should('exist');
      cy.get('input[placeholder="Password"]').should('exist');
      cy.get('input[type="checkbox"]').should('exist');
      cy.contains('Login').should('exist');
    });
  
    it('should allow the user to type username and password', () => {
      cy.get('input[placeholder="Username"]').type('testuser').should('have.value', 'testuser');
      cy.get('input[placeholder="Password"]').type('password123').should('have.value', 'password123');
    });
  
    it('should toggle password visibility', () => {
      cy.get('input[placeholder="Password"]').type('password123');
      cy.get('input[type="checkbox"]').click();
      cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');
    });
  
    it('should show an error message when incorrect credentials are entered', () => {
      cy.intercept('POST', 'https://apis.ccbp.in/login', {
        statusCode: 401,
        body: {},
      });
      
      cy.get('input[placeholder="Username"]').type('wronguser');
      cy.get('input[placeholder="Password"]').type('wrongpassword');
      cy.contains('Login').click();
      
      cy.get('[data-testid="Password-didn\'t-match"]').should('be.visible');
    });
  
    it('should store JWT token and redirect on successful login', () => {
      cy.intercept('POST', 'https://apis.ccbp.in/login', {
        statusCode: 200,
        body: { jwt_token: 'mocked_jwt_token' },
      });
      
      cy.get('input[placeholder="Username"]').type('testuser');
      cy.get('input[placeholder="Password"]').type('password123');
      cy.contains('Login').click();
      
      cy.wait(500); // Wait for state update
      cy.window().then((win) => {
        expect(win.document.cookie).to.include('jwt_token=mocked_jwt_token');
      });
      cy.url().should('include', '/NxtWatch/Home');
    });
  });
