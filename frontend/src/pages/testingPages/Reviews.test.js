import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Reviews from '../Reviews'; // this may need adjusting
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

// Mock the navigation function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Reviews Component', () => {
  const mockNavigate = useNavigate();

  beforeEach(() => {
    mockNavigate.mockClear(); // Clear any previous mock call history
  });

  test('renders the heading and description', () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Your Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Let's see how you did.../i)).toBeInTheDocument();
  });

  test('renders stars and tasks completed tiles', () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );

    expect(screen.getByText('Total Stars')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument(); // The stars count

    expect(screen.getByText('Tasks Completed')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // The tasksCompleted count
  });

  test('renders task tiles with correct reviews', () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );

    // Task titles
    expect(screen.getByText('Clean Backyard')).toBeInTheDocument();
    expect(screen.getByText('Wipe TV')).toBeInTheDocument();
    expect(screen.getByText('Cook Chicken')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Feather Dusting')).toBeInTheDocument();

    // Reviews
    expect(screen.getByText('Great job!')).toBeInTheDocument();
    expect(screen.getByText('Needs improvement.')).toBeInTheDocument();
    expect(screen.getByText('could be better')).toBeInTheDocument();
    expect(screen.getByText('How did you get it so clean...no really')).toBeInTheDocument();
    expect(screen.getByText('Clean better bro')).toBeInTheDocument();
    expect(screen.getByText('Wow so much chicken')).toBeInTheDocument();
    expect(screen.getByText('Excellent work remembering')).toBeInTheDocument();
    expect(screen.getByText('Please make sure you clean the countertops after you finish next time!')).toBeInTheDocument();
    expect(screen.getByText('Excellent work.')).toBeInTheDocument();
  });

  test('navigates to /profile when close button is clicked', () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );

    const closeButton = screen.getByRole('button'); // Find the close button
    fireEvent.click(closeButton); // Simulate clicking the close button

    expect(mockNavigate).toHaveBeenCalledWith('/profile'); // Expect navigation to profile
  });
});