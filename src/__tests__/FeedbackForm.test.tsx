import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackForm from "../components/BookDetails/FeedbackForm";
import { addBookReview } from "../api/bookApi";

jest.mock("../api/bookApi", () => ({
  addBookReview: jest.fn(),
}));

describe("FeedbackForm Component", () => {
  const mockGetReviews = jest.fn();
  const mockBookDetails = { _id: "12345", title: "Test Book" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render FeedbackForm component correctly", () => {
    render(<FeedbackForm bookDetails={mockBookDetails} getReviews={mockGetReviews} />);
    
    expect(screen.getByText("Customer Feedback")).toBeInTheDocument();
    expect(screen.getByText("Overall rating")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your review")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("should update the comment input field", () => {
    render(<FeedbackForm bookDetails={mockBookDetails} getReviews={mockGetReviews} />);
    
    const textarea = screen.getByPlaceholderText("Write your review");
    fireEvent.change(textarea, { target: { value: "Great book!" } });

    expect(textarea).toHaveValue("Great book!");
  });

  test("should allow users to select a star rating", () => {
    render(<FeedbackForm bookDetails={mockBookDetails} getReviews={mockGetReviews} />);

    const stars = screen.getAllByRole("button");
    fireEvent.click(stars[3]); 

    expect(stars[3].firstChild).toHaveClass("text-[#FFD700]");
  });


  test("should handle API errors gracefully", async () => {
    (addBookReview as jest.Mock).mockRejectedValue(new Error("Network Error"));

    render(<FeedbackForm bookDetails={mockBookDetails} getReviews={mockGetReviews} />);
    
    const textarea = screen.getByPlaceholderText("Write your review");
    fireEvent.change(textarea, { target: { value: "Nice book!" } });

    const stars = screen.getAllByRole("button");
    fireEvent.click(stars[2]); 

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(addBookReview).toHaveBeenCalledWith("12345", "Nice book!", 3);
    expect(mockGetReviews).not.toHaveBeenCalled(); 
  });
});
