import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Stars from '../StarRating'; // Adjust the path based on your folder structure

describe('StarRating Component', () => {
  test('renders the correct number of stars', () => {
    render(<Stars count={5} initialRating={0} icon="★" color="#FFD43B" />);

    const stars = screen.getAllByText('★');
    expect(stars.length).toBe(5); // Ensure 5 stars are rendered
  });

  test('renders stars with the correct initial rating', () => {
    render(<Stars count={5} initialRating={3} icon="★" color="#FFD43B" />);

    const stars = screen.getAllByText('★');
    // The first 3 stars should be colored, the others uncolored
    expect(stars[0]).toHaveStyle('color: #FFD43B');
    expect(stars[1]).toHaveStyle('color: #FFD43B');
    expect(stars[2]).toHaveStyle('color: #FFD43B');
    expect(stars[3]).toHaveStyle('color: white');
    expect(stars[4]).toHaveStyle('color: white');
  });

  test('updates rating on click', () => {
    const handleRatingChange = jest.fn();
    render(<Stars count={5} initialRating={0} onRatingChange={handleRatingChange} />);

    const stars = screen.getAllByText('★');

    fireEvent.click(stars[2]); // Click the third star
    expect(handleRatingChange).toHaveBeenCalledWith(3); // Should call with a rating of 3

    fireEvent.click(stars[4]); // Click the fifth star
    expect(handleRatingChange).toHaveBeenCalledWith(5); // Should call with a rating of 5
  });

  test('does not allow rating change when readOnly is true', () => {
    const handleRatingChange = jest.fn();
    render(<Stars count={5} initialRating={3} readOnly={true} onRatingChange={handleRatingChange} />);

    const stars = screen.getAllByText('★');

    fireEvent.click(stars[4]); // Click the fifth star
    expect(handleRatingChange).not.toHaveBeenCalled(); // Should not call since it's read-only
  });

  test('applies custom icon size correctly', () => {
    render(<Stars count={5} initialRating={0} iconSize={24} />);

    const stars = screen.getAllByText('★');
    expect(stars[0]).toHaveStyle('font-size: 24px');
  });

  test('applies grayscale to unselected stars', () => {
    render(<Stars count={5} initialRating={3} />);

    const stars = screen.getAllByText('★');
    expect(stars[0]).toHaveStyle('filter: grayscale(0%)'); // Selected stars are not grayscale
    expect(stars[3]).toHaveStyle('filter: grayscale(100%)'); // Unselected stars are grayscale
  });
});
