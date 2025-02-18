import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index";
import Cookies from "js-cookie";


// delete window.location;
// window.location = { href: "" } as Location; 

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));


describe("LoginPgeRender", () => {
  beforeAll(() => {
    // Mock window.location object
    const location = {
      assign: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      href: "",
    };
    
    // @ts-ignore to bypass TypeScript errors for mocking
    global.window.location = location;
  });
  
  
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
  test("showing an ERROR mesage when user mismatched", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ error: "API Error" }), {
          status: 401, 
          
        })
      )
    );
   render(<LoginPage /> );
    const getUsername = screen.getByPlaceholderText("Username") as HTMLInputElement;
    const getPassword = screen.getByPlaceholderText("Password") as HTMLInputElement;
    fireEvent.change(getUsername, { target: { value: "test" } });
    fireEvent.change(getPassword, { target: { value: "testpass" } });
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(
        screen.getByText("*Username or Password didn't match")
      ).toBeInTheDocument();
    });
  });
  test("User logged in successfully after clicking login button", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ jwt_token: "jwtoken" }), {
          status: 200, 
        })
      )
    );
   

   render(<LoginPage /> );
    const getUsername = screen.getByPlaceholderText("Username") as HTMLInputElement;
    const getPassword = screen.getByPlaceholderText("Password")as HTMLInputElement;
    fireEvent.change(getUsername, { target: { value: "test" } });
    fireEvent.change(getPassword, { target: { value: "test@2021" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("jwt_token", "jwtoken", {
        expires: 0.1,
      });
    });

    await waitFor(() => {
      expect(window.location.assign).toBe("/NxtWatch/Home");
    });
  });
});
