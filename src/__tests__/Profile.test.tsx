import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import React from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import ProfileEditForm from '../components/Profile/ProfileEditForm';
import AddressForm from '../components/Profile/AddressForm';
import Breadcrumbs from '../components/Common/Breadcrumbs';

jest.mock('../components/Common/Header', () => jest.fn(() => <div data-testid="header">Header</div>));
jest.mock('../components/Common/Footer', () => jest.fn(() => <div data-testid="footer">Footer</div>));
jest.mock('../components/Profile/ProfileEditForm', () => jest.fn(() => <div data-testid="profile-edit-form">ProfileEditForm</div>));
jest.mock('../components/Profile/AddressForm', () => jest.fn(() => <div data-testid="address-form">AddressForm</div>));
jest.mock('../components/Common/Breadcrumbs', () => jest.fn(() => <div data-testid="breadcrumbs">Breadcrumbs</div>));

describe('Profile Component', () => {
    test('renders Profile component with all child components', () => {
        render(<Profile />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByTestId('profile-edit-form')).toBeInTheDocument();
        expect(screen.getByTestId('address-form')).toBeInTheDocument();
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    });
});
