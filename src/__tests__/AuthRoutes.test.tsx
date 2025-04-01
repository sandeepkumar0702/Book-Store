import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthRoutes from '../pages/AuthRoutes';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: jest.fn(() => <div data-testid="navigate" />)
}));

describe('AuthRoutes Component', () => {
    test('renders children when no token is present', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
        const { getByText } = render(
            <MemoryRouter>
                <AuthRoutes>
                    <div>Test Child</div>
                </AuthRoutes>
            </MemoryRouter>
        );
        expect(getByText('Test Child')).toBeInTheDocument();
    });

    test('navigates when token is present', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthRoutes>
                    <div>Test Child</div>
                </AuthRoutes>
            </MemoryRouter>
        );
        expect(getByTestId('navigate')).toBeInTheDocument();
    });
});
