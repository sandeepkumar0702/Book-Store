import React from 'react';
import { render, screen } from '@testing-library/react';
import BookPage from '../pages/BookPage';
import Header from '../components/Common/Header';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import BookDetails from '../components/BookDetails/BookDetails';

jest.mock('../components/Common/Header', () => jest.fn(() => <div data-testid="header">Header</div>));
jest.mock('../components/Common/Breadcrumbs', () => jest.fn(() => <div data-testid="breadcrumbs">Breadcrumbs</div>));
jest.mock('../components/BookDetails/BookDetails', () => jest.fn(() => <div data-testid="book-details">Book Details</div>));

describe('BookPage Component', () => {
    test('renders BookPage component with all child components', () => {
        render(<BookPage />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
        expect(screen.getByTestId('book-details')).toBeInTheDocument();
    });
});
