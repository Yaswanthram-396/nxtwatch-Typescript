
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
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
});

describe('Home Page', () => {
  beforeEach(() => {
   
    cy.intercept('POST', 'https://apis.ccbp.in/login', {
      statusCode: 200,
      body: { jwt_token: 'mocked_jwt_token' },
    }).as('loginRequest');

    cy.visit('/');
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.contains('Login').click();

    cy.wait('@loginRequest');

    cy.url().should('include', '/NxtWatch/Home');
  });

  it('should display the home page', () => {
    cy.get('nav').should('be.visible');
  });
  
  it("api call error", () => {
    cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=', {
      statusCode: 401,
      body: {},
    });
    cy.visit('/NxtWatch/Home');
    cy.contains('No Search results found').should('be.visible');});

  it('videos api call', () => {
    cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=', {
      statusCode: 200,
      body: {
        videos: [
          {
            id: "1",
            title: "Test Video",
            thumbnail_url: "sample.jpg",
            channel: { name: "Test Channel", profile_image_url: "profile.jpg" },  
            view_count: 1000,
            published_at: "2022-01-01T00:00:00Z",
          },
        ],
      },
    });
    cy.visit('/NxtWatch/Home');
    cy.contains('Test Video').should('be.visible');
  });
  it("videos search",()=>{
    cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=Nxtwave', {
      statusCode: 200,
      body: {
        videos: [
          {
            id: "1",
            title: "Nxtwave",
            thumbnail_url: "sample.jpg",
            channel: { name: "Test Channel", profile_image_url: "profile.jpg" },  
            view_count: 1000,
            published_at: "2022-01-01T00:00:00Z",
          },
        ],
      },
    });
    cy.visit('/NxtWatch/Home');
    cy.get('input[placeholder="Search"]').type('Nxtwave').should('have.value', 'Nxtwave');
    // 
    cy.get('[data-testid="search-videos"]').should('exist').click();
    cy.contains('Nxtwave').should('be.visible');
  })
  it("videos search error",()=>{
    cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=Nxtwave', {
      statusCode: 401,
      body: {
        
      },
    });
    cy.visit('/NxtWatch/Home');
    cy.get('input[placeholder="Search"]').type('Nxtwave').should('have.value', 'Nxtwave');
    // 
    cy.get('[data-testid="search-videos"]').should('exist').click();
    cy.contains('No Search results found').should('be.visible');
  })
  it("confirm the logout",()=>{
    cy.visit('/NxtWatch/Home');
    cy.get('[data-testid="logout-button-nav"]').click();
    cy.contains('Are you sure you want to logout?').should('be.visible');
    cy.get('[data-testid="cancel-button"]').click();
    cy.contains('Are you sure you want to logout?').should('not.exist');
    cy.get('[data-testid="logout-button-nav"]').click();
    cy.contains('Are you sure you want to logout?').should('be.visible');
    cy.get('[data-testid="confirm-button"]').click();
    cy.url().should('include', '/');
  })
});
describe("Navbar Component", () => {
  beforeEach(() => {
   
    cy.intercept('POST', 'https://apis.ccbp.in/login', {
      statusCode: 200,
      body: { jwt_token: 'mocked_jwt_token' },
    }).as('loginRequest');

    cy.visit('/');
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.contains('Login').click();

    cy.wait('@loginRequest');

    cy.url().should('include', '/NxtWatch/Home');
  });


  it("should render the navigation bar with necessary elements", () => {
    cy.get("nav").should("exist");
    cy.get("button").should("exist");
  });

  it("should toggle theme mode when clicking moon and sun icons", () => {
    cy.get('[data-testid="lightMode"]').should("exist");
    cy.get('[alt="lightmodelogo"]').should("exist");
    
    cy.get('[data-testid="theme-icon"]').click();

    cy.get('[data-testid="darkMode"]').should("exist");
    cy.get('[alt="darkmodelogo"]').should("exist");
  });

  it("should open the logout confirmation panel on clicking logout button (without confirming)", () => {
    cy.get("button").contains("Log out").click();
    cy.contains("Confirm").should("exist");
    cy.contains("Cancel").should("exist");
  });

  it("should apply correct logout panel styles", () => {
    cy.viewport(375, 812); 
    cy.get('[data-testid="logout-svg"]').click();
    
    cy.get('[data-testid="panel-props"]').should("have.css", "display", "block");
    cy.get('[data-testid="closeIcon-sidebar"]').click();
    cy.get('[data-testid="panel-props"]').should("have.css", "display", "none");
  });

  it("should apply correct logout panel styles in mobile view", () => {
    cy.viewport(375, 812); 
    
    cy.get('[data-testid="lightMode"]').should("exist");
    cy.get('[data-testid="theme-icon"]').click();

    cy.get('[data-testid="darkMode"]').should("exist");
  });

  it("should display the logout popup correctly in mobile view", () => {
    cy.viewport(375, 812); 

    cy.get('[data-testid="logout-popup"]').click();
    cy.contains("Are you sure you want to logout?").should("exist");
  });
});
describe("VideosInHome Component", () => {
  beforeEach(() => {
   
    cy.intercept('POST', 'https://apis.ccbp.in/login', {
      statusCode: 200,
      body: { jwt_token: 'mocked_jwt_token' },
    }).as('loginRequest');

    cy.visit('/');
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.contains('Login').click();

    cy.wait('@loginRequest');

    cy.url().should('include', '/NxtWatch/Home');
  });

  it("should render the Ad com and close", () => {
    cy.contains("Buy Nxt Watch Premium prepaid plans with UPI").should("exist");
    cy.get('[data-testid="close-icon"]').click();
    cy.contains("Buy Nxt Watch Premium prepaid plans with UPI").should("not.exist");
  });



  it("should toggle between light and dark mode", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("mode", "light"); 
    });

    cy.get('[data-testid="sidebar-content"]').should("have.css", "background-color", "rgb(255, 255, 255)"); 


    cy.window().then((win) => {
      win.localStorage.setItem("mode", "dark");
    });

    cy.reload();
    cy.get('[data-testid="sidebar-content"]').should("have.css", "background-color", "rgb(0, 0, 0)"); 
  });
});


