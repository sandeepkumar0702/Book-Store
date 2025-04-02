import { test } from "@jest/globals";
import cartReducer, {
  setCart,
  addToCartReducer,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  resetCart,
  setCartLoading,
} from "../services/slice/cartSlice";

const initialState = {
  cart: [],
  cartLoading: false,
};

describe("cartSlice reducers", () => {
  test("should return the initial state", () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("should handle setCart", () => {
    const newCart = [
      { _id: "1", name: "Book 1", author: "Author 1", price: 10, discountPrice: 8, quantity: 5, quantityToBuy: 1 },
    ];
    expect(cartReducer(initialState, setCart(newCart))).toEqual({
      ...initialState,
      cart: newCart,
    });
  });

  test("should handle addToCartReducer", () => {
    const book = { _id: "1", name: "Book 1", author: "Author 1", price: 10, discountPrice: 8, quantity: 5, quantityToBuy: 1 };
    expect(cartReducer(initialState, addToCartReducer(book))).toEqual({
      ...initialState,
      cart: [book],
    });
  });

  test("should not add duplicate items to cart", () => {
    const book = { _id: "1", name: "Book 1", author: "Author 1", price: 10, discountPrice: 8, quantity: 5, quantityToBuy: 1 };
    const state = { ...initialState, cart: [book] };
    expect(cartReducer(state, addToCartReducer(book))).toEqual(state);
  });

  test("should handle removeFromCart", () => {
    const book = { _id: "1", name: "Book 1", author: "Author 1", price: 10, discountPrice: 8, quantity: 5, quantityToBuy: 1 };
    const state = { ...initialState, cart: [book] };
    expect(cartReducer(state, removeFromCart("1"))).toEqual(initialState);
  });

  test("should handle incrementQuantity", () => {
    const book = { _id: "1", name: "Book 1", author: "Author 1", price: 10, discountPrice: 8, quantity: 5, quantityToBuy: 1 };
    const state = { ...initialState, cart: [book] };
    expect(cartReducer(state, incrementQuantity("1"))).toEqual({
      ...initialState,
      cart: [{ ...book, quantityToBuy: 2 }],
    });
  });

  test("should handle decrementQuantity", () => {
    const book = { _id: "1", name: "Book 1", author: "Author 1", price: 10, discountPrice: 8, quantity: 5, quantityToBuy: 2 };
    const state = { ...initialState, cart: [book] };
    expect(cartReducer(state, decrementQuantity("1"))).toEqual({
      ...initialState,
      cart: [{ ...book, quantityToBuy: 1 }],
    });
  });

test("should handle resetCart", () => {
  const state = {
    cart: [{ _id: "1", name: "Book 1", author: "Author 1", price: 10, discountPrice: 8, quantity: 5, quantityToBuy: 1 }],
    cartLoading: true,
  };
  expect(cartReducer(state, resetCart())).toEqual({
    cart: [],
    cartLoading: true, 
  });
});


  test("should handle setCartLoading", () => {
    expect(cartReducer(initialState, setCartLoading(true))).toEqual({
      ...initialState,
      cartLoading: true,
    });
  });
  test("should not decrement quantity if item is not found in the cart", () => {
    const state = { ...initialState, cart: [] }; 
    expect(cartReducer(state, decrementQuantity("2"))).toEqual(state); 
  });
  test("should not remove item if it is not found in the cart", () => {
    const state = { ...initialState, cart: [{ _id: "1", name: "Book 1" }] };
    expect(cartReducer(state, removeFromCart("2"))).toEqual(state);
  });
  test("should not increment quantity if item is not found in the cart", () => {
    const state = { ...initialState, cart: [{ _id: "1", name: "Book 1", quantityToBuy: 1 }] };
    expect(cartReducer(state, incrementQuantity("2"))).toEqual(state); 
  });
  
  
});
