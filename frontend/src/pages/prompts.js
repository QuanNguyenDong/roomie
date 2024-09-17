import React, { useState } from 'react';

// List of prompts
const promptsData = [
  "If your room could talk, what secrets would it share?",
  "Weirdest thing you found in your room",
  "Your favorite movie",
  "Your hobbies",
  "A non-negotiable",
  "The vibe I'm looking for",
  "One thing I'll never forget",
  "My fight or flight",
  "Unusual house warming gift",
  "Your dream home",
];

const Prompts = () => {
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [answers, setAnswers] = useState({});

  // Handle selecting or unselecting a prompt
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

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (currentPrompt) {
      setAnswers({ ...answers, [currentPrompt]: e.target.answer.value });
      const nextPrompt = selectedPrompts[selectedPrompts.indexOf(currentPrompt) + 1];
      setCurrentPrompt(nextPrompt || '');
    }
  };

  return (
    <div className="prompts-container">
      <h1>Prompts</h1>
      <div className="prompt-list">
        {promptsData.map((prompt, index) => (
          <div key={index} className="prompt-item">
            <input
              type="checkbox"
              checked={selectedPrompts.includes(prompt)}
              onChange={() => togglePromptSelection(prompt)}
            />
            <label>{prompt}</label>
          </div>
        ))}
      </div>
      
      {showAnswerButton && (
        <button onClick={() => setCurrentPrompt(selectedPrompts[0])}>
          Answer Selected Prompts
        </button>
      )}

      {currentPrompt && (
        <div className="answer-box">
          <h2>{currentPrompt}</h2>
          <form onSubmit={handleAnswerSubmit}>
            <textarea name="answer" placeholder="Type your answer here..." required />
            <button type="submit">Next</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Prompts;
