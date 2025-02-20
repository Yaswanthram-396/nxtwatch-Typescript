import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Saved from "./index";
import ConfigurationContext from "../context";

const mockContextValue = {
  savedList: [],
  mode: false,
};

describe("Saved videos component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });
  test("checks if saved videos are displayed", async () => {
    localStorage.setItem(
      "savedList",
      JSON.stringify([
        {
          id: "video1",
          thumbnail_url: "thumbnail_url",
          title: "title",
          channel: { name: "name" },
          view_count: "view_count",
          published_at: "published_at",
        },
      ])
    );
   
    mockContextValue.savedList = localStorage.getItem("savedList")!.length > 0 ? JSON.parse(localStorage.getItem("savedList")!) : [];
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{  ...mockContextValue,
  pagein: "Home",
  handleSavedList: jest.fn(),
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <Saved />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId("video1")).toBeInTheDocument();
    });
  });

  test("handles error saved list is empty", async () => {
    localStorage.setItem("savedList", JSON.stringify([]));
    mockContextValue.savedList = localStorage.getItem("savedList")!.length > 0 ? JSON.parse(localStorage.getItem("savedList")!) : [];
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{  ...mockContextValue,
  pagein: "Home",
  handleSavedList: jest.fn(),
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <Saved />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    // <h2>No saved videos found</h2>
    // <p>You can save your videos while watching them.</p>
    expect(
      await screen.findByText("No saved videos found")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("You can save your videos while watching them.")
    ).toBeInTheDocument();
  });
});
