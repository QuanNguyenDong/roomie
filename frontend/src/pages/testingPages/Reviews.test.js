import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Reviews from '../Reviews';
import '@testing-library/jest-dom';

// Mock the navigation function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Reviews Component', () => {

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

    // Add this to debug the DOM
    console.log(screen.debug());  

    expect(screen.getByText((content, element) => content.startsWith('Total Stars'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('100'))).toBeInTheDocument();

    expect(screen.getByText('Tasks Completed')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('5'))).toBeInTheDocument();
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
    expect(screen.getByText('Wow so much chicken')).toBeInTheDocument();
    expect(screen.getByText('Please make sure you clean the countertops after you finish next time!')).toBeInTheDocument();
  });

  test('navigates to /profile when close button is clicked', () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
});
