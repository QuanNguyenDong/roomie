import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Event from '../Event'; 

describe('Event Component', () => {
  it('renders the Event component with dynamic text', () => {
    const eventName = "Sarah's Birthday Bash";
    const timeInfo = 'Tomorrow';
    const initial = 'S';

    render(<Event eventName={eventName} timeInfo={timeInfo} initial={initial} />);

    expect(screen.getByText(eventName)).toBeInTheDocument();
    expect(screen.getByText(timeInfo)).toBeInTheDocument();
  });

  it('renders the correct initials in the circle', () => {
    const initial = 'S';
    
    render(<Event eventName="Some Event" timeInfo="In 3 days" initial={initial} />);

    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('should apply correct classnames for styling', () => {
    const { container } = render(<Event eventName="Some Event" timeInfo="In 3 days" initial="S" />);
    
    const eventDiv = container.firstChild;
    expect(eventDiv).toHaveClass('bg-white w-fulll h-[71px] rounded-xl flex items-center');
  });
});
