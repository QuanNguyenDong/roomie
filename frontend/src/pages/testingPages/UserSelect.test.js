import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserSelect from '../UserSelect';
import getUserProfile from '../../services/User/getUserProfile';

jest.mock('../../services/User/getUserProfile', () => jest.fn());
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(), // Mock useNavigate
}));

describe('UserSelect Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to prevent state leaks
  });

  test('renders the sign-in form when no user is signed in', async () => {
    getUserProfile.mockResolvedValue(null); // No user is signed in

    render(
      <MemoryRouter>
        <UserSelect />
      </MemoryRouter>
    );

    // Wait for the sign-in form to appear
    await waitFor(() => {
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument(); // Match exact text
    });
  });

  test('handles sign-in successfully and displays user info', async () => {
    getUserProfile.mockResolvedValue({ name: 'John Doe' }); // Simulate a successful sign-in

    render(
      <MemoryRouter>
        <UserSelect />
      </MemoryRouter>
    );

    // Wait for the welcome message to appear
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument(); // Check part of the message
    });
  });

  test('shows error on invalid login', async () => {
    getUserProfile.mockRejectedValue(new Error('Invalid login')); // Simulate an error during login

    render(
      <MemoryRouter>
        <UserSelect />
      </MemoryRouter>
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/invalid username/i)).toBeInTheDocument(); // Match part of the error message
    });
  });
});
