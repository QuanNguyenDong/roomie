import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Event from '../Event'; 

describe('Event Component', () => {
  it('renders the Event component with dynamic text', () => {
    const eventName = "Sarah's Birthday Bash";
    const username = 'Sarah';
    const startDate = '2024-10-15T08:00:00';
    const endDate = '2024-10-15T10:00:00';

    render(<Event eventname={eventName} username={username} startDate={startDate} endDate={endDate} />);

    expect(screen.getByText(eventName)).toBeInTheDocument();
    expect(screen.getByText('8:00 AM - 10:00 AM')).toBeInTheDocument();
  });

  it('renders the correct initials in the circle', () => {
    const username = 'Sarah';
    
    render(<Event eventname="Some Event" username={username} startDate="2024-10-15T08:00:00" endDate="2024-10-15T10:00:00" />);

    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('should apply correct classnames for styling', () => {
    const { container } = render(<Event eventname="Some Event" username="Sarah" startDate="2024-10-15T08:00:00" endDate="2024-10-15T10:00:00" />);
    
    const eventDiv = container.firstChild;
    expect(eventDiv).toHaveClass('bg-white w-fulll h-[71px] rounded-xl flex items-center');
  });
});
