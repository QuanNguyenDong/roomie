import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Signup from '../Signup';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

beforeEach(() => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem').mockImplementation(() => {});
  });
  
  afterEach(() => {
    localStorage.setItem.mockRestore(); // Restore original setItem after each test
  });

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

    expect(screen.getByLabelText(/Fullname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Brief introduction about yourself/i)).toBeInTheDocument();
  });

  test('allows user to fill out the form and submit', async () => {
    axios.post.mockResolvedValue({ data: { fullname: 'Test User', username: 'testuser' } });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Fullname/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Brief introduction about yourself/i), { target: { value: 'A brief intro' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));
    });

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      fullname: 'Test User',
      username: 'testuser',
      password: 'password123',
      desc: 'A brief intro',
    }), { withCredentials: true });

    expect(localStorage.setItem).toHaveBeenCalledWith("user", expect.any(String));
  });

  test('shows error alert on signup failure', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          errors: [{ msg: 'Invalid credentials' }]
        }
      }
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Fullname/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Brief introduction about yourself/i), { target: { value: 'A brief intro' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));
    });

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });
});
