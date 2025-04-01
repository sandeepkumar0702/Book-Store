import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../pages/Register"; // Adjust the path if needed
import RegisterForm from "../components/Auth/RegisterForm";

jest.mock("../components/Auth/RegisterForm", () => jest.fn(() => <div data-testid="register-form">Mock RegisterForm</div>));

describe("Register Component", () => {
  test("renders Register component with RegisterForm", () => {
    render(<Register />);

    expect(screen.getByTestId("register-form")).toBeInTheDocument();
  });
});
