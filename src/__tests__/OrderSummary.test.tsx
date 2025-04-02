import React from "react";
import { render, screen } from "@testing-library/react";
import OrderSummary from "../components/Cart/OrderSummary";

describe("OrderSummary Component", () => {
    const mockBook = {
        cover: "https://example.com/book-cover.jpg",
        name: "Test Book",
        author: "John Doe",
        discountPrice: 250,
        price: 500
    };

    test("renders book details correctly", () => {
        render(<OrderSummary book={mockBook} />);
        
        expect(screen.getByAltText("book-image")).toHaveAttribute("src", mockBook.cover);
        expect(screen.getByText(mockBook.name)).toBeInTheDocument();
        expect(screen.getByText(`by ${mockBook.author}`)).toBeInTheDocument();
        expect(screen.getByText(`Rs. ${mockBook.discountPrice}`)).toBeInTheDocument();
        expect(screen.getByText(mockBook.price.toString())).toBeInTheDocument();
    });

    test("handles missing book properties gracefully", () => {
        render(<OrderSummary book={{}} />);
        expect(screen.getByAltText("book-image").getAttribute("src")).toBe(null);
    });
});
