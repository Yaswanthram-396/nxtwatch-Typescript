import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from ".";
import Cookies from "js-cookie";
import { MemoryRouter } from "react-router-dom";
import ConfigurationContext from "../../context";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

describe("Navbar Render", () => {
  test("rendering the login component", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("User logged out successfully after clicking logout button", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole("button", { name: "Log out" });
    fireEvent.click(logoutButton);
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    
    const confirmLogout = screen.getByText("Confirm")
    fireEvent.click(confirmLogout);
    
    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith("jwt_token");
    });
    
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("User cancels logout after clicking logout button", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);
    expect(screen.getByText( "Cancel" )).toBeInTheDocument();
    
    const dontLogout =screen.getByText( "Cancel") as HTMLButtonElement;
    fireEvent.click(dontLogout);
    
    await waitFor(() => {
      expect(window.location.href).toBe(window.location.href);
    });
  });

  test("Mode toggles when clicking moon and sun icons", () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            savedList: [],
            mode: false,
            pagein: "Home",
            handleSavedList: jest.fn(),
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <Navbar />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("lightMode")).toBeInTheDocument();
    expect(screen.getByAltText("lightmodelogo")).toBeInTheDocument();
    expect(screen.queryByTestId("darkMode")).not.toBeInTheDocument();
    expect(screen.queryByAltText("darkmodelogo")).not.toBeInTheDocument();
  });

  test("User logs out successfully in mobile view", async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: query === "(max-width: 770px)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    expect(
      screen.queryByText("Are you sure you want to logout?")
    ).not.toBeInTheDocument();
    
    expect(screen.getByTestId("logout-popup")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("logout-popup"));
    
    expect(
      screen.getByText("Are you sure you want to logout?")
    ).toBeInTheDocument();
  });

  test("Logout panel styles are applied correctly", () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            savedList: [],
            mode: false,
            pagein: "Home",
            handleSavedList: jest.fn(),
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <Navbar />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByTestId("logout-svg"));
    expect(screen.getByTestId("panel-props")).toHaveStyle({
      position: "absolute",
    });
    
    fireEvent.click(screen.getByText("Log out"));
    expect(screen.getByTestId("poper-logout")).toHaveStyle({
      backgroundColor: "#fff",
    });
  });
});
