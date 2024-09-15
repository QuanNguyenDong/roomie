import React from 'react';
import "../styling/taskCard.scss"
import CloseIcon from "../svgs/TaskManagement/CloseIcon";

function TaskModal({ task, isOpen, onClose }) {
    if (!isOpen || !task) return null; 

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
                <div className="header"> 
                    <div className='task-avatar2'>{task.avatar}</div>
                    <button className="close-button" onClick={onClose}><CloseIcon/></button>
                    <h2>{task.title}</h2>
                </div>
                <h2>Description</h2>
                <div className='description'>
                    <p>{task.description}</p>
                </div>
                    <p>Due Date: {task.dueDate}</p>
                    <p>Frequency: {task.frequency}</p>
                    <p>Time Required: {task.time}</p>
                    <p>Priority: {task.priority}</p>
                
            </div>
        </div>
    );
}

export default TaskModal;
