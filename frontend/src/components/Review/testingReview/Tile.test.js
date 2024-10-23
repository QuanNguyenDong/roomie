import React from 'react';
import { render, screen } from '@testing-library/react';
import Tile from '../Tile';
import '@testing-library/jest-dom';

describe('Tile Component', () => {
  
  it('renders task type tile with reviews', () => {
    const reviews = [
      { reviewText: 'Great work!' },
      { reviewText: 'Needs improvement' },
    ];

    render(<Tile type="task" title="Task 1" reviews={reviews} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Great work!')).toBeInTheDocument();
    expect(screen.getByText('Needs improvement')).toBeInTheDocument();
  });

  it('renders task type tile with no reviews', () => {
    render(<Tile type="task" title="Task 2" reviews={[]} />);

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('No reviews to show')).toBeInTheDocument();
  });

  it('renders stars type tile with correct stars count', () => {
    render(<Tile type="stars" stars={5} />);

    expect(screen.getByText('Stars Earned')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders tasksCompleted type tile with correct count', () => {
    render(<Tile type="tasksCompleted" tasksCompleted={10} />);

    expect(screen.getByText('Tasks Completed')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders nothing for an unsupported type', () => {
    const { container } = render(<Tile type="unsupported" />);

    expect(container.firstChild).toBeNull();
  });
});
