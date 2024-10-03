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
});

  test('does not render TaskModal when isOpen is false', () => {
    const { queryByText } = render(<TaskModal task={task} isOpen={false} onClose={() => {}} />);
    
    // Check that the modal is not visible
    expect(queryByText('Test Task')).toBeNull();
  });

  test('calls onClose when clicking outside the modal', () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(<TaskModal task={task} isOpen={true} onClose={onCloseMock} />);
    
    fireEvent.click(screen.getByRole('dialog')); // or
    fireEvent.click(screen.getByTestId('modal-overlay'));
        
    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
