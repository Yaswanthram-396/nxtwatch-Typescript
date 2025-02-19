import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cookies from "js-cookie";
import VideosInHome from "./index";
import ConfigurationContext, { ConfigurationContextType } from "../../../context";


jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock("js-cookie", () => ({
    set: jest.fn(),
    get:jest.fn(),
  }));
  
describe("Render the sidebar in home in the sidebarSidecontext render", () => {

  test("rendering the login component", () => {
    render(<VideosInHome />);
    expect(
      screen.getByText("Buy Nxt Watch Premium prepaid plans with UPI")
    ).toBeInTheDocument();
  });
  test("When clicking the close, the banner should close", () => {
    render(<VideosInHome />);
    const closebtn = screen.getByTestId("close-icon");
    fireEvent.click(closebtn);
 expect(
      screen.queryByText("Buy Nxt Watch Premium prepaid plans with UPI")
    ).not.toBeInTheDocument();
  });
  test("to check the mode is getting applied (light mode)", () => {
    const mockContext: ConfigurationContextType = {
        savedList: [],
        mode: false,
        pagein: 'Home',
        handleSavedList: jest.fn(),
        handleMode: jest.fn(),
        handlePage: jest.fn()
      };
     
        const { rerender } = render(
      <ConfigurationContext.Provider value={mockContext}>
        <VideosInHome />
      </ConfigurationContext.Provider>

   
    );
    const sidebar = screen.getByTestId("sidebar-content");
    expect(sidebar).toHaveStyle({ backgroundColor: "white" });
    
    rerender(
      <ConfigurationContext.Provider value={ {...mockContext, mode: true }}>
        <VideosInHome />
      </ConfigurationContext.Provider>
    );
    expect(sidebar).toHaveStyle({ backgroundColor: "black" });
  });
  test("Testing Videos", () => {
    render(<VideosInHome /> );
    expect(screen.getByTestId("api-response")).toBeInTheDocument();
  });
});
