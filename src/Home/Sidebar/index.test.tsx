// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import {  MemoryRouter } from "react-router-dom";
// // import { createMemoryHistory } from "history";
// import SidePanel, { Panel } from "./index";
// import ConfigurationContext from "../../context";

// describe("SidePanel", () => {
//   test("Navigates to all pages in sidebar by clicking the links", async () => {
//     // const history = createMemoryHistory();

//     render(
//       <MemoryRouter >
//         <ConfigurationContext.Provider
//           value={{
//             savedList: [],
//             mode: false,
//             pagein: "Home",
//             handleSavedList: jest.fn(),
//             handleMode: jest.fn(),
//             handlePage: jest.fn(),
//           }}
//         >
//           <SidePanel Num={null} />
//         </ConfigurationContext.Provider>
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByTestId("home-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Home");
//     });

//     fireEvent.click(screen.getByTestId("trending-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Trending");
//     });

//     fireEvent.click(screen.getByTestId("gaming-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Gaming");
//     });

//     fireEvent.click(screen.getByTestId("saved-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Saved");
//     });
//   });

//   test("Navigates to all pages in panel in mobile by clicking the links", async () => {
//     // const history = createMemoryHistory();
//     const mockSetting = jest.fn();


//     interface StyleState {
//       display: string;
//       position?: "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined;
//       zIndex?: number;
//       top?: string;
//       left?: string;
//       backgroundColor?: string;
//       [key: string]: any; // To allow media query or additional keys
//     }
//     const styleSettings:StyleState = {
//       display: "block",
//       position: "absolute",
//       zIndex: 10,
//       top: "50px",
//       left: "100px",
//       backgroundColor: "#fff",
//     };
//     // interface PanelProps {
//     //   props: styleSettings;
//     //   setting: (style: Partial<StyleState>) => void;
//     // }
    

//     render(
//       <MemoryRouter>
//         <ConfigurationContext.Provider
//           value={{
//             savedList: [],
//             mode: false,
//             pagein: "Home",
//             handleSavedList: jest.fn(),
//             handleMode: jest.fn(),
//             handlePage: jest.fn(),
//           }}
//         >
//           <Panel props={styleSettings} setting={()=>{}} />
//         </ConfigurationContext.Provider>
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByTestId("home-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Home");
//     });

//     fireEvent.click(screen.getByTestId("trending-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Trending");
//     });

//     fireEvent.click(screen.getByTestId("gaming-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Gaming");
//     });

//     fireEvent.click(screen.getByTestId("saved-panel"));
//     await waitFor(() => {
//       expect(window.location.pathname).toBe("/NxtWatch/Saved");
//     });
//   });

//   test("closeIcon sidebar", async () => {
//     // const history = createMemoryHistory();
//     const mockSetting = jest.fn();
    // interface StyleState {
    //   display: string;
    //   position?: "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined;
    //   zIndex?: number;
    //   top?: string;
    //   left?: string;
    //   backgroundColor?: string;
    //   [key: string]: any; // To allow media query or additional keys
    // }
    // const styleSettings:StyleState = {
    //   display: "block",
    //   position: "absolute",
    //   zIndex: 10,
    //   top: "50px",
    //   left: "100px",
    //   backgroundColor: "#fff",
    // };

    // render(
    //   <MemoryRouter >
    //     <ConfigurationContext.Provider
    //      value={{
    //       savedList: [],
    //       mode: false,
    //       pagein: "Home",
    //       handleSavedList: jest.fn(),
    //       handleMode: jest.fn(),
    //       handlePage: jest.fn(),
    //     }}
    //     >
    //       <Panel props={styleSettings} setting={()=>{}} />
//         </ConfigurationContext.Provider>
//       </MemoryRouter>
//     );

//     fireEvent.click(screen.getByTestId("closeIcon-sidebar"));
//     await waitFor(() => {
//       expect(mockSetting).toHaveBeenCalledWith({ display: "none" });
//     });
//   });
// });

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SidePanel, { Panel } from "./index";
import ConfigurationContext from "../../context";

describe("SidePanel", () => {
  test("Navigates to all pages in sidebar by clicking the links", async () => {
    const mockHandlePage = jest.fn();

    render(
      <MemoryRouter>
        <ConfigurationContext.Provider
          value={{
            savedList: [],
            mode: false,
            pagein: "Home",
            handleSavedList: jest.fn(),
            handleMode: jest.fn(),
            handlePage: mockHandlePage,
          }}
        >
          <SidePanel Num={null} />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("home-sidebar"));
    expect(mockHandlePage).toHaveBeenCalledWith("Home");

    fireEvent.click(screen.getByTestId("trending-sidebar"));
    expect(mockHandlePage).toHaveBeenCalledWith("Trending");

    fireEvent.click(screen.getByTestId("gaming-sidebar"));
    expect(mockHandlePage).toHaveBeenCalledWith("Gaming");

    fireEvent.click(screen.getByTestId("saved-sidebar"));
    expect(mockHandlePage).toHaveBeenCalledWith("Saved");
  });

  test("Navigates to all pages in panel in mobile by clicking the links", async () => {
    const mockHandlePage = jest.fn();
    const mockSetting = jest.fn();

    interface StyleState {
      display: string;
      position?: "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined;
      zIndex?: number;
      top?: string;
      left?: string;
      backgroundColor?: string;
      [key: string]: any; // To allow media query or additional keys
    }
    const styleSettings:StyleState = {
      display: "block",
      position: "absolute",
      zIndex: 10,
      top: "50px",
      left: "100px",
      backgroundColor: "#fff",
    };

    render(
      <MemoryRouter >
        <ConfigurationContext.Provider
         value={{
          savedList: [],
          mode: false,
          pagein: "Home",
          handleSavedList: jest.fn(),
          handleMode: jest.fn(),
          handlePage: mockHandlePage,
        }}
        >
          <Panel props={styleSettings} setting={mockSetting} />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("home-panel"));
    expect(mockHandlePage).toHaveBeenCalledWith("Home");

    fireEvent.click(screen.getByTestId("trending-panel"));
    expect(mockHandlePage).toHaveBeenCalledWith("Trending");

    fireEvent.click(screen.getByTestId("gaming-panel"));
    expect(mockHandlePage).toHaveBeenCalledWith("Gaming");

    fireEvent.click(screen.getByTestId("saved-panel"));
    expect(mockHandlePage).toHaveBeenCalledWith("Saved");
  });

  test("closes sidebar when close icon is clicked", async () => {
    const mockSetting = jest.fn();
    interface StyleState {
      display: string;
      position?: "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined;
      zIndex?: number;
      top?: string;
      left?: string;
      backgroundColor?: string;
      [key: string]: any; 
    }
    const styleSettings:StyleState = {
      display: "block",
      position: "absolute",
      zIndex: 10,
      top: "50px",
      left: "100px",
      backgroundColor: "#fff",
    };

    render(
      <MemoryRouter >
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
          <Panel props={styleSettings} setting={mockSetting} />
        </ConfigurationContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("closeIcon-sidebar"));
    expect(mockSetting).toHaveBeenCalledWith({"display": "none"});
  });
});
