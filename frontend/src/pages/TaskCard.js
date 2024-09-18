import React from 'react';
import "../styling/taskCard.scss"
import CloseIcon from "../svgs/TaskManagement/CloseIcon";

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
                <p>Due Date: {task.dueDate}</p>
                <p>Frequency: {task.frequency}</p>
                <p>Time Required: {task.time}</p>

            </div>
        </div>
    );
}

export default TaskModal;
