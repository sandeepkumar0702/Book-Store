import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';

jest.mock('../components/Common/Header', () => jest.fn(() => <div data-testid="header">Header</div>));

describe('ForgotPassword Component', () => {
    test('renders ForgotPassword component correctly', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Id')).toBeInTheDocument();
        expect(screen.getByText('Reset Password')).toBeInTheDocument();
        expect(screen.getByText('CREATE ACCOUNT')).toBeInTheDocument();
    });

    test('allows user to type in email input field', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email Id');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    });

    test('navigates to register page when CREATE ACCOUNT is clicked', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const createAccountLink = screen.getByText('CREATE ACCOUNT');
        expect(createAccountLink.closest('a')).toHaveAttribute('href', '/register');
    });
});
