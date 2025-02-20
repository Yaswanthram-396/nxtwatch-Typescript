import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VideoPlayer from "./index";
import ConfigurationContext from "../context";

const mockContextValue = {
  handleSavedList: jest.fn(),
  mode: false,
};

describe("VideoPlayer", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks()
    global.fetch = jest.fn();
   
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        video_details: {
            id: "video1",
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
      }),
    })
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("checks if video elements exist", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );

    expect(await screen.findByText("Like")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Like"));

    expect(await screen.findByText("Dislike")).toBeInTheDocument();
    expect(await screen.findByText("Save")).toBeInTheDocument();

    expect(
      await screen.findByTestId("channel-profile-image")
    ).toBeInTheDocument();
    expect(await screen.findByTestId("channel-name")).toBeInTheDocument();
    expect(await screen.findByTestId("video-description")).toBeInTheDocument();
    expect(await screen.findByTestId("view-count")).toBeInTheDocument();
  });

  test("checks if video details are displayed", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(await screen.findByText("Sample Video")).toBeInTheDocument();
    expect(await screen.findByText("Test Channel")).toBeInTheDocument();
    expect(await screen.findByText("1M views")).toBeInTheDocument();
    expect(await screen.findByText("2 days ago")).toBeInTheDocument();
    expect(
      await screen.findByText("This is a test video description.")
    ).toBeInTheDocument();
  });

  test("handles error state when API call fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ error: "API Error" }), {
          status: 401, 
          
        })
      )
    );

    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
   
    await waitFor(() => {
      expect(screen.getByText("Video not avilable")).toBeInTheDocument();
    });
  });
  test("Clicking Like updates the UI and localStorage", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
      <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    
    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
    const likeButton =  screen.getByTestId("like");

    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton).toHaveStyle({ color: "blue" });
    });
    const likeList = JSON.parse(localStorage.getItem("likeList") ?? "[]")
    expect(likeList).not.toBeNull();
  });

  test("Clicking Dislike updates the UI and localStorage", async () => {
    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    
    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );

    const dislikeButton = screen.getByTestId("dislike");

    fireEvent.click(dislikeButton);
    await waitFor(() => {
      expect(dislikeButton).toHaveStyle({ color: "blue" });
    });

    const dislikeList =  JSON.parse(localStorage.getItem("dislikeList") ?? "[]")
    expect(dislikeList).not.toBeNull();
  });

  test("Clicking Like removes Dislike if previously disliked", async () => {
    // localStorage.setItem("dislikeList", JSON.stringify([{ id: "video1" }]));

    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    const likeButton = await screen.findByText("Like");
    fireEvent.click(likeButton);
    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    const dislikeButton =  screen.getByTestId("like");
    fireEvent.click(dislikeButton);
    const dislikeList = JSON.parse(localStorage.getItem("dislikeList") ?? "[]");
    
    console.log(dislikeList);
    await waitFor(() => expect(dislikeList).toEqual([]));
  });

  test("Clicking Dislike removes Like if previously liked", async () => {
    // localStorage.setItem("likeList", JSON.stringify([{ id: "video1" }]));

    render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    
    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );

    const dislikeButton =  screen.getByTestId("dislike");
    fireEvent.click(dislikeButton);

    const likeList = JSON.parse(localStorage.getItem("likeList") ?? "[]");
    expect(likeList).toEqual([]);
  });

  test("saved video button toggles state and color", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    const savedElement = await screen.findByTestId("saved-element");
    expect(getComputedStyle(savedElement).color).toBe("gray");

    fireEvent.click(savedElement);

    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider value={{...mockContextValue,savedList: [],pagein: "Home",
  handleMode: jest.fn(),
  handlePage: jest.fn(),}}>
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getComputedStyle(screen.getByTestId("saved-element")).color).toBe(
        "gray"
      );
    });
  });
  test("Dislike already exists", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            ...mockContextValue,
            savedList: [],
            pagein: "Home",
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
  
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    
    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
  
    const dislikeButton = screen.getByTestId("dislike");
    fireEvent.click(dislikeButton);
  
    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            ...mockContextValue,
            savedList: [],
            pagein: "Home",
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
  
    await waitFor(() => {
      const dislikeList = JSON.parse(localStorage.getItem("dislikeList") ?? "[]");
      expect(dislikeList.length).toBe(1); 
    });
  
    fireEvent.click(dislikeButton);
    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            ...mockContextValue,
            savedList: [],
            pagein: "Home",
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      const dislikeList = JSON.parse(localStorage.getItem("dislikeList") ?? "[]");
      expect(dislikeList).toEqual([]); 
    });
  });
  
  test("Like already exists", async () => {
    const { rerender } = render(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            ...mockContextValue,
            savedList: [],
            pagein: "Home",
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
  
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    
    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
  
    const likeButton = screen.getByTestId("like");
    fireEvent.click(likeButton);
  
    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            ...mockContextValue,
            savedList: [],
            pagein: "Home",
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
  
    await waitFor(() => {
      const likeList = JSON.parse(localStorage.getItem("likeList") ?? "[]");
      expect(likeList.length).toBe(1); 
    });
  
    fireEvent.click(likeButton);
    rerender(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            ...mockContextValue,
            savedList: [],
            pagein: "Home",
            handleMode: jest.fn(),
            handlePage: jest.fn(),
          }}
        >
          <VideoPlayer />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      const likeList = JSON.parse(localStorage.getItem("likeList") ?? "[]");
      expect(likeList).toEqual([]); 
    });
  });

});