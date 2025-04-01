import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

jest.mock("../components/Common/Header", () => (props: { container: string }) => (
  <div data-testid="header">Mock Header - {props.container}</div>
));

jest.mock("../components/BookContainer/BookContainer", () => () => (
  <div data-testid="book-container">Mock BookContainer</div>
));

jest.mock("../components/Common/Footer", () => () => (
  <div data-testid="footer">Mock Footer</div>
));

describe("Home Page", () => {
  test("renders Home page correctly", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toHaveTextContent("Mock Header - home");
    expect(screen.getByTestId("book-container")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("checks if Header receives correct props", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toHaveTextContent("Mock Header - home");
  });

  test("displays BookContainer component", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("book-container")).toBeInTheDocument();
  });

  test("renders the Footer component", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
