import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Signup from '../Signup';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios'); // Mock axios

// Mock localStorage
global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
};

describe('Signup Component', () => {
  beforeAll(() => {
    window.alert = jest.fn(); // Mock window.alert
  });

  test('renders signup form and inputs', () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/Fullname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Brief introduction about yourself/i)).toBeInTheDocument();
  });

  test('allows user to fill out the form and submit', async () => {
    axios.post.mockResolvedValue({
      data: { fullname: 'Test User', username: 'testuser' },
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Fullname/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Brief introduction about yourself/i), { target: { value: 'A brief intro' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));
    });

    // Check that axios was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        fullname: 'Test User',
        username: 'testuser',
        password: 'password123',
        desc: 'A brief intro',
      }),
      { withCredentials: true }
    );

    // Check that localStorage is updated
    expect(localStorage.setItem).toHaveBeenCalledWith("user", expect.any(String));
  });

  test('shows error alert on signup failure', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          errors: [{ msg: 'Invalid credentials' }],
        },
      },
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Fullname/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Brief introduction about yourself/i), { target: { value: 'A brief intro' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));
    });

    // Check that the alert was called with the correct message
    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });
});
