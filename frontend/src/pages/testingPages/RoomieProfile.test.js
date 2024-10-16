// RoomieProfile.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RoomieProfile from '../RoomieProfile';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import getHome from '../../services/Home/getHome';

// Mocking dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../../services/Home/getHome', () => jest.fn());

// Mock data for testing
const mockUser = {
  fullname: 'John Doe',
};

const mockAnswers = [
  { question: 'What is your favorite color?', answer: 'Blue', fullname: 'John Doe' },
  { question: 'What is your hobby?', answer: 'Reading', fullname: 'John Doe' },
];

// Define the test suite
describe('RoomieProfile Component', () => {
  beforeEach(() => {
    useLocation.mockReturnValue({
      state: { user: mockUser },
    });
    getHome.mockResolvedValue({ answers: mockAnswers });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the profile with user data and answers', async () => {
    render(
      <MemoryRouter>
        <RoomieProfile />
      </MemoryRouter>
    );

    // Check that the user's full name is displayed
    expect(screen.getByText("John Doe's Ice-breakers")).toBeInTheDocument();

    // Check that the answers are displayed
    expect(await screen.findByText('What is your favorite color?')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('What is your hobby?')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  test('displays "No user data available" when no user data is passed', () => {
    useLocation.mockReturnValueOnce({ state: null });

    render(
      <MemoryRouter>
        <RoomieProfile />
      </MemoryRouter>
    );

    // Check for the "No user data available" message
    expect(screen.getByText('No user data available.')).toBeInTheDocument();

    // Check for the "Go back" link
    const goBackLink = screen.getByText('Go back');
    expect(goBackLink).toBeInTheDocument();

    // Mock the back navigation
    const mockNavigate = useNavigate();
    fireEvent.click(goBackLink);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('navigates back when the close button is clicked', () => {
    const mockNavigate = useNavigate();

    render(
      <MemoryRouter>
        <RoomieProfile />
      </MemoryRouter>
    );

    // Click the close button
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // Expect the navigate function to be called with -1 (to go back)
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
