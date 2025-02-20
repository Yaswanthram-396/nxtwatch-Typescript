import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index";
import Cookies from "js-cookie";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Home from "../Home";
import ConfigurationContext, { ConfigurationContextType } from "../context";


jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));
global.fetch = jest.fn();

describe("LoginPgeRender", () => {
  
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
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false, 
      status: 401,
      json: jest.fn().mockResolvedValue({ error: "API Error" }),
    });
  

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
  

  test("successful login stores JWT token and redirects", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ jwt_token: "jwtoken" }),
        status: 200
      } as Response)
    );
    const mockContextValue: ConfigurationContextType = { 
      savedList: [],
      mode: false,
      pagein: "Home",
      handleSavedList: jest.fn(),
      handleMode: jest.fn(),
      handlePage: jest.fn()
     }; 
    //  window.location = { assign: jest.fn() } as any;
    window.location = { assign: jest.fn() } as any;
    render(
      <ConfigurationContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ConfigurationContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);


    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith("jwt_token", "jwtoken", {
        expires: 0.1,
      });
    });
   
  });

  
});

test("handles network error in login and sets error state", async () => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

  render(<LoginPage />);

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "testuser" },
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "testpassword" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  await waitFor(() => {
    expect(screen.getByText("*Username or Password didn't match")).toBeInTheDocument();
  });

  
  
    })

