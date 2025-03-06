

// describe('Login Page', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   it('should display the login page with necessary fields', () => {
//     cy.get('input[placeholder="Username"]').should('exist');
//     cy.get('input[placeholder="Password"]').should('exist');
//     cy.get('input[type="checkbox"]').should('exist');
//     cy.contains('Login').should('exist');
//   });

//   it('should allow the user to type username and password', () => {
//     cy.get('input[placeholder="Username"]').type('testuser').should('have.value', 'testuser');
//     cy.get('input[placeholder="Password"]').type('password123').should('have.value', 'password123');
//   });

//   it('should toggle password visibility', () => {
//     cy.get('input[placeholder="Password"]').type('password123');
//     cy.get('input[type="checkbox"]').click();
//     cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');
//   });

//   it('should show an error message when incorrect credentials are entered', () => {
//     cy.intercept('POST', 'https://apis.ccbp.in/login', {
//       statusCode: 401,
//       body: {},
//     });

//     cy.get('input[placeholder="Username"]').type('wronguser');
//     cy.get('input[placeholder="Password"]').type('wrongpassword');
//     cy.contains('Login').click();

//     cy.get('[data-testid="Password-didn\'t-match"]').should('be.visible');
//   });
// });

// describe('Home Page', () => {
//   beforeEach(() => {
   
//     cy.intercept('POST', 'https://apis.ccbp.in/login', {
//       statusCode: 200,
//       body: { jwt_token: 'mocked_jwt_token' },
//     }).as('loginRequest');

//     cy.visit('/');
//     cy.get('input[placeholder="Username"]').type('testuser');
//     cy.get('input[placeholder="Password"]').type('password123');
//     cy.contains('Login').click();

//     cy.wait('@loginRequest');

//     cy.url().should('include', '/NxtWatch/Home');
//   });

//   it('should display the home page', () => {
//     cy.get('nav').should('be.visible');
//   });
  
//   it("api call error", () => {
//     cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=', {
//       statusCode: 401,
//       body: {},
//     });
//     cy.visit('/NxtWatch/Home');
//     cy.contains('No Search results found').should('be.visible');});

//   it('videos api call', () => {
//     cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=', {
//       statusCode: 200,
//       body: {
//         videos: [
//           {
//             id: "1",
//             title: "Test Video",
//             thumbnail_url: "sample.jpg",
//             channel: { name: "Test Channel", profile_image_url: "profile.jpg" },  
//             view_count: 1000,
//             published_at: "2022-01-01T00:00:00Z",
//           },
//         ],
//       },
//     });
//     cy.visit('/NxtWatch/Home');
//     cy.contains('Test Video').should('be.visible');
//   });
//   it("videos search",()=>{
//     cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=Nxtwave', {
//       statusCode: 200,
//       body: {
//         videos: [
//           {
//             id: "1",
//             title: "Nxtwave",
//             thumbnail_url: "sample.jpg",
//             channel: { name: "Test Channel", profile_image_url: "profile.jpg" },  
//             view_count: 1000,
//             published_at: "2022-01-01T00:00:00Z",
//           },
//         ],
//       },
//     });
//     cy.visit('/NxtWatch/Home');
//     cy.get('input[placeholder="Search"]').type('Nxtwave').should('have.value', 'Nxtwave'); 
//     cy.get('[data-testid="search-videos"]').should('exist').click();
//     cy.contains('Nxtwave').should('be.visible');
//   })
//   it("videos search error",()=>{
//     cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=Nxtwave', {
//       statusCode: 401,
//       body: {
//       },
//     });
//     cy.visit('/NxtWatch/Home');
//     cy.get('input[placeholder="Search"]').type('Nxtwave').should('have.value', 'Nxtwave');
//     cy.get('[data-testid="search-videos"]').should('exist').click();
//     cy.contains('No Search results found').should('be.visible');
//   })
//   it("confirm the logout",()=>{
//     cy.get("button").contains("Log out").click();
//     cy.contains('Are you sure you want to logout?').should('be.visible');
//     cy.get("button").contains("Cancel").click();
//         cy.contains('Are you sure you want to logout?').should("not.exist");


//     cy.get("button").contains("Log out").click();
//     cy.contains('Are you sure you want to logout?').should('be.visible');
//     cy.get("button").contains("Confirm").click();
//     cy.url().should('include', '/');})
// });
// describe("Navbar Component", () => {
//   beforeEach(() => {
   
//     cy.intercept('POST', 'https://apis.ccbp.in/login', {
//       statusCode: 200,
//       body: { jwt_token: 'mocked_jwt_token' },
//     }).as('loginRequest');

//     cy.visit('/');
//     cy.get('input[placeholder="Username"]').type('testuser');
//     cy.get('input[placeholder="Password"]').type('password123');
//     cy.contains('Login').click();

//     cy.wait('@loginRequest');

//     cy.url().should('include', '/NxtWatch/Home');
//   });


//   it("should render the navigation bar with necessary elements", () => {
//     cy.get("nav").should("exist");
//     cy.get("button").should("exist");
//   });

//   it("should toggle theme mode when clicking moon and sun icons", () => {
//     cy.get('[data-testid="lightMode"]').should("exist");
//     cy.get('[alt="lightmodelogo"]').should("exist");
    
//     cy.get('[data-testid="theme-icon"]').click();

//     cy.get('[data-testid="darkMode"]').should("exist");
//     cy.get('[alt="darkmodelogo"]').should("exist");
//   });

//   it("should open the logout confirmation panel on clicking logout button (without confirming)", () => {
//     cy.get("button").contains("Log out").click();
//     cy.contains("Confirm").should("exist");
//     cy.contains("Cancel").should("exist");
//   });

//   it("should apply correct logout panel styles", () => {
//     cy.viewport(375, 812); 
//     cy.get('[data-testid="logout-svg"]').click();
    
//     cy.get('[data-testid="panel-props"]').should("have.css", "display", "block");
//     cy.get('[data-testid="closeIcon-sidebar"]').click();
//     cy.get('[data-testid="panel-props"]').should("have.css", "display", "none");
//   });

//   it("should apply correct logout panel styles in mobile view", () => {
//     cy.viewport(375, 812); 
    
//     cy.get('[data-testid="lightMode"]').should("exist");
//     cy.get('[data-testid="theme-icon"]').click();

//     cy.get('[data-testid="darkMode"]').should("exist");
//   });

//   it("should display the logout popup correctly in mobile view", () => {
//     cy.viewport(375, 812); 

//     cy.get('[data-testid="logout-popup"]').click();
//     cy.contains("Are you sure you want to logout?").should("exist");
//   });
// });
// describe("VideosInHome Component", () => {
//   beforeEach(() => {
   
//     cy.intercept('POST', 'https://apis.ccbp.in/login', {
//       statusCode: 200,
//       body: { jwt_token: 'mocked_jwt_token' },
//     }).as('loginRequest');

//     cy.visit('/');
//     cy.get('input[placeholder="Username"]').type('testuser');
//     cy.get('input[placeholder="Password"]').type('password123');
//     cy.contains('Login').click();

//     cy.wait('@loginRequest');

//     cy.url().should('include', '/NxtWatch/Home');
//   });

//   it("should render the Ad com and close", () => {
//     cy.contains("Buy Nxt Watch Premium prepaid plans with UPI").should("exist");
//     cy.get('[data-testid="close-icon"]').click();
//     cy.contains("Buy Nxt Watch Premium prepaid plans with UPI").should("not.exist");
//   });



//   it("should toggle between light and dark mode", () => {
//     cy.window().then((win) => {
//       win.localStorage.setItem("mode", "light"); 
//     });

//     cy.get('[data-testid="sidebar-content"]').should("have.css", "background-color", "rgb(255, 255, 255)"); 


//     cy.window().then((win) => {
//       win.localStorage.setItem("mode", "dark");
//     });
//     // theme-icon
//     cy.get('[data-testid="theme-icon"]').click();

//     cy.reload();
//     cy.get('[data-testid="theme-icon"]').click();

//     cy.get('[data-testid="sidebar-content"]').should("have.css", "background-color", "rgb(0, 0, 0)"); 
//   });
// });
// describe("SidePanel Component", () => {
//   beforeEach(() => {
   
//     cy.intercept('POST', 'https://apis.ccbp.in/login', {
//       statusCode: 200,
//       body: { jwt_token: 'mocked_jwt_token' },
//     }).as('loginRequest');

//     cy.visit('/');
//     cy.get('input[placeholder="Username"]').type('testuser');
//     cy.get('input[placeholder="Password"]').type('password123');
//     cy.contains('Login').click();

//     cy.wait('@loginRequest');

//     cy.url().should('include', '/NxtWatch/Home');
//   });

//   it("Navigates to all pages in sidebar by clicking the links", () => {
//     cy.get('[data-testid="home-sidebar"]').click();
//     cy.url().should('include', '/NxtWatch/Home');

    
//     cy.get('[data-testid="trending-sidebar"]').click();
//     cy.url().should('include', '/NxtWatch/Trending');


//     cy.get('[data-testid="gaming-sidebar"]').click();
//     cy.url().should('include', '/NxtWatch/Gaming');


//     cy.get('[data-testid="saved-sidebar"]').click();
//     cy.url().should('include', '/NxtWatch/Saved');


//   });

//   it("Navigates to all pages in panel in mobile by clicking the links", () => {
//     cy.viewport(375, 812); 
    
//     cy.get('[data-testid="logout-svg"]').click();
//     cy.get('[data-testid="home-panel"]').click();
//     cy.url().should('include', '/NxtWatch/Home');
    
//     cy.get('[data-testid="logout-svg"]').click()   
//     cy.get('[data-testid="trending-panel"]').click();
//     cy.url().should('include', '/NxtWatch/Trending');
 
//     cy.get('[data-testid="logout-svg"]').click();
//     cy.get('[data-testid="gaming-panel"]').click();
//     cy.url().should('include', '/NxtWatch/Gaming');

//     cy.get('[data-testid="logout-svg"]').click();
//     cy.get('[data-testid="saved-panel"]').click();
//     cy.url().should('include', '/NxtWatch/Saved');
//   });

//   it("Closes sidebar when close icon is clicked", () => {
//     cy.viewport(375, 812); 
//     cy.get('[data-testid="logout-svg"]').click();
//     cy.get('[data-testid="panel-props"]').should("have.css", "display", "block");

//     cy.get('[data-testid="closeIcon-sidebar"]').click();
//     cy.get('[data-testid="panel-props"]').should("have.css", "display", "none");
//   });
// });

// describe("Trending Component", () => {
//   beforeEach(() => {
//     cy.intercept("POST", "https://apis.ccbp.in/login", {
//       statusCode: 200,
//       body: { jwt_token: "mocked_jwt_token" },
//     }).as("loginRequest");

//     cy.visit("/");
//     cy.get('input[placeholder="Username"]').type("testuser");
//     cy.get('input[placeholder="Password"]').type("password123");
//     cy.contains("Login").click();

//     cy.wait("@loginRequest");

//     cy.url().should("include", "/NxtWatch/Home");

//     cy.intercept("GET", "**/videos/trending", {
//       statusCode: 200,
//       body: {
//         videos: [
//           {
//             channel: {
//               name: "iB Hubs",
//               profile_image_url:
//                 "https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-hubs-img.png",
//             },
//             id: "ad9822d2-5763-41d9-adaf-baf9da3fd490",
//             published_at: "Nov 29, 2016",
//             thumbnail_url:
//               "https://assets.ccbp.in/frontend/react-js/nxt-watch/ibhubs-img.png",
//             title: "iB Hubs Announcement Event",
//             view_count: "26K",
//           },
//         ],
//       },
//     }).as("apiCall");

//     cy.get('[data-testid="trending-sidebar"]').click();
//     cy.url().should("include", "/NxtWatch/Trending");
//   });

//   it("renders Trending text and applies theme mode correctly", () => {
//     cy.wait("@apiCall");

//     cy.contains("iB Hubs").should("be.visible");
//     cy.contains("Nov 29, 2016").should("be.visible");
//     cy.contains("iB Hubs Announcement Event").should("be.visible");
//     cy.contains(/26K/i).should("be.visible");
//     cy.get("h1").contains("Trending").should("be.visible");

//     cy.get('[data-testid="trending-mode"]').should(
//       "have.css",
//       "background-color",
//       "rgb(241, 241, 241)"
//     );

//     cy.get('[data-testid="theme-icon"]').click();

//     cy.get('[data-testid="trending-mode"]').should(
//       "have.css",
//       "background-color",
//       "rgb(24, 24, 24)"
//     );
//   });

//   it("handles API error", () => {
//     cy.intercept("GET", "**/videos/trending", {
//       statusCode: 401,
//       body: {},
//     }).as("apiError");

//     cy.reload();
//     cy.wait("@apiError");

//     cy.contains("Something went wrong. Please try again!").should("be.visible");
//   });
// });

// describe("Gaming Component", () => {
//   beforeEach(() => {
//     cy.intercept("POST", "https://apis.ccbp.in/login", {
//       statusCode: 200,
//       body: { jwt_token: "mocked_jwt_token" },
//     }).as("loginRequest");

//     cy.visit("/");
//     cy.get('input[placeholder="Username"]').type("testuser");
//     cy.get('input[placeholder="Password"]').type("password123");
//     cy.contains("Login").click();

//     cy.wait("@loginRequest");

//     cy.url().should("include", "/NxtWatch/Home");

//     cy.intercept("GET", "**/videos/gaming", {
//       statusCode: 200,
//       body: {
//         videos: [
//           {
//             id: "b214dc8a-b126-4d15-8523-d37404318347",
//             thumbnail_url:
//               "https://assets.ccbp.in/frontend/react-js/nxt-watch/drop-stack-ball-img.png",
//             title: "Drop Stack Ball",
//             view_count: "44K",
//           },
//         ],
//       },
//     }).as("apiCall");

//     cy.get('[data-testid="gaming-sidebar"]').click();
//     cy.url().should("include", "/NxtWatch/Gaming");
//   });

//   it("renders Gaming text and applies theme mode correctly", () => {
//     cy.wait("@apiCall");

//     cy.contains("Drop Stack Ball").should("be.visible");
//     cy.contains(/44K/i).should("be.visible");
//     cy.get("h1").contains("Gaming").should("be.visible");

//     cy.get('[data-testid="Gaming-mode"]').should(
//       "have.css",
//       "background-color",
//       "rgb(241, 241, 241)"
//     );

//     cy.get('[data-testid="theme-icon"]').click();

//     cy.get('[data-testid="Gaming-mode"]').should(
//       "have.css",
//       "background-color",
//       "rgb(24, 24, 24)"
//     );
//   });

//   it("handles API error", () => {
//     cy.intercept("GET", "**/videos/gaming", {
//       statusCode: 401,
//       body: {},
//     }).as("apiError");

//     cy.reload();
//     cy.wait("@apiError");

//     cy.contains("Something went wrong. Please try again!").should("be.visible");
//   });
// });
// describe("Saved Videos Component", () => {
//   beforeEach(() => {
//     cy.intercept("POST", "https://apis.ccbp.in/login", {
//       statusCode: 200,
//       body: { jwt_token: "mocked_jwt_token" },
//     }).as("loginRequest");

//     cy.visit("/");
//     cy.get('input[placeholder="Username"]').type("testuser");
//     cy.get('input[placeholder="Password"]').type("password123");
//     cy.contains("Login").click();

//     cy.wait("@loginRequest");

//     cy.url().should("include", "/NxtWatch/Home");

//     cy.get('[data-testid="saved-sidebar"]').click();
//     cy.url().should("include", "/NxtWatch/Saved");
//     // cy.visit("/Saved");
//     localStorage.clear();
//   });

//   it("should display saved videos if available", () => {
//     localStorage.setItem(
//       "savedList",
//       JSON.stringify([
//         {
//           id: "video1",
//           thumbnail_url: "thumbnail_url",
//           title: "title",
//           channel: { name: "name" },
//           view_count: "view_count",
//           published_at: "published_at",
//         },
//       ])
//     );

//     cy.reload();
//     cy.get('[data-testid="video1"]').should("exist");
//   });

//   it("should show a message when no saved videos exist", () => {
//     localStorage.setItem("savedList", JSON.stringify([]));

//     cy.reload();
//     cy.contains("No saved videos found").should("exist");
//     cy.contains("You can save your videos while watching them.").should("exist");
//   });
// });
describe("VideoPlayer Component", () => {
  beforeEach(() => {
    // Mock login API
    cy.intercept("POST", "https://apis.ccbp.in/login", {
      statusCode: 200,
      body: { jwt_token: "mocked_jwt_token" },
    }).as("loginRequest");
    
    cy.visit("/");
    cy.get('input[placeholder="Username"]').type("testuser");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.contains("Login").click();
    cy.wait("@loginRequest");
    
    // Store JWT manually to avoid authentication issues
    cy.window().then((win) => {
      win.localStorage.setItem("jwt_token", "mocked_jwt_token");
    });
    
    // Set up video details interception BEFORE visiting the page
    cy.intercept("GET", "https://apis.ccbp.in/videos/1", {
      statusCode: 200,
      body: {
        video_details: {
          id: "1",
          title: "Sample Video",
          video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          view_count: "1M",
          published_at: "2 days ago",
          channel: {
            profile_image_url: "https://test.com/profile.jpg",
            name: "Test Channel",
            subscriber_count: "500K",
          },
          description: "This is a test video description.",
        },
      },
    }).as("getVideoDetails");
    
    // Mock video list API
    cy.intercept("GET", "https://apis.ccbp.in/videos/all?search=", {
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
    }).as("getAllVideos");

    cy.visit("/NxtWatch/Home");
    cy.wait("@getAllVideos");

    cy.contains("Test Video").should("be.visible");
    cy.get('[data-testid="1"]').click();
    
    cy.wait("@getVideoDetails");
  });

  it("checks if video details are displayed", () => {
    cy.contains("Sample Video").should("be.visible");
    cy.contains("Test Channel").should("be.visible");
    cy.contains("1M views").should("be.visible");
    cy.contains("2 days ago").should("be.visible");
    cy.contains("This is a test video description.").should("be.visible");
  });
  
  it("checks if video elements exist", () => {
    cy.get("[data-testid='like']").should("exist");
    cy.get("[data-testid='dislike']").should("exist");
    cy.get("[data-testid='saved-element']").should("exist");
    cy.get("[data-testid='channel-profile-image']").should("exist");
    cy.get("[data-testid='channel-name']").should("exist");
    cy.get("[data-testid='video-description']").should("exist");
    cy.get("[data-testid='view-count']").should("exist");
  });

  it("handles error state when API call fails", () => {
    cy.clearLocalStorage();
  
    cy.intercept("GET", "https://apis.ccbp.in/videos/1", {
      statusCode: 401,
      body: {},
    }).as("getVideoError");
  
    cy.visit("/NxtWatch/watch/1");
  
    cy.wait("@getVideoError", { timeout: 10000 });
  
    cy.contains("Video not available").should("be.visible");
  });
  
  

  it("Clicking Like updates the UI and localStorage", () => {
    cy.get("[data-testid='like']").click();
    cy.get("[data-testid='like']").should("have.css", "color", "rgb(0, 0, 255)");

    cy.window().then((win) => {
      const likeList = JSON.parse(win.localStorage.getItem("likeList") || "[]");
      expect(likeList.length).to.be.greaterThan(0);
    });
  });
});
