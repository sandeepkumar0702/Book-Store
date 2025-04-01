import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Wishlist from '../pages/Wishlist';
import { getWishlist } from '../api/bookApi';

jest.mock('../components/Common/Header', () => jest.fn(() => <div data-testid="header">Header</div>));
jest.mock('../components/Common/Footer', () => jest.fn(() => <div data-testid="footer">Footer</div>));
jest.mock('../components/Common/BookLongCard', () => jest.fn(({ book }) => <div data-testid="book-card">{book.title}</div>));
jest.mock('../components/Common/Breadcrumbs', () => jest.fn(() => <div data-testid="breadcrumbs">Breadcrumbs</div>));
jest.mock('../components/Common/Placeholder', () => jest.fn(() => <div data-testid="placeholder">Placeholder</div>));
jest.mock('../api/bookApi', () => ({ getWishlist: jest.fn() }));

describe('Wishlist Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders Placeholder when no token is found', () => {
        render(<Wishlist />);
        expect(screen.getByTestId('placeholder')).toBeInTheDocument();
    });

    test('renders wishlist items when user is logged in', async () => {
        localStorage.setItem('token', 'test-token');

        getWishlist.mockResolvedValue({
            data: { success: true, result: [{ product_id: { title: 'Book 1' } }, { product_id: { title: 'Book 2' } }] }
        });

        render(<Wishlist />);
        
        await waitFor(() => {
            expect(screen.getByTestId('header')).toBeInTheDocument();
            expect(screen.getByTestId('footer')).toBeInTheDocument();
            expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
            expect(screen.getAllByTestId('book-card')).toHaveLength(2);
        });
    });

    test('renders empty wishlist message when there are no items', async () => {
        localStorage.setItem('token', 'test-token');

        getWishlist.mockResolvedValue({ data: { success: true, result: [] } });

        render(<Wishlist />);

        await waitFor(() => {
            expect(screen.getByText('My WishList (0)')).toBeInTheDocument();
        });
    });
});