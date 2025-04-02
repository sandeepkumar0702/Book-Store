import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from '../components/Auth/LoginForm';
import AuthTemplate from '../components/Auth/AuthTemplate'; 
jest.mock('../components/Auth/AuthTemplate.tsx', () => {
  return jest.fn(() => <div data-testid="auth-template">Auth Template Mock</div>);
});
describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });
  test('renders LoginForm component without crashing', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('auth-template')).toBeInTheDocument();
  });

  // test('renders AuthTemplate with container prop set to "login"', () => {
  //   render(<LoginForm />);
  //   expect(AuthTemplate).toHaveBeenCalledWith({ container: 'login' }, expect.anything());
  //   expect(AuthTemplate).toHaveBeenCalledTimes(1);
  // });

  test('renders a div containing AuthTemplate', () => {
    const { container } = render(<LoginForm />);
    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
    expect(divElement?.children.length).toBe(1)
    expect(divElement?.firstChild).toHaveAttribute('data-testid', 'auth-template');
  });
});