import { fireEvent } from '@testing-library/react';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Reviews from '../Reviews';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import getReviews from '../../services/Review/getReviews';

jest.mock('../../services/Review/getReviews', () => jest.fn());
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Reviews Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    getReviews.mockResolvedValue([
      {
        title: 'Clean Backyard',
        reviews: [
          { reviewText: 'Great job!' },
          { reviewText: 'Needs improvement.' },
          { reviewText: 'Could be better' },
          { reviewText: 'How did you get it so clean... no really' },
        ],
      },
      {
        title: 'Wipe TV',
        reviews: [
          { reviewText: 'Clean better bro' },
        ],
      },
      {
        title: 'Cook Chicken',
        reviews: [
          { reviewText: 'Wow, so much chicken!' },
          { reviewText: 'Excellent work remembering' },
        ],
      },
    ]);
    useNavigate.mockReturnValue(mockNavigate); // Mock the navigate hook
  });

  test('renders the heading and description', async () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Your Weekly Reviews/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Total Stars')).toBeInTheDocument();
    });
  });

  test('renders stars and tasks completed tiles', async () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Total Stars/i)).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('100'))).toBeInTheDocument();
      expect(screen.getByText('Tasks Completed')).toBeInTheDocument();
    });  
  });

  test('renders task tiles with correct reviews', async () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Clean Backyard')).toBeInTheDocument();
      expect(screen.getByText('Wipe TV')).toBeInTheDocument();
      expect(screen.getByText('Cook Chicken')).toBeInTheDocument();
    });
  });

  test('navigates to /profile when close button is clicked', async () => {
    render(
      <MemoryRouter>
        <Reviews />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('close-button'));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });
  });
});
