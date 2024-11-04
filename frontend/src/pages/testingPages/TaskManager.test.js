import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from '../TaskManager';
import '@testing-library/jest-dom';  
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

const mockTasks = [
  {
    taskname: 'Test Task',
    description: 'Test description',
    priority: 'High',
    startDate: '2024-10-01',
    frequency: 3,
    duration: 45,
    fullname: 'John Doe',
  },
];

test('renders TaskManager and displays tasks', async () => {
  axios.get.mockResolvedValueOnce({ data: mockTasks });

  render(
    <MemoryRouter>
      <TaskManager />
    </MemoryRouter>
  );

  expect(await screen.findByText('Test Task')).toBeInTheDocument();
  expect(screen.getByText('Test description')).toBeInTheDocument();
});

test('opens task modal on task click', async () => {
  axios.get.mockResolvedValueOnce({ data: mockTasks });

  render(
    <MemoryRouter>
      <TaskManager />
    </MemoryRouter>
  );

  fireEvent.click(await screen.findByText('Test Task'));
  expect(screen.getByText('45 minutes')).toBeInTheDocument();
});
