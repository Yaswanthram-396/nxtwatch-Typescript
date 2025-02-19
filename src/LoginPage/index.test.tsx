import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index";
import Cookies from "js-cookie";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Home from "../Home";
import ConfigurationContext, { ConfigurationContextType } from "../context";


// delete window.location;
window.location = { href: "" } as Location; 

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));
global.fetch = jest.fn();

const mockLocation = { href: "" };
global.window.location = mockLocation as any;
const mockNavigate = useNavigate as jest.Mock;
describe("LoginPgeRender", () => {
  // beforeAll(() => {
  //   
  //   const location = {
  //     assign: jest.fn(),
  //     replace: jest.fn(),
  //     reload: jest.fn(),
  //     href: "",
  //   };
    
  //   // @ts-ignore to bypass TypeScript errors for mocking
  //   global.window.location = location;
  // });

  
  test("rendering the login component", () => {
   render(<LoginPage />);
    const getUsername = screen.getByPlaceholderText("Username") as HTMLInputElement;
    const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const loginButton = screen.getByRole("button", { name: "Login" } )as HTMLButtonElement;
    expect(getUsername).toBeInTheDocument();
    expect(getPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  test("changing userName and password", () => {
   render(<LoginPage /> );
    const getUsername = screen.getByPlaceholderText("Username") as HTMLInputElement;
    const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
    fireEvent.change(getUsername, { target: { value: "rahul" } });
    fireEvent.change(getPassword, { target: { value: "rahul@2021" } });
    expect(getUsername.value).toBe("rahul");
    expect(getPassword.value).toBe("rahul@2021");
  });
  test("Check show password click", () => {
   render(<LoginPage /> );
    const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const showpassText = screen.getByRole("checkbox") as HTMLInputElement;

    expect(getPassword.type).toBe("password");
    fireEvent.click(showpassText);
    expect(getPassword.type).toBe("text");
    fireEvent.click(showpassText);
    expect(getPassword.type).toBe("password");
  });
  test("showing an ERROR message when user mismatched", async () => {
  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ error: "API Error" }),
    status: 401,
  } as Response)
) as jest.Mock; 

    render(

      <BrowserRouter>
      <ConfigurationContext.Provider value={{ savedList: [], mode: false, pagein: "Home", handleSavedList: jest.fn(), handleMode: jest.fn(), handlePage: jest.fn() }}>
        <LoginPage />
      </ConfigurationContext.Provider>
      </BrowserRouter>
    );
  
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpass" },
    });
  
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
  
    expect(
      await screen.findByText("*Username or Password didn't match")
    ).toBeInTheDocument();
  });
  

  // test("successful login stores JWT token and redirects", async () => {
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve(
  //       new Response(
  //         JSON.stringify({ jwt_token: "mock-jwt-token" }),
  //         { status: 200 }
  //       )
  //     )
  //   ) as jest.Mock;
  //   const mockContextValue: ConfigurationContextType = { 
  //     savedList: [],
  //     mode: false,
  //     pagein: "Home",
  //     handleSavedList: jest.fn(),
  //     handleMode: jest.fn(),
  //     handlePage: jest.fn()
  //    }; 
  //   render(
  //     <ConfigurationContext.Provider value={mockContextValue}>
  //       <BrowserRouter>
  //         <LoginPage />
  //       </BrowserRouter>
  //     </ConfigurationContext.Provider>
  //   );
  //   fireEvent.change(screen.getByPlaceholderText("Username"), {
  //     target: { value: "testuser" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Password"), {
  //     target: { value: "testpassword" },
  //   });

  //   const loginButton = screen.getByRole("button", { name: "Login" });
  //   fireEvent.click(loginButton);

  //   await waitFor(() => {
  //     expect(Cookies.set).toHaveBeenCalledWith("jwt_token", "mock-jwt-token", {
  //       expires: 0.1,
  //     });
  //   });

   
  // });
  
  
    })

