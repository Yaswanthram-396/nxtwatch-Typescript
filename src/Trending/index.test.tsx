import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Trending from "./index";
import ConfigurationContext from "../context";

describe("Trending Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
   
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        videos: [
            {
                channel: {
                  name: "iB Hubs",
                  profile_image_url:
                    "https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-hubs-img.png",
                },
                id: "ad9822d2-5763-41d9-adaf-baf9da3fd490",
                published_at: "Nov 29, 2016",
                thumbnail_url:
                  "https://assets.ccbp.in/frontend/react-js/nxt-watch/ibhubs-img.png",
                title: "iB Hubs Announcement Event",
                view_count: "26K",
              },
        ],
      }),
    })  
});

  test("renders Trending text and applies theme mode correctly", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{  savedList: [],
  mode: false,
  pagein: "Home",
  handleSavedList: jest.fn(),
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <Trending />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Trending")).toBeInTheDocument();

    let container = screen.getByTestId("trending-mode");
    expect(container).toHaveStyle({ backgroundColor: "rgb(241,241,241)" });

    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{  savedList: [],
  mode: true,
  pagein: "Home",
  handleSavedList: jest.fn(),
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <Trending />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    container = screen.getByTestId("trending-mode");
    expect(container).toHaveStyle({ backgroundColor: "rgb(24,24,24)" });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("iB Hubs")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Nov 29, 2016")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("iB Hubs Announcement Event")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/26K/i)).toBeInTheDocument();
    });
  });
  test("handle Api error", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false, 
      status: 401,
      json: jest.fn().mockResolvedValue({ error: "API Error" }),
    });
  
   
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{  savedList: [],
  mode: false,
  pagein: "Home",
  handleSavedList: jest.fn(),
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <Trending />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again!")
      ).toBeInTheDocument();
    });
  });
});
