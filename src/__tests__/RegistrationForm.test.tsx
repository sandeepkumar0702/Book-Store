import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterForm from "../components/Auth/RegisterForm";
import AuthTemplate from "../components/Auth/AuthTemplate";

jest.mock("../components/Auth/AuthTemplate.tsx", () => jest.fn(() => <div data-testid="auth-template">Mock AuthTemplate</div>));

describe("RegisterForm Component", () => {
  test("renders RegisterForm component with AuthTemplate", () => {
    render(<RegisterForm />);

    const authTemplate = screen.getByTestId("auth-template");
    expect(authTemplate).toBeInTheDocument();
  });

});
