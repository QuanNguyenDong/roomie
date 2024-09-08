import React, { useState } from 'react';
import '../styling/taskManager.scss'; 
import TileIcon from '../svgs/Home/Tasks/TileIcon.js';
import FrequencyIcon from '../svgs/TaskManagement/FrequencyIcon.js';

function TaskManager() {
    const [priorityFilter, setPriorityFilter] = useState('All'); // State for filtering tasks by priority
    const [isPriorityDropdownOpen, setPriorityDropdownOpen] = useState(false); // State to control dropdown visibility

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

    
    const handleFilterChange = (priority) => {
        setPriorityFilter(priority);
        setPriorityDropdownOpen(false); 
    };

    
    const togglePriorityDropdown = () => {
        setPriorityDropdownOpen(!isPriorityDropdownOpen);
    };

    
    const filteredTasks = tasks.filter((task) => {
        return priorityFilter === 'All' || task.priority === priorityFilter.toLowerCase();
    });

    return (
        <div className="task-manager">
            <h2>Tasks</h2>
            <div className="task-filter-buttons">
                <button onClick={() => setPriorityFilter('All')}>All Tasks</button>
                <button onClick={togglePriorityDropdown}>Priority</button>

                {isPriorityDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li onClick={() => handleFilterChange('High')}>High</li>
                            <li onClick={() => handleFilterChange('Medium')}>Medium</li>
                            <li onClick={() => handleFilterChange('Low')}>Low</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="task-list">
                {filteredTasks.map((task, index) => (
                    <div key={index} className={`task-card ${task.priority}`}>
                         <div className='logoicon'> <TileIcon /></div>
                        <div className="task-header">
                            <h3>{task.title}</h3>
                            <div className="task-avatar">{task.avatar}</div>
                        </div>
                        <p className="task-subtext">{task.description}</p>
                        <div className="task-footer">
                            <p>{task.dueDate} <FrequencyIcon /> {task.frequency}</p>
                            <p>{task.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskManager;
