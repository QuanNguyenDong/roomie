import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../Calendar'; // Correct relative path to Calendar.js

describe('Calendar Component', () => {
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

  it('opens the modal when a day is clicked', () => {
    render(<Calendar />);
    const dayButton = screen.getByText('11');
    fireEvent.click(dayButton);

    expect(screen.getByText(/Wednesday, 11/)).toBeInTheDocument();
  });
});
