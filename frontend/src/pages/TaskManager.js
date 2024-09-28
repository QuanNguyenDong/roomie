import React, { useState, useEffect } from "react";
import "../styling/taskManager.scss";
import TileIcon from "../svgs/Home/Tasks/TileIcon.js";
import FrequencyIcon from "../svgs/TaskManagement/FrequencyIcon.js";
import TaskModal from "./TaskCard.js";
import { getAllActiveTaskAssignment } from "../services/Task/getActiveTaskAssignment.js";
import PriorityDropdown from "../svgs/TaskManagement/PriorityDropdown.js";

function TaskManager() {
    const [tasks, setTasks] = useState([]); 
    const [selectedTask, setSelectedTask] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [isPriorityDropdownOpen, setPriorityDropdownOpen] = useState(false);



    useEffect(() => {
        getAllActiveTaskAssignment().then((fetchedTasks) => {
            if (fetchedTasks)
                fetchedTasks = fetchedTasks.map((task) => {
                    task["dueDate"] = calculateDueDate(
                        task.startDate,
                        task.frequency
                    );
                    return task;
                });
            setTasks(fetchedTasks || []);
        });
    }, []);

    const priorityColors = {
        High: "#661717",
        Medium: "#703320",
        Low: "#243327",
    };

    const handleFilterChange = (priority) => {
        setPriorityFilter(priority);
        setPriorityDropdownOpen(false);
    };

    const togglePriorityDropdown = () => {
        setPriorityDropdownOpen(!isPriorityDropdownOpen);
    };

    const filteredTasks = tasks.filter((task) => {
        return (
            priorityFilter === "All" ||
            task.priority.toLowerCase() === priorityFilter.toLowerCase()
        );
    });

    const openTaskModal = async (task) => {
        setSelectedTask(task);
    };

    const closeTaskModal = () => {
        setSelectedTask(null);
    };

    const calculateDueDate = (startDate, frequency) => {
        const start = new Date(startDate);
        const dueDate = new Date(start);
        dueDate.setDate(start.getDate() + frequency); // Add frequency (in days) to start date
        return dueDate.toDateString(); // Return a human-readable format
    };

    return (
        <div className="task-manager max-w-[500px] mx-auto">
            <h2 style={{ fontSize: "32px", fontWeight: "600" }}>Tasks</h2>
            <div className="task-filter-buttons">
                <button onClick={() => setPriorityFilter("All")}>
                    All Tasks
                </button>
                <button
                    onClick={togglePriorityDropdown}
                    className="priority-button"
                >
                    <span className="priority-text">Priority</span>
                    <PriorityDropdown className="priority-icon" />
                </button>

                {isPriorityDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li onClick={() => handleFilterChange("High")}>
                                High
                            </li>
                            <li onClick={() => handleFilterChange("Medium")}>
                                Medium
                            </li>
                            <li onClick={() => handleFilterChange("Low")}>
                                Low
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="task-list">
                {filteredTasks.length == 0 && (
                    <div className="bg-secGrey text-center text-xl w-full py-24 rounded-3xl">
                        <span>You don't have any tasks</span>
                    </div>
                )}
                {filteredTasks
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .map((task, index) => (
                        <div
                            key={index}
                            className={`task-card ${task.priority}`}
                            onClick={() => openTaskModal(task)}
                        >
                            <div className="logoicon">
                                {" "}
                                <TileIcon
                                    fill={priorityColors[task.priority]}
                                />
                            </div>
                            <div className="task-header">
                                <h3>{task.taskname}</h3>
                                <div className="task-avatar">
                                    {task.fullname.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <p className="task-subtext">{task.description}</p>
                            <div className="task-footer">
                                <p>
                                    {task.dueDate}
                                    <FrequencyIcon /> {task.frequency} days
                                </p>
                                <p>{task.duration} minutes</p>
                            </div>
                        </div>
                    ))}
            </div>
            <TaskModal
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={closeTaskModal}
            />
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
