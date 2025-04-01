import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddressDetails from '../components/Cart/AddressDetails';
import '@testing-library/jest-dom';

const mockSetOrderSummary = jest.fn();

const renderComponent = (orderSummary = false) => {
    return render(
        <AddressDetails orderSummary={orderSummary} setOrderSummary={mockSetOrderSummary} />
    );
};

describe('AddressDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('name', 'John Doe');
    });

    test('renders component with default elements', () => {
        renderComponent();
        expect(screen.getByText(/Customer Details/i)).toBeInTheDocument();
        expect(screen.getByText(/Add New Address/i)).toBeInTheDocument();
    });

    test('renders input fields with default values', () => {
        renderComponent();
        expect(screen.getByLabelText(/Full Name/i)).toHaveValue('John Doe');
        expect(screen.getByLabelText(/Mobile Number/i)).toHaveValue('');
    });

    test('updates full name when edited', () => {
        renderComponent();
        const nameInput = screen.getByLabelText(/Full Name/i);
        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        expect(nameInput).toHaveValue('Jane Doe');
    });
    test('updates new address fields', () => {
        renderComponent();
        fireEvent.click(screen.getByText(/Add New Address/i));
        const addressInput = screen.getByLabelText(/Address/i);
        fireEvent.change(addressInput, { target: { value: 'New Test Address' } });
        expect(addressInput).toHaveValue('New Test Address');
    });


    test('selects an existing address', () => {
        renderComponent();
        const radioButtons = screen.getAllByRole('radio', { name: /home|work/i });
        fireEvent.click(radioButtons[1]); // Selects Work address
        expect(radioButtons[1]).toBeChecked();
    });

    test('toggles edit mode for an existing address', () => {
        renderComponent();
        fireEvent.click(screen.getByText(/Edit/i));
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    });

    test('disables edit mode when cancel is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByText(/Edit/i));
        fireEvent.click(screen.getByText(/Cancel/i));
        expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    });

    test('updates existing address fields', () => {
        renderComponent();
        fireEvent.click(screen.getByText(/Edit/i));
        const addressInput = screen.getByLabelText(/Address/i);
        fireEvent.change(addressInput, { target: { value: 'Updated Address' } });
        expect(addressInput).toHaveValue('Updated Address');
    });



    test('calls setOrderSummary when continue is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByText(/Continue/i));
        expect(mockSetOrderSummary).toHaveBeenCalledWith(true);
    });
});
