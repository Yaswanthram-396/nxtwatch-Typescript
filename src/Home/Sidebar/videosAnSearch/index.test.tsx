import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./index"; // Import your LoginPage component
import Cookies from "js-cookie";
import ConfigurationContext, { ConfigurationContextType } from "../../../context";
import GetApiRes from "./index";
import { MemoryRouter } from "react-router-dom";


jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>
}));




describe("Render the videos from the API", () => {
  test("To check whether the search bar and icon present", () => {
    
    render(
     
      <GetApiRes />

    );
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });
  test("testing the videos API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            videos: [
              {
                id: "1",
                thumbnail_url: "https://example.com/video1.jpg",
                title: "Test Video",
                channel: {
                  name: "Test Channel",
                  profile_image_url: "https://example.com/profile.jpg",
                },
                view_count: 1000,
                published_at: "1 day ago",
              },
            ],
          }),
          {
            status: 200,
          }
        )
      )
    );
  
    const mockContext = {
      savedList: [],
      mode: false,
      pagein: "Home",
      handleSavedList: jest.fn(),
      handleMode: jest.fn(),
      handlePage: jest.fn(),
    };
  
    
    render(
      <ConfigurationContext.Provider value={mockContext}>
        <GetApiRes />
      </ConfigurationContext.Provider>
    );
  
    
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
  
    
    expect(await screen.findByText("Test Video")).toBeInTheDocument();
    expect(await screen.findByText("Test Channel")).toBeInTheDocument();
    expect(await screen.findByText("1000 Views")).toBeInTheDocument();
    expect(await screen.findByText("1 day ago")).toBeInTheDocument();
  });
  test("Rejected API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ error: "API Error" }), {
          status: 401, 
          
        })
      )
    );
    render(<GetApiRes />);
    expect(
      await screen.findByText("No Search results found")
    ).toBeInTheDocument();
  });
  test("Search to filter videos", () => {
    render(<GetApiRes />);
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: {
        value: "ipl",
      },
    });
    fireEvent.click(screen.getByTestId("search-videos"));
    expect(fetch).toHaveBeenCalledWith(
      "https://apis.ccbp.in/videos/all?search=ipl",
      expect.any(Object)
    );
  });
});
