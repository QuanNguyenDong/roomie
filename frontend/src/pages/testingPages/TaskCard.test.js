import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskModal from '../TaskCard';
import '@testing-library/jest-dom';

describe('TaskModal Component', () => {
  const task = {
    taskname: 'Test Task',
    description: 'Test description',
    priority: 'High',
    dueDate: '2024-12-31',
    frequency: 3,
    duration: 45,
    fullname: 'Test User',
  };

  test('renders TaskModal when isOpen is true', () => {
    render(<TaskModal task={task} isOpen={true} onClose={() => {}} />);
    
    // Check if task details are rendered
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('2024-12-31')).toBeInTheDocument();
    expect(screen.getByText(/45\s*minutes/i)).toBeInTheDocument();
    expect(screen.getByText(/3\s*days/i)).toBeInTheDocument();
  });

  test('does not render TaskModal when isOpen is false', () => {
    const { queryByText } = render(<TaskModal task={task} isOpen={false} onClose={() => {}} />);
    
    // Check that the modal is not visible
    expect(queryByText('Test Task')).toBeNull();
  });

  test('calls onClose when clicking outside the modal', () => {
    const onCloseMock = jest.fn();
    
    // Render the modal with `isOpen` set to true
    render(<TaskModal task={task} isOpen={true} onClose={onCloseMock} />);
    
    // Click on the modal overlay (outside the modal content)
    fireEvent.click(screen.getByText('Test Task').closest('.modal-overlay'));
    
    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal', () => {
    const onCloseMock = jest.fn();
    
    // Render the modal with `isOpen` set to true
    render(<TaskModal task={task} isOpen={true} onClose={onCloseMock} />);
    
    // Click inside the modal content
    fireEvent.click(screen.getByText('Test Task'));
    
    // Ensure onClose was not called
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('calls onClose when clicking the close button', () => {
    const onCloseMock = jest.fn();
    
    // Render the modal with `isOpen` set to true
    render(<TaskModal task={task} isOpen={true} onClose={onCloseMock} />);
    
    // Click the close button
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    
    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
