import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Prompts from '../prompts';
import { MemoryRouter } from 'react-router-dom';
import getQuestions from '../../services/Question/getQuestions';
import createAnswers from '../../services/Prompt/createAnswers';

jest.mock('../../services/Question/getQuestions');
jest.mock('../../services/Prompt/createAnswers');

describe('Prompts Component', () => {
  const mockQuestions = [
    { questionId: '1', question: 'What is your favorite color?' },
    { questionId: '2', question: 'What is your hobby?' },
    { questionId: '3', question: 'What is your favorite food?' },
    { questionId: '4', question: 'What is your dream vacation?' },
  ];

  beforeEach(() => {
    getQuestions.mockResolvedValue(mockQuestions);
  });

  test('renders page title and prompts correctly', async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Prompts')).toBeInTheDocument();
    });

    expect(screen.getByText('Choose up to 3 questions for your roomies to get to know you!')).toBeInTheDocument();

    await waitFor(() => {
      mockQuestions.forEach((question) => {
        expect(screen.getByText((content) => content.includes(question.question))).toBeInTheDocument();
      });
    });
  });

  test('selects up to 3 prompts and disables additional selections', async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    });

    mockQuestions.slice(0, 3).forEach((question) => {
      const checkbox = screen.getByLabelText(question.question);
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    const fourthCheckbox = screen.getByLabelText(mockQuestions[3].question);
    fireEvent.click(fourthCheckbox);
    expect(fourthCheckbox).not.toBeChecked();
  });

  test('deselects a selected prompt and hides answer button if no prompts are selected', async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    });

    const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();

    expect(screen.queryByText('Answer Selected Prompts')).toBeNull();
  });

  test('displays selected prompts for answering', async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
      fireEvent.click(firstCheckbox);
    });
  
    const answerButton = screen.getByText('Answer Selected Prompts');
    fireEvent.click(answerButton);
  
    await waitFor(() => {
      expect(screen.getByTestId(`prompt-title-${mockQuestions[0].questionId}`)).toBeInTheDocument();
      expect(screen.getByTestId(`answer-textarea-${mockQuestions[0].questionId}`)).toBeInTheDocument();
    });
  });

  test('submits answers and navigates to home', async () => {
    createAnswers.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    });
    const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
    fireEvent.click(firstCheckbox);
    
    // Click the 'Answer Selected Prompts' button
    const answerButton = screen.getByText('Answer Selected Prompts');
    fireEvent.click(answerButton);
    
    // Target the specific text area using data-testid or placeholder
    const textArea = screen.getByPlaceholderText('Type your answer here...');
    fireEvent.change(textArea, { target: { value: 'Blue' } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    // Wait for createAnswers to be called with the expected data
    await waitFor(() => {
      expect(createAnswers).toHaveBeenCalledWith({
        answers: [{ question: mockQuestions[0].questionId, answer: 'Blue' }],
      });
    });
  });
});
    