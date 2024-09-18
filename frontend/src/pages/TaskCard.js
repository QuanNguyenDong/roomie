import React from 'react';
import "../styling/taskCard.scss"
import CloseIcon from "../svgs/TaskManagement/CloseIcon";
import PriorityIcon from "../svgs/TaskManagement/PriorityIcon"
import TaskFrequencyIcon from "../svgs/TaskManagement/TaskFrequencyIcon"
import DurationIcon from "../svgs/TaskManagement/DurationIcon"

function TaskModal({ task, isOpen, onClose }) {
    if (!isOpen || !task) return null; 

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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
                <div className="header"> 
                    <div className='task-avatar2'>{task.avatar}</div>
                    <button className="close-button" onClick={onClose}><CloseIcon /></button>
                    <h1>{task.title}</h1>
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
                       <p><span style={{ fontWeight: "550"}}>Deadline:</span>  {task.dueDate}</p>
                       <hr style={{ border: "none", borderBottom: "0.3px dashed #000", margin: "10px 0" }} />
                        <p><span style={{ fontWeight: "550" }}>Redistribution: </span> </p>
                    </div>
                    <div className='frequency-box'>
                            <p>
                                <span className="priority-container">
                                    <PriorityIcon className="priority-icon" /> 
                                    Priority: {task.priority}
                                </span>
                            </p>
                            <p>
                                <span className="priority-container">
                                    <TaskFrequencyIcon className="priority-icon" />
                                    Frequency: {task.frequency}
                                </span>
                            </p>
                            <p>
                                <span className="priority-container">
                                    <DurationIcon className="priority-icon" /> 
                                    Time Required: {task.time}
                                </span>
                            </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default TaskModal;
