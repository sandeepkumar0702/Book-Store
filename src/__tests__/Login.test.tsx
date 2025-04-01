import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import LoginForm from '../components/Auth/LoginForm';

jest.mock('../components/Auth/LoginForm', () => jest.fn(() => <div data-testid="login-form">Login Form</div>));

describe('Login Component', () => {
    test('renders Login component with LoginForm', () => {
        render(<Login />);
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });
});
