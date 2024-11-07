import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../Calendar';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Calendar Component', () => {
  beforeEach(() => {
    // Mock navigate to prevent errors
    useNavigate.mockReturnValue(jest.fn());
  });

  it('renders the calendar component', () => {
    render(<Calendar />);
    const calendarTitle = screen.getByText('Calendar');
    expect(calendarTitle).toBeInTheDocument();
  });

  it('displays the current month and year', () => {
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear().toString();

    render(<Calendar />);
    
    expect(screen.getByText(currentMonth)).toBeInTheDocument();
    expect(screen.getByText(currentYear)).toBeInTheDocument();
  });

  it('opens the modal when a day is clicked', async () => {
    render(<Calendar />);
    
    // Click on a specific day button (e.g., day "11")
    const dayButton = screen.getAllByText('11')[0]; // Get the first instance of "11" button in the grid
    fireEvent.click(dayButton);
    
    // Check if modal content specific to the selected day appears
    await waitFor(() => expect(screen.getByText(/11th November/)).toBeInTheDocument());
  });
});
