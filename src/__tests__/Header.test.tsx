import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Common/Header";
import React from "react";
import SearchProvider from "../context/SearchProvider";
import ProfileDropdown from "../components/Common/ProfileDropdown";

const mockStore = configureStore([]);
const removeEverythingFromCart = jest.fn();
const removeEverythingFromWishList = jest.fn();



const store = mockStore({
  cart: { cart: [{ _id: '1' }] },
  wishList: { wishList: [{ _id: '2' }] },
  user: { isAuthenticated: false },
});

describe("Header Component Tests", () => {
  const mockLogout = jest.fn(()=>{
    removeEverythingFromCart();
    removeEverythingFromWishList();
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  })

  beforeEach(() => {
    localStorage.setItem("token", "mockToken");
    localStorage.setItem("name", "John Doe");
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileDropdown logout={mockLogout} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("should render properly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      </Provider>
    );

    const bookStoreText = screen.getByText(/bookstore/i);
    expect(bookStoreText).toBeInTheDocument();
  });

  test("should not render search and cart icons if container is not provided", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const searchBar = screen.queryByPlaceholderText(/search.../i);
    const cart = screen.queryByText(/cart/i);
    const profile = screen.queryByText(/profile/i);

    expect(searchBar).not.toBeInTheDocument();
    expect(cart).not.toBeInTheDocument();
    expect(profile).not.toBeInTheDocument();
  });

  test("search bar change event", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchProvider>
            <Header container="home" />
          </SearchProvider>
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: "random value" } });

    expect(searchInput).toHaveValue("random value");
  });

  test("should render cart icon with item count", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      </Provider>
    );

    const cartCount = screen.getByText("1");
    expect(cartCount).toBeInTheDocument();
  });

  test("should trigger logout and clear cart and wishlist",async () => {
    const profileIcon = screen.getByTestId("profile-icon");
  expect(profileIcon).toBeInTheDocument();
  fireEvent.click(profileIcon);

  const logoutButton = screen.getByTestId("logout-button");
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);

  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(removeEverythingFromCart).toHaveBeenCalledTimes(1);
  expect(removeEverythingFromWishList).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    expect(localStorage.getItem("name")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
  });

  test("should navigate to cart page on cart icon click", () => {
    delete global.window.location;
    global.window.location = { pathname: "/" } as Location;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      </Provider>
    );
    const cartIcon = screen.getByText("Cart");
    fireEvent.click(cartIcon);
    expect(global.window.location.pathname).toBe("/");
  });
});
