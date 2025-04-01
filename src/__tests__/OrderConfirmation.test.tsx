import React from "react";
import { render, screen } from "@testing-library/react";
import OrderConfirmation from "../pages/OrderConfirmation"; // Adjust path if needed
import { MemoryRouter } from "react-router-dom";

jest.mock("../components/Common/Header.tsx", () => () => <div data-testid="header">Mock Header</div>);

describe("OrderConfirmation Page", () => {

  test("displays a continue shopping button", () => {
    render(
      <MemoryRouter>
        <OrderConfirmation />
      </MemoryRouter>
    );
    const continueShoppingButton = screen.getByRole("button", { name: /continue shopping/i });
    expect(continueShoppingButton).toBeInTheDocument();
  }); 
});
