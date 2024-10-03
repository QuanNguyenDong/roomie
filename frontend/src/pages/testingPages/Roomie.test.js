import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Roomie from '../Roomie';
import '@testing-library/jest-dom/extend-expect';
import getHome from '../services/Home/getHome';
import createHome from '../services/Home/createHome';
import joinHome from '../services/Home/joinHome';
import leaveHome from '../services/Home/leaveHome';

// Mock the API service functions
jest.mock('../services/Home/getHome');
jest.mock('../services/Home/createHome');
jest.mock('../services/Home/joinHome');
jest.mock('../services/Home/leaveHome');

describe('Roomie Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders JoinOrCreate component when there is no home', async () => {
    getHome.mockResolvedValueOnce({ house: null, users: null, answers: [] });
    
    render(<Roomie />);

    expect(screen.getByText('Roomie')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('abc12')).toBeInTheDocument();
    expect(screen.getByText('Join')).toBeInTheDocument();
    expect(screen.getByText('Create a HOUSE')).toBeInTheDocument();
  });

  test('allows creating a house with a 5-character code', async () => {
    createHome.mockResolvedValueOnce({ status: 200 });
    render(<Roomie />);

    const codeInput = screen.getByPlaceholderText('abc12');
    fireEvent.change(codeInput, { target: { value: 'abc12' } });

    const createButton = screen.getByText('Create a HOUSE');
    fireEvent.click(createButton);

    expect(createHome).toHaveBeenCalledWith({ code: 'abc12' });
  });

  test('renders house and users when home is available', async () => {
    const mockUsers = [{ fullname: 'John Doe' }];
    const mockAnswers = [{ question: 'Favorite color?', answer: 'Blue', fullname: 'John Doe' }];
    getHome.mockResolvedValueOnce({ house: { code: 'house1' }, users: mockUsers, answers: mockAnswers });

    render(<Roomie />);

    expect(await screen.findByText('House code: house1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Favorite color?')).toBeInTheDocument();
  });

  test('allows leaving the home', async () => {
    const mockUsers = [{ fullname: 'John Doe' }];
    const mockAnswers = [{ question: 'Favorite color?', answer: 'Blue', fullname: 'John Doe' }];
    getHome.mockResolvedValueOnce({ house: { code: 'house1' }, users: mockUsers, answers: mockAnswers });
    leaveHome.mockResolvedValueOnce();

    render(<Roomie />);

    const leaveButton = await screen.findByText('Leave');
    fireEvent.click(leaveButton);

    expect(leaveHome).toHaveBeenCalled();
  });
});
