import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddressForm from '../components/Profile/AddressForm';

jest.mock('../components/Profile/AddressList.tsx', () => ({ address }) => (
  <div data-testid="address-list">{address.address}</div>
));

describe('AddressForm Component', () => {
  test('renders Address Details heading', () => {
    render(<AddressForm />);
    expect(screen.getByText('Address Details')).toBeInTheDocument();
  });

  test('renders Add New Address button', () => {
    render(<AddressForm />);
    const button = screen.getByText('Add New Address');
    expect(button).toBeInTheDocument();
  });

  test('renders address list items', () => {
    render(<AddressForm />);
    const addressItems = screen.getAllByTestId('address-list');
    expect(addressItems).toHaveLength(2);
    expect(addressItems[0]).toHaveTextContent('1234 Main St');
    expect(addressItems[1]).toHaveTextContent('1234 Main St');
  });

  test('Add New Address button is clickable', () => {
    render(<AddressForm />);
    const button = screen.getByText('Add New Address');
    fireEvent.click(button);
    expect(button).toBeEnabled(); 
  });
});
