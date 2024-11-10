import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import Prompts from "../prompts";
import { MemoryRouter } from "react-router-dom";
import getQuestions from "../../services/Question/getQuestions";
import createAnswers from "../../services/Prompt/createAnswers";

jest.mock("../../services/Question/getQuestions");
jest.mock("../../services/Prompt/createAnswers");

describe("Prompts Component", () => {
  const mockQuestions = [
    { questionId: "1", question: "What is your favorite color?" },
    { questionId: "2", question: "What is your hobby?" },
    { questionId: "3", question: "What is your favorite food?" },
    { questionId: "4", question: "What is your dream vacation?" },
  ];

  beforeEach(() => {
    getQuestions.mockResolvedValue(mockQuestions);
  });

  test("renders page title and prompts correctly", async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Prompts")).toBeInTheDocument();
      expect(
        screen.getByText("Choose up to 3 questions for your roomies to get to know you!")
      ).toBeInTheDocument();
    });

    mockQuestions.forEach((question) => {
      expect(screen.getByLabelText(question.question)).toBeInTheDocument();
    });
  });

  test("selects up to 3 prompts and disables additional selections", async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockQuestions.slice(0, 3).forEach((question) => {
        const checkbox = screen.getByLabelText(question.question);
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      });
    });

    // Attempt to select a fourth prompt
    const fourthCheckbox = screen.getByLabelText(mockQuestions[3].question);
    fireEvent.click(fourthCheckbox);
    expect(fourthCheckbox).not.toBeChecked();
  });

  test("deselects a selected prompt and hides answer button if no prompts are selected", async () => {
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );

    await waitFor(() => {
      const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).not.toBeChecked();
    });

    expect(screen.queryByText("Answer Selected Prompts")).toBeNull();
  });

  test("submits answers and navigates to home", async () => {
    createAnswers.mockResolvedValue({});
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    render(
      <MemoryRouter>
        <Prompts />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      const firstCheckbox = screen.getByLabelText(mockQuestions[0].question);
      fireEvent.click(firstCheckbox);
    });
  
    const answerButton = screen.getByText("Answer Selected Prompts");
    fireEvent.click(answerButton);
      const formContainer = screen.getByRole("form");
      await waitFor(() => {
      const questionText = within(formContainer).getAllByText(mockQuestions[0].question);
      expect(questionText[0]).toBeInTheDocument();
    });
  
    const textArea = within(formContainer).getByPlaceholderText("Type your answer here...");
    fireEvent.change(textArea, { target: { value: "Blue" } });
  
    const submitButton = within(formContainer).getByText("Submit");
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(createAnswers).toHaveBeenCalledWith({
        answers: [{ question: "1", answer: "Blue" }],
      });
    });
  });
})
