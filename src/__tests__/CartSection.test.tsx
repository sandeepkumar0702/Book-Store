import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartSection from "../components/Cart/CartSection";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { toast } from "react-toastify";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../services/slice/cartSlice";
import { updateCartItem, removeCartItem } from "../api/bookApi";

jest.mock("../api/bookApi", () => ({
    updateCartItem: jest.fn(),
    removeCartItem: jest.fn()
}));

jest.mock("react-toastify", () => ({ toast: { success: jest.fn() } }));

const mockStore = configureStore([]);

describe("CartSection Component", () => {
    let store;
    let book = { _id: "1", bookName: "Test Book", author: "Author", cover: "test.jpg", discountPrice: "$10", price: "$20" };
    let getCartItems = jest.fn();
    let product_id = "1";

    beforeEach(() => {
        store = mockStore({ cart: { cart: [{ _id: "1", quantityToBuy: 2 }] } });
        store.dispatch = jest.fn();
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
            </Provider>
        );

    test("renders component correctly", () => {
        renderComponent();
        expect(screen.getByText("Test Book")).toBeInTheDocument();
        expect(screen.getByText("by Author")).toBeInTheDocument();
        expect(screen.getByText("$10")).toBeInTheDocument();
    });

    test("increments cart count", async () => {
        renderComponent();
        const incrementButton = screen.getByTestId("increment-button");
        fireEvent.click(incrementButton);
        await waitFor(() => expect(updateCartItem).toHaveBeenCalledWith("1", 3));
        expect(store.dispatch).toHaveBeenCalledWith(incrementQuantity("1"));
    });

    test("decrements cart count", async () => {
        renderComponent();
        const decrementButton = screen.getByTestId("decrement-button");
        fireEvent.click(decrementButton);
        await waitFor(() => expect(updateCartItem).toHaveBeenCalledWith("1", 1));
        expect(store.dispatch).toHaveBeenCalledWith(decrementQuantity("1"));
    });

    test("removes item from cart", async () => {
        removeCartItem.mockResolvedValue({ data: { success: true } });
        renderComponent();
        
        fireEvent.click(screen.getByText(/remove/i));
        
        await waitFor(() => expect(removeCartItem).toHaveBeenCalledWith("1"));
        expect(toast.success).toHaveBeenCalledWith("Item removed from cart");
        expect(getCartItems).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(removeFromCart("1"));
    });

    // test("handles API errors gracefully", async () => {
    //     console.log = jest.fn();
    //     updateCartItem.mockRejectedValue(new Error("API Error"));
    //     renderComponent();
    //     const incrementButton = screen.getByText(/add/i);
    //     fireEvent.click(incrementButton);
        
    //     await waitFor(() => expect(console.log).toHaveBeenCalledWith("Error in updating cart", expect.any(Error)));
    // });
});