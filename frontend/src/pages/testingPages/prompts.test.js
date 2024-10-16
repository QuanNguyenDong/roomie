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
      // Assert the prompts page is rendered
      expect(screen.getByText('Prompts')).toBeInTheDocument();
    });

    expect(screen.getByText('Choose up to 3 questions for your roomies to get to know you!')).toBeInTheDocument();

    // Assert each prompt question is rendered
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

    // Select the first three prompts
    mockQuestions.slice(0, 3).forEach((question) => {
      const checkbox = screen.getByLabelText(question.question);
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    // Try selecting a fourth prompt (should not be selectable)
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

    // Select and then deselect a prompt
    const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();

    // Check that the answer button is not displayed
    expect(screen.queryByText('Answer Selected Prompts')).toBeNull();
  });

  test('displays selected prompts for answering', async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    });

    // Select one prompt and click 'Answer Selected Prompts'
    const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
    fireEvent.click(firstCheckbox);

    const answerButton = screen.getByText('Answer Selected Prompts');
    fireEvent.click(answerButton);

    // Check that the selected prompt appears with a text area for answers
    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your answer here...')).toBeInTheDocument();
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

    // Select and answer a prompt
    const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
    fireEvent.click(firstCheckbox);
    const answerButton = screen.getByText('Answer Selected Prompts');
    fireEvent.click(answerButton);

    const textArea = screen.getByPlaceholderText('Type your answer here...');
    fireEvent.change(textArea, { target: { value: 'Blue' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createAnswers).toHaveBeenCalledWith({
        answers: [{ question: '1', answer: 'Blue' }],
      });
    });
  });
});
