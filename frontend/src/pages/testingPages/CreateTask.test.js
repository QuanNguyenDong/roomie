import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateTask from '../CreateTask';
import { MemoryRouter } from 'react-router-dom'; 

describe('CreateTask Component', () => {
  test('renders task heading and description', () => {
    render(
      <MemoryRouter>
        <CreateTask />
      </MemoryRouter>
    );

    expect(screen.getByText(/Wash dishes/i)).toBeInTheDocument();
    expect(screen.getByText(/Use rubber gloves/i)).toBeInTheDocument();
  });

  test('renders priority, frequency, and time required', () => {
    render(
      <MemoryRouter>
        <CreateTask />
      </MemoryRouter>
    );

    expect(screen.getByText(/Priority: pp/i)).toBeInTheDocument();
    expect(screen.getByText(/Frequency: FQ days/i)).toBeInTheDocument();
    expect(screen.getByText(/Time Required: 60 minutes/i)).toBeInTheDocument();
  });
});
