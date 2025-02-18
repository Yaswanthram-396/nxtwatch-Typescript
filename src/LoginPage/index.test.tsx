// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import LoginPage from "./index";
// import Cookies from "js-cookie";
// import { BrowserRouter, useNavigate } from "react-router-dom";
// import Home from "../Home";
// import ConfigurationContext, { ConfigurationContextType } from "../context";


// // delete window.location;
// window.location = { href: "" } as Location; 

// jest.mock("js-cookie", () => ({
//   set: jest.fn(),
// }));

// const mockLocation = { href: "" };
// global.window.location = mockLocation as any;
// const mockNavigate = useNavigate as jest.Mock;
// describe("LoginPgeRender", () => {
//   // beforeAll(() => {
//   //   
//   //   const location = {
//   //     assign: jest.fn(),
//   //     replace: jest.fn(),
//   //     reload: jest.fn(),
//   //     href: "",
//   //   };
    
//   //   // @ts-ignore to bypass TypeScript errors for mocking
//   //   global.window.location = location;
//   // });

  
//   test("rendering the login component", () => {
//    render(<LoginPage />);
//     const getUsername = screen.getByPlaceholderText("Username") as HTMLInputElement;
//     const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
//     const loginButton = screen.getByRole("button", { name: "Login" } )as HTMLButtonElement;
//     expect(getUsername).toBeInTheDocument();
//     expect(getPassword).toBeInTheDocument();
//     expect(loginButton).toBeInTheDocument();
//   });
//   test("changing userName and password", () => {
//    render(<LoginPage /> );
//     const getUsername = screen.getByPlaceholderText("Username") as HTMLInputElement;
//     const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
//     fireEvent.change(getUsername, { target: { value: "rahul" } });
//     fireEvent.change(getPassword, { target: { value: "rahul@2021" } });
//     expect(getUsername.value).toBe("rahul");
//     expect(getPassword.value).toBe("rahul@2021");
//   });
//   test("Check show password click", () => {
//    render(<LoginPage /> );
//     const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
//     const showpassText = screen.getByRole("checkbox") as HTMLInputElement;

//     expect(getPassword.type).toBe("password");
//     fireEvent.click(showpassText);
//     expect(getPassword.type).toBe("text");
//     fireEvent.click(showpassText);
//     expect(getPassword.type).toBe("password");
//   });
//   test("showing an ERROR mesage when user mismatched", async () => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve(
//         new Response(JSON.stringify({ error: "API Error" }), {
//           status: 401, 
          
//         })
//       )
//     );
//    render(<LoginPage /> );
//     const getUsername = screen.getByPlaceholderText("Username") as HTMLInputElement;
//     const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
//     fireEvent.change(getUsername, { target: { value: "test" } });
//     fireEvent.change(getPassword, { target: { value: "testpass" } });
//     const loginButton = screen.getByRole("button", { name: "Login" });
//     fireEvent.click(loginButton);
//     await waitFor(() => {
//       expect(
//         screen.getByText("*Username or Password didn't match")
//       ).toBeInTheDocument();
//     });
//   });


//   test("successful login stores JWT token and redirects", async () => {
//     // Mocking the fetch call to simulate successful login
//     global.fetch = jest.fn(() =>
//       Promise.resolve(
//         new Response(
//           JSON.stringify({ jwt_token: "mock-jwt-token" }),
//           { status: 200 }
//         )
//       )
//     ) as jest.Mock;
//     const mockContextValue: ConfigurationContextType = { 
//       savedList: [],
//       mode: false,
//       pagein: "Home",
//       handleSavedList: jest.fn(),
//       handleMode: jest.fn(),
//       handlePage: jest.fn()
//      }; 
//     render(
//       <ConfigurationContext.Provider value={mockContextValue}>
//         <BrowserRouter>
//           <LoginPage />
//         </BrowserRouter>
//       </ConfigurationContext.Provider>
//     );
//     // Simulating user input
//     fireEvent.change(screen.getByPlaceholderText("Username"), {
//       target: { value: "testuser" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "testpassword" },
//     });

//     // Clicking the login button
//     const loginButton = screen.getByRole("button", { name: "Login" });
//     fireEvent.click(loginButton);

//     // Wait for the response and check if the token is set in cookies
//     await waitFor(() => {
//       expect(Cookies.set).toHaveBeenCalledWith("jwt_token", "mock-jwt-token", {
//         expires: 0.1,
//       });
//     });

//     // Check if redirection happens (URL change)
//     expect(mockLocation.href).toBe("/NxtWatch/Home");
//   });
  
  
//     })



import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "."; // Adjust the path as needed
import Cookies from "js-cookie";
import ConfigurationContext, { ConfigurationContextType, } from "../context";
import { BrowserRouter } from "react-router-dom";

// Mocking js-cookie
jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

// Mocking window.location object to test redirection
const mockLocation = { href: "" };
global.window.location = mockLocation as any;
const mockContextValue: ConfigurationContextType = { 
  savedList: [],
  mode: false,
  pagein: "Home",
  handleSavedList: jest.fn(),
  handleMode: jest.fn(),
  handlePage: jest.fn()
 }; 


describe("LoginPage - Successful Login", () => {
  test("successful login stores JWT token and redirects", async () => {
    // Mocking the fetch call to simulate successful login
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({ jwt_token: "mock-jwt-token" }),
          { status: 200 }
        )
      )
    ) as jest.Mock;

    render(
      <ConfigurationContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ConfigurationContext.Provider>
    );

    // Simulating user input
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });

    // Clicking the login button
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    // Wait for the response and check if the token is set in cookies
    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("jwt_token", "mock-jwt-token", {
        expires: 0.1,
      });
    });

    // Check if redirection happens (URL change)
    expect(mockLocation.href).toBe("/NxtWatch/Home");
  });
});
