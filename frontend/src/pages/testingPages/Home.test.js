import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import getUserProfile from '../../services/User/getUserProfile';
import { getUserTask } from '../../services/Task/getTasks';
import '@testing-library/jest-dom';

// Mock the services used in Home.js
jest.mock('../../services/User/getUserProfile');
jest.mock('../../services/Task/getTasks');

// Mock data
const mockUser = { fullname: 'John Doe' };
const mockTasks = [
  { fullname: 'Task One', title: 'Task 1', startDate: '2023-09-20', frequency: 2 },
  { fullname: 'Task Two', title: 'Task 2', startDate: '2023-09-25', frequency: 5 },
];

describe('Home Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    getUserProfile.mockResolvedValue(mockUser);  // Correct mock for getUserProfile
    getUserTask.mockResolvedValue(mockTasks);    // Correct mock for getUserTask
  });

  test("renders the user's fullname", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for the fullname to appear
    await waitFor(() => expect(screen.getByText(/Hello, John Doe/i)).toBeInTheDocument());
  });

  test("renders 'You don't have any tasks' when no tasks are available", async () => {
    getUserTask.mockResolvedValue([]);  // Mock no tasks

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check that the message about no tasks is displayed
    await waitFor(() => {
      expect(screen.getByText(/You don't have any tasks/i)).toBeInTheDocument();
    });
  });

  test('renders tasks when tasks are present', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    // Wait for tasks to show up
    await waitFor(() => {
      const task1 = screen.getByText(/Task 1/i);  
      const task2 = screen.getByText(/Task 2/i);  
      
      expect(task1).toBeInTheDocument();
      expect(task2).toBeInTheDocument();
    });
  });
  });
