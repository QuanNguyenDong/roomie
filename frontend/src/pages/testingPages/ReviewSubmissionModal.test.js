import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import ReviewModal from '../ReviewSubmissionModal';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import createReviews from '../../services/Review/createReviews';

// Mock dependencies
jest.mock('axios');
jest.mock('../../services/Review/createReviews');

describe('ReviewModal Component', () => {
  const mockUser = {
    userId: 'user1',
    fullname: 'John Doe',
  };

  const mockActiveTasks = [
    { taskId: 'task1', taskname: 'Clean Kitchen', userId: 'user2', fullname: 'Jane Smith' },
    { taskId: 'task2', taskname: 'Wash Dishes', userId: 'user2', fullname: 'Jane Smith' },
  ];

  beforeEach(() => {
    // Mock the user profile API call
    axios.get.mockResolvedValue({ data: mockUser });
    
    // Mock the active tasks API call
    // getAllActiveTaskAssignment.mockResolvedValue(mockActiveTasks);
  });

  afterEach(() => {
    cleanup();  // Cleanup after each test
  });

  test('renders modal and displays user and tasks', async () => {
    render(
      <MemoryRouter>
        <ReviewModal />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText((content, element) => element.textContent.includes('Welcome'))).toBeInTheDocument();
    });
    

    // Check that the modal's heading is rendered
    expect(screen.getByRole('heading', { level: 1, name: /Review/i })).toBeInTheDocument();

    // Check that the tasks are displayed
    expect(screen.getByText('Clean Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Wash Dishes')).toBeInTheDocument();
  });

  test('allows user to input reviews for tasks', async () => {
    render(
      <MemoryRouter>
        <ReviewModal />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Review/i })).toBeInTheDocument();
    });

    // Input a review for the first task
    const [firstTaskTextarea] = screen.getAllByPlaceholderText(/Write your review.../i);
    fireEvent.change(firstTaskTextarea, { target: { value: 'Great job on cleaning the kitchen!' } });
    expect(firstTaskTextarea.value).toBe('Great job on cleaning the kitchen!');
  });

  test('navigates to next user and submits review', async () => {
    render(
      <MemoryRouter>
        <ReviewModal />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Review/i })).toBeInTheDocument();
    });

    // Input a review for the tasks
    const [firstTaskTextarea] = screen.getAllByPlaceholderText(/Write your review.../i);
    fireEvent.change(firstTaskTextarea, { target: { value: 'Great job on cleaning the kitchen!' } });

    // Click "Complete" button
    const completeButton = screen.getByText(/Complete/i);
    fireEvent.click(completeButton);

    // Check that createReviews was called with the correct data
    await waitFor(() => {
      expect(createReviews).toHaveBeenCalledWith([
        { userId: 'user2', taskId: 'task1', reviewText: 'Great job on cleaning the kitchen!' },
      ]);
    });
  });

  test('handles closing the modal and navigates to profile', async () => {
    render(
      <MemoryRouter>
        <ReviewModal />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Review/i })).toBeInTheDocument();
    });

    // Click close button
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // Check if the modal is closed
    expect(screen.queryByRole('heading', { level: 1, name: /Review/i })).not.toBeInTheDocument();
  });
});
