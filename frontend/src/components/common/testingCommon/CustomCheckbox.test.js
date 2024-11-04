import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomCheckbox from '../CustomCheckbox';

describe('CustomCheckbox Component', () => {
  test('renders correctly with unchecked state', () => {
    const handleChange = jest.fn();

    // Render the component with unchecked state
    render(<CustomCheckbox isChecked={false} onChange={handleChange} />);

    // Find the checkbox span element by its role or test its presence using querySelector
    const checkboxSpan = screen.getByText(/Done/i).previousSibling;

    // Ensure the checkbox span exists and is initially unchecked
    expect(checkboxSpan).toHaveClass('bg-white');
    expect(checkboxSpan).not.toHaveClass('bg-black');
  });

  test('renders correctly with checked state', () => {
    const handleChange = jest.fn();

    // Render the component with checked state
    render(<CustomCheckbox isChecked={true} onChange={handleChange} />);

    // Find the checkbox span element
    const checkboxSpan = screen.getByText(/Done/i).previousSibling;

    // Ensure the checkbox span exists and is checked
    expect(checkboxSpan).toHaveClass('bg-black');
    expect(checkboxSpan).not.toHaveClass('bg-white');
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();

    // Render the component with unchecked state
    render(<CustomCheckbox isChecked={false} onChange={handleChange} />);

    // Find the checkbox span element
    const checkboxSpan = screen.getByText(/Done/i).previousSibling;

    // Simulate a click event on the checkbox span
    fireEvent.click(checkboxSpan);

    // Ensure the onChange function is called
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
