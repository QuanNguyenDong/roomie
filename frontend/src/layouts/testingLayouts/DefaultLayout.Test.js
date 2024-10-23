import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefaultLayout from '../DefaultLayout';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

// Mock the Navbar and Topbar components
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Topbar', () => () => <div data-testid="topbar" />);

describe('DefaultLayout Component', () => {
  test('renders children inside the layout', () => {
    render(
      <DefaultLayout>
        <div data-testid="child">Test Child</div>
      </DefaultLayout>
    );

    // Check if Topbar is rendered
    expect(screen.getByTestId('topbar')).toBeInTheDocument();

    // Check if Navbar is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();

    // Check if the child element is rendered
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('renders layout structure correctly', () => {
    const { container } = render(
      <DefaultLayout>
        <div>Sample Content</div>
      </DefaultLayout>
    );

    // Check for the top-level container styles
    expect(container.firstChild).toHaveClass('max-w-[520px]');
    expect(container.firstChild).toHaveClass('mx-auto');
    expect(container.firstChild).toHaveClass('min-h-full');
    expect(container.firstChild).toHaveClass('bg-[#f9f9f9]');
  });
});
