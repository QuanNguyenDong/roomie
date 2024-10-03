import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from '../TaskManager';
import '@testing-library/jest-dom';
import { getAllActiveTaskAssignment } from '../../services/Task/getActiveTaskAssignment';

jest.mock('../../services/Task/getActiveTaskAssignment', () => ({
    getAllActiveTaskAssignment: jest.fn(),
  }));
  

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

describe('TaskManager Component', () => {
    beforeEach(() => {
        getAllActiveTaskAssignment.mockResolvedValue(mockTasks);
      });

  test('renders TaskManager and displays tasks', async () => {
    render(<TaskManager />);
    expect(await screen.findByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  test('opens task modal on task click', async () => {
    render(<TaskManager />);
    fireEvent.click(await screen.findByText('Test Task'));
    expect(screen.getByText('45 minutes')).toBeInTheDocument();
  });

  test('displays no tasks message when there are no tasks', async () => {
    getAllActiveTaskAssignment.mockResolvedValueOnce([]);
    render(<TaskManager />);
    expect(await screen.findByText("You don't have any tasks")).toBeInTheDocument();
  });
});
