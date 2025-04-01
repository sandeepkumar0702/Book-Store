import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import BookDetails from '../components/BookDetails/BookDetails';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { addWishlist, removeWishlist, addToTheCart, updateCartItem } from '../api/bookApi';
import { toast } from 'react-toastify';

jest.mock('../api/bookApi.ts', () => ({
    addWishlist: jest.fn(),
    removeWishlist: jest.fn(),
    addToTheCart: jest.fn(),
    updateCartItem: jest.fn()
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));

const mockStore = configureStore([]);

describe('BookDetails Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            bookList: { bookList: [{ _id: '1', bookName: 'Test Book', author: 'Author', description: 'Test Description', price: 500, discountPrice: 400, quantity: 5 }] },
            wishList: { wishList: [] },
            cart: { cart: [] }
        });
    });

    test('renders book details correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <BookDetails />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('by Author')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    test('allows image selection', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <BookDetails />
                </MemoryRouter>
            </Provider>
        );
        const images = screen.getAllByRole('button');
        fireEvent.click(images[1]);
    });

    test('adds to wishlist', async () => {
        addWishlist.mockResolvedValue({ data: { message: "Item added to wish list" } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <BookDetails />
                </MemoryRouter>
            </Provider>
        );
        
        localStorage.setItem("token", "test-token");
        const addToWishlistButton = screen.getByText('WISHLIST');
        fireEvent.click(addToWishlistButton);
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Item added to wishlist'));
    });

    test('removes from wishlist', async () => {
        removeWishlist.mockResolvedValue({ data: { success: true } });

        store = mockStore({
            bookList: { bookList: [{ _id: '1', bookName: 'Test Book' }] },
            wishList: { wishList: [{ _id: '1' }] },
            cart: { cart: [] }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <BookDetails />
                </MemoryRouter>
            </Provider>
        );
        const removeWishlistButton = screen.getByText('WISHLISTED');
        fireEvent.click(removeWishlistButton);
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Removed from wishlist'));
    });

    test('adds to cart', async () => {
        addToTheCart.mockResolvedValue({ data: { success: true, result: {} } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <BookDetails />
                </MemoryRouter>
            </Provider>
        );
        const addToCartButton = screen.getByText('ADD TO BAG');
        fireEvent.click(addToCartButton);
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Item added to cart'));
    });

    test('increments cart quantity', async () => {
        updateCartItem.mockResolvedValue({});

        store = mockStore({
            bookList: { bookList: [{ _id: '1', bookName: 'Test Book', quantity: 5 }] },
            wishList: { wishList: [] },
            cart: { cart: [{ product_id: '1', quantityToBuy: 1 }] }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <BookDetails />
                </MemoryRouter>
            </Provider>
        );
        const incrementButton = screen.getByTestId('increment-button');
        fireEvent.click(incrementButton);
        await waitFor(() => expect(updateCartItem).toHaveBeenCalled());
    });

    test('decrements cart quantity', async () => {
        updateCartItem.mockResolvedValue({});

        store = mockStore({
            bookList: { bookList: [{ _id: '1', bookName: 'Test Book', quantity: 5 }] },
            wishList: { wishList: [] },
            cart: { cart: [{ product_id: '1', quantityToBuy: 2 }] }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/book/1']}>
                    <BookDetails />
                </MemoryRouter>
            </Provider>
        );

        const decrementButton = await screen.findByTestId('decrement-button');

        fireEvent.click(decrementButton);

        await waitFor(() => expect(updateCartItem).toHaveBeenCalled(), { timeout: 3000 });
    });
    test('increments cart quantity', async () => {
      updateCartItem.mockResolvedValue({});
  
      store = mockStore({
          bookList: { bookList: [{ _id: '1', bookName: 'Test Book', quantity: 5 }] },
          wishList: { wishList: [] },
          cart: { cart: [{ product_id: '1', quantityToBuy: 1 }] }
      });
  
      render(
          <Provider store={store}>
              <MemoryRouter initialEntries={['/book/1']}>
                  <BookDetails />
              </MemoryRouter>
          </Provider>
      );
  
      const incrementButton = screen.getByTestId('increment-button');
  
      fireEvent.click(incrementButton);
  
      await waitFor(() => {
          expect(updateCartItem).toHaveBeenCalledWith('1', 2);
      });
  
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton); 
  
      fireEvent.click(incrementButton); 
  
      await waitFor(() => {
          expect(toast.error).toHaveBeenCalledWith("Quantity exceeds the available quantity");
      });
  });
  
});