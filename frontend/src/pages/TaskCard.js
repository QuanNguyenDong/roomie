import React from 'react';
import "../styling/taskCard.scss"
import CloseIcon from "../svgs/TaskManagement/CloseIcon";
import PriorityIcon from "../svgs/TaskManagement/PriorityIcon";
import TaskFrequencyIcon from "../svgs/TaskManagement/TaskFrequencyIcon";
import DurationIcon from "../svgs/TaskManagement/DurationIcon";
import PuzzleIcon from "../svgs/TaskManagement/PuzzleIcon";
import DeadlineIcon from "../svgs/TaskManagement/DeadlineIcon";

function TaskModal({ task, isOpen, onClose }) {
    if (!isOpen || !task) return null;

    const getHeaderGradient = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'linear-gradient(180deg, #A2BACC 24.9%, #F6F6F6 86.58%)'; // Red gradient for high priority
            case 'medium':
                return 'linear-gradient(180deg, #C3B8BD 24.9%, #F6F6F6 86.58%)'; // Yellow gradient for medium priority
            case 'low':
                return 'linear-gradient(180deg, #A8B9A4 24.9%, #F6F6F6 86.58%)'; // Green gradient for low priority
            default:
                return 'linear-gradient(180deg, #D9D9D9 24.9%, #F6F6F6 86.58%)'; // Default gradient
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    };

    return (
        <div className="modal-overlay" data-testid="modal-overlay" onClick={onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog">
                    <div className="header" style={{ background: getHeaderGradient(task.priority) }}> 
                    <div className='task-avatar2'>{task.fullname.charAt(0).toUpperCase()}</div>
                    <button className="close-button" onClick={onClose}><CloseIcon /></button>
                    <h1>{task.taskname}</h1>
                    <div className={`priority-tag ${getPriorityClass(task.priority)}`}>
                        <p style={{marginTop: "10px"}}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                    </div>
                </div>

                <h2>Description</h2>
                <div className='description'>
                    <p>{task.description}</p>
                </div>
                <div className='content'>
                    <div className='deadline-box'>
                    <p>
                            <span className="icon-text-container">
                                <span className="icon-text-label">
                                    <DeadlineIcon /> 
                                    Deadline:
                                </span>
                                <span className="icon-text-date">
                                    {task.dueDate}
                                </span>
                            </span>
                        </p>
                        
                        <hr style={{ border: "none", borderBottom: "0.3px dashed #000", margin: "10px 0" }} />
                        <p>
                            <span className="icon-text-container">
                                <span className="icon-text-label">
                                <PuzzleIcon /> 
                                    Redistribution:
                                </span>
                                {/* <span className="icon-text-date">
                                    {task.dueDate}
                                </span> */}
                            </span>
                        </p>
                       
                    </div>
                    <div className='frequency-box'>

                    <p>
                            <span className="icon-text-container">
                                <span className="icon-text-label">
                                <PriorityIcon /> 
                                Priority: {task.priority}
                                </span>
                                {/* <span className="icon-text-date">
                                    {task.dueDate}
                                </span> */}
                            </span>
                        </p>
                        <p>
                            <span className="icon-text-container">
                                <span className="icon-text-label">
                                <TaskFrequencyIcon /> 
                                Frequency: {task.frequency} days
                                </span>
                                {/* <span className="icon-text-date">
                                    {task.dueDate}
                                </span> */}
                            </span>
                        </p>
                        
                        <p>
                            <span className="icon-text-container">
                                <span className="icon-text-label">
                                <DurationIcon /> 
                                Time Required: {task.duration} minutes
                                </span>
                                {/* <span className="icon-text-date">
                                    {task.dueDate}
                                </span> */}
                            </span>
                        </p>
            
                    </div>

                </div>

            </div>
        </div>
    );
}

export default TaskModal;
