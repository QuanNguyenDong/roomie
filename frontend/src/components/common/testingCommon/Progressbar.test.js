import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Progressbar from '../common/Progressbar'; // Update the path based on your folder structure

describe('Progressbar Component', () => {
    test('renders progress correctly for active user', () => {
        // Test for a scenario with 5 total users and currentUserIndex as 2
        const totalUsers = 5;
        const currentUserIndex = 2;

        render(<Progressbar currentUserIndex={currentUserIndex} totalUsers={totalUsers} />);

        // Ensure "Progress" text is rendered
        expect(screen.getByText(/Progress/i)).toBeInTheDocument();

        // Get all progress bars using data-testid
        const progressBars = screen.getAllByTestId('progress-bar');
        expect(progressBars.length).toBe(totalUsers);

        // Check if the first 3 bars (index 0, 1, 2) are active (bg-[#5452C2]) and the rest inactive (bg-gray-300)
        progressBars.forEach((bar, index) => {
            if (index <= currentUserIndex) {
                expect(bar).toHaveClass('bg-[#5452C2]');
            } else {
                expect(bar).toHaveClass('bg-gray-300');
            }
        });
    });

    test('renders correctly when all users are completed', () => {
        const totalUsers = 5;
        const currentUserIndex = 4; // All users completed

        render(<Progressbar currentUserIndex={currentUserIndex} totalUsers={totalUsers} />);

        // Get all progress bars using data-testid
        const progressBars = screen.getAllByTestId('progress-bar');
        expect(progressBars.length).toBe(totalUsers);

        // Check if all progress bars are active (bg-[#5452C2])
        progressBars.forEach((bar) => {
            expect(bar).toHaveClass('bg-[#5452C2]');
        });
    });

    test('renders correctly when no progress has been made', () => {
        const totalUsers = 5;
        const currentUserIndex = 0; // No progress made

        render(<Progressbar currentUserIndex={currentUserIndex} totalUsers={totalUsers} />);

        // Get all progress bars using data-testid
        const progressBars = screen.getAllByTestId('progress-bar');
        expect(progressBars.length).toBe(totalUsers);

        // Check if the first bar is active (bg-[#5452C2]) and the rest are inactive (bg-gray-300)
        expect(progressBars[0]).toHaveClass('bg-[#5452C2]');
        progressBars.slice(1).forEach((bar) => {
            expect(bar).toHaveClass('bg-gray-300');
        });
    });
});
