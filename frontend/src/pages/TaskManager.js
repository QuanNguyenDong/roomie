import React from 'react';
import '../styling/taskManager.scss'; 
import TileIcon from '../svgs/Home/Tasks/TileIcon.js';

function TaskManager() {
    // Sample task data
    const tasks = [
        {
            title: 'Vacuum Living Room',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '30 Min',
            priority: 'high',
            avatar: 'T'
        },
        {
            title: 'Take Out Trash',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '5 Min',
            priority: 'high',
            avatar: 'V'
        },
        {
            title: 'Water Plants',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '30 Min',
            priority: 'low',
            avatar: 'R'
        },
        {
            title: 'Clean Bathroom',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '30 Min',
            priority: 'medium',
            avatar: 'S'
        }
    ];

    return (
        <div className="task-manager">
            <h2>Tasks</h2>
            <div className="task-filter-buttons">
                <button>All Tasks</button>
                <button>Priority</button>
            </div>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className={`task-card ${task.priority}`}>
                         <div className='logoicon'> <TileIcon /></div>
                        <div className="task-header">
                            <h3>{task.title}</h3>
                            <div className="task-avatar">{task.avatar}</div>
                        </div>
                        <p className="task-subtext">{task.description}</p>
                        <div className="task-footer">
                            <p>{task.dueDate}</p>
                            <p>{task.frequency}</p>
                            <p>{task.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskManager;
