import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddressList from '../components/Profile/AddressList';

describe('AddressList Component', () => {
    const mockAddress = {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        type: 'Home'
    };

    test('renders AddressList with given address', () => {
        render(<AddressList address={mockAddress} index={0} />);
        
        expect(screen.getByText('1. Home')).toBeInTheDocument();
        expect(screen.getByLabelText('Address')).toHaveValue(mockAddress.address);
        expect(screen.getByLabelText('city/town')).toHaveValue(mockAddress.city);
        expect(screen.getByLabelText('State')).toHaveValue(mockAddress.state);
        expect(screen.getByDisplayValue('Home')).toBeChecked();
    });

    test('toggles edit mode when clicking Edit button', () => {
        render(<AddressList address={mockAddress} index={0} />);
        
        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        fireEvent.click(editButton);
        expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    test('enables input fields when in edit mode', () => {
        render(<AddressList address={mockAddress} index={0} />);
        
        fireEvent.click(screen.getByText('Edit'));
        
        expect(screen.getByLabelText('Address')).not.toBeDisabled();
        expect(screen.getByLabelText('city/town')).not.toBeDisabled();
        expect(screen.getByLabelText('State')).not.toBeDisabled();
    });

    test('allows editing inputs', () => {
        render(<AddressList address={mockAddress} index={0} />);
        
        fireEvent.click(screen.getByText('Edit'));
        const addressInput = screen.getByLabelText('Address');
        
        fireEvent.change(addressInput, { target: { value: '456 Elm St' } });
        expect(addressInput).toHaveValue('456 Elm St');
    });

    test('allows changing radio button selection', () => {
        render(<AddressList address={mockAddress} index={0} />);
        
        fireEvent.click(screen.getByText('Edit'));
        const workRadio = screen.getByDisplayValue('Work');
        
        fireEvent.click(workRadio);
        expect(workRadio).toBeChecked();
    });
});
