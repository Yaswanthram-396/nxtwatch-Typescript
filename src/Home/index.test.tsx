import React from "react";
import {  render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./index";

describe("Home Component", () => {
  test("Renders Home component", () => {
    render(
      <MemoryRouter>
        <Home Num={
            null
        }/>
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
