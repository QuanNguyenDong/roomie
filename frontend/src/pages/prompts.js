import React, { useState, useEffect } from 'react';
import '../styling/prompts.css';
import getQuestions from '../services/Question/getQuestions';
import createAnswers from '../services/Prompt/createAnswers';
import { useNavigate } from "react-router-dom";

const Prompts = () => {
  let navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getQuestions();
        setPrompts(questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const togglePromptSelection = (prompt) => {
    const selectedIndex = selectedPrompts.indexOf(prompt);
    let newSelectedPrompts = [...selectedPrompts];
    if (selectedIndex === -1) {
      if (selectedPrompts.length < 3) {
        newSelectedPrompts.push(prompt);
      }
    } else {
      newSelectedPrompts.splice(selectedIndex, 1);
    }
    setSelectedPrompts(newSelectedPrompts);
    setShowAnswerButton(newSelectedPrompts.length > 0);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    const answers = selectedPrompts.map(prompt => ({
      question: prompt.questionId,
      answer: prompt.answer
    }))
    
    try {
      await createAnswers({ answers });
      navigate("/home");
    } catch (e) {
      alert("Failed to submit answers!")
    }
  };
  return (
    <div className="prompts-page-container">
      <div className="prompts-container">
        <h1>Prompts</h1>
        {/* New text added here */}
        <p className="prompts-subtitle">
          Choose up to 3 questions for your roomies to get to know you!
        </p>
        
        <div className="prompt-list">
          {prompts.map((prompt, index) => (
            <div key={index} className="prompt-item">
              <input
                type="checkbox"
                id={`checkbox-${prompt.questionId}`}
                className="checkbox-style"
                checked={selectedPrompts.includes(prompt)}
                onChange={() => togglePromptSelection(prompt)}
              />
              <label htmlFor={`checkbox-${prompt.questionId}`} className="prompt-label">
              {prompt.question}
              </label>
            </div>
          ))}
      </div>
        
        {showAnswerButton && (
          <button className="answer-btn" onClick={() => setCurrentPrompt(selectedPrompts[0])}>
            Answer Selected Prompts
          </button>
        )}
        {currentPrompt && (
          <form onSubmit={handleAnswerSubmit}>
            <div className="answer-box">
              {selectedPrompts.map((prompt, id) => (
                <div key={id} className="mb-4">
                  <h2 className="prompt-title" data-testid={`prompt-title-${prompt.questionId}`}>
                  {prompt.question}
                  </h2>
                  <textarea 
                    name={prompt.questionId}
                    placeholder="Type your answer here..."
                    value={prompt.answer}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setSelectedPrompts((prevPrompts) =>
                        prevPrompts.map((prompt) =>
                          prompt.questionId === name ? { ...prompt, answer: value } : prompt
                        )
                      );
                    }}
                    required 
                    className="answer-textarea"
                    data-testid={`answer-textarea-${prompt.questionId}`}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="next-btn">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Prompts;

// ACCEPTANCE TESTING:

/*
Test Case 1: Page Load and Prompt Display
Preconditions: User has navigated to the prompts page.
•	Steps:
    1.	Open the prompts page.
    2.	Observe the page layout and prompt options.
•	Expected Results:
    1.	The page title "Prompts" should be displayed.
    2.	A subtitle with the text "Choose up to 3 questions for your roomies to get to know you!" should be visible.
    3.	A list of 10 prompts should be displayed, each with a checkbox.

Test Case 2: Select Up to 3 Prompts
Preconditions: User is on the prompts page, no prompts selected.
•	Steps:
    1.	Select a prompt by clicking the checkbox next to the prompt text.
    2.	Repeat to select 2 more prompts.
    3.	Attempt to select a 4th prompt.
•	Expected Results:
    1.	Each selected prompt should be marked with a checked checkbox.
    2.	The "Answer Selected Prompts" button should become visible after at least one prompt is selected.
    3.	The user should not be able to select more than 3 prompts.

Test Case 3: Deselect Prompts
Preconditions: User has selected at least one prompt.
•	Steps:
    1.	Deselect a selected prompt by clicking on the checkbox again.
•	Expected Results:
    1.	The prompt should be deselected, and the checkbox should be unchecked.
    2.	The "Answer Selected Prompts" button should disappear if no prompts are selected.

Test Case 4: Begin Answering Selected Prompts
Preconditions: User has selected 1-3 prompts.
•	Steps:
    1.	Click the "Answer Selected Prompts" button.
    2.	The first selected prompt should appear with a text box to answer the prompt.
•	Expected Results:
    1.	The current prompt should appear with a title matching the prompt.
    2.	A text box with a "Next" button should be displayed for answering.

Test Case 5: Submit an Answer and Move to the Next Prompt
Preconditions: User is answering prompts, one answer has been typed.
•	Steps:
    1.	Type an answer in the text area for the current prompt.
    2.	Click "Next."
•	Expected Results:
    1.	The answer should be saved, and the next selected prompt (if any) should be displayed.
    2.	If no more prompts remain, the text area should disappear.

Test Case 6: Submit an Empty Answer
Preconditions: User has selected a prompt but has not yet typed an answer.
•	Steps:
    1.	Click "Next" without typing an answer.
•	Expected Results:
    1.	The form should prevent submission and notify the user that the answer is required.

Test Case 7: Verify Stored Answers
Preconditions: User has answered all selected prompts.
•	Steps:
    1.	After answering, inspect the answers state in the component or the storage mechanism for answers.
•	Expected Results:
    1.	All selected prompts should have corresponding answers stored correctly in the application state.
*/
