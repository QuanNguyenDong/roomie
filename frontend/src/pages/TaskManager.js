import React, { useState } from 'react';
import '../styling/taskManager.scss'; 
import TileIcon from '../svgs/Home/Tasks/TileIcon.js';
import FrequencyIcon from '../svgs/TaskManagement/FrequencyIcon.js';
import TaskModal from './TaskCard.js'; 

function TaskManager() {
    const [selectedTask, setSelectedTask] = useState(null); 
    const [priorityFilter, setPriorityFilter] = useState('All'); 
    const [isPriorityDropdownOpen, setPriorityDropdownOpen] = useState(false); 

    
    const tasks = [
        {
            title: 'Vacuum Living Room',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '30 Min',
            priority: 'High',
            avatar: 'T'
        },
        {
            title: 'Take Out Trash',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '5 Min',
            priority: 'High',
            avatar: 'V'
        },
        {
            title: 'Water Plants',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '30 Min',
            priority: 'Low',
            avatar: 'R'
        },
        {
            title: 'Clean Bathroom',
            description: 'Please make sure you get behind the couch too!',
            dueDate: '10 September 2024',
            frequency: 'Weekly',
            time: '30 Min',
            priority: 'Medium',
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

    const openTaskModal = (task) => {
        setSelectedTask(task); 
    };

    const closeTaskModal = () => {
        setSelectedTask(null);
    };

    return (
        <div className="task-manager max-w-[500px] mx-auto">
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
                    <div key={index} className={`task-card ${task.priority}`} onClick={() => openTaskModal(task)}>
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
            <TaskModal task={selectedTask} isOpen={!!selectedTask} onClose={closeTaskModal} />
        </div>
    );
}

export default TaskManager;



/*

Acceptance criteria for TaskManager:

TASK DISPLAY
- All tasks should be displayed by default when no filters are applied.
- Each task card should include the following elements:
    Title of the task
    Task description
    Due date
    Frequency of the task (Weekly, Monthly, etc.)
    Estimated time to complete the task (optional)
    Priority level (High, Medium, Low) should be visually distinct
    Avatar icon to represent task assignment

FILTERING BY PRIORITY (optional)
- Clicking the "Priority" button should open a dropdown menu with three options: High, Medium, Low.
- Selecting a priority from the dropdown should filter the task list to display only tasks that match the selected priority.
- Selecting "All Tasks" should reset the filter and display all tasks again.

TASK CARD
- Task cards should have unique colours depending on the task priority (e.g., high = red, medium = yellow, low = green).
- The task card layout should display the title, description, due date, frequency, and time clearly and correctly aligned.

PRIORITY DROPDOWN
- The priority dropdown should be toggleable, opening and closing with each click on the "Priority" button.
- The dropdown should close automatically after selecting a priority option.
The filter applied should reflect in real-time.

*/