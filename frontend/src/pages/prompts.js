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
            <div key={index} className="prompt-item" onClick={() => togglePromptSelection(prompt)}>
              <input
                type="checkbox"
                className="checkbox-style"
                checked={selectedPrompts.includes(prompt)}
                onChange={() => togglePromptSelection(prompt)}
              />
              <label className="prompt-label">{prompt.question}</label>
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
                  <h2 className="prompt-title">{prompt.question}</h2>
                  <textarea 
                    name={prompt.questionId}
                    placeholder="Type your answer here..."
                    value={prompt.answer}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      const modified = selectedPrompts.map(prompt => {
                        if (prompt.questionId === name) prompt.answer = value;
                        return prompt;
                      })
                      setSelectedPrompts(prev => prev = modified);
                    }}
                    required 
                    className="answer-textarea"
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

