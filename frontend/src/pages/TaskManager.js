import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/taskManager.scss";

import getUserProfile from "../services/User/getUserProfile";
import { getHouseTask } from "../services/Task/getTasks.js";
import PriorityDropdown from "../svgs/TaskManagement/PriorityDropdown.js";

import TileIcon from "../svgs/Home/Tasks/TileIcon.js";
import FrequencyIcon from "../svgs/TaskManagement/FrequencyIcon.js";

import TaskModal from "./TaskCard.js";

function TaskManager() {
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]); // State to store users
    const [selectedTask, setSelectedTask] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState("All Priority"); // Default is 'All Priority'
    const [selectedUser, setSelectedUser] = useState("All"); // State to filter by user
    const [isPriorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
    const [isAllTasksDropdownOpen, setAllTasksDropdownOpen] = useState(false); // State for 'All Tasks' dropdown

    let navigate = useNavigate();

    const dropdownRef = useRef(null);
    const priorityButtonRef = useRef(null);
    const allTasksButtonRef = useRef(null); // Ref for 'All Tasks' button

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            getUserProfile()
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);
                    } else navigate("/");
                })
                .catch((error) => navigate("/"));
        } else {
            setUser(storedUser);
        }

        getHouseTask().then((fetchedTasks) => {
            if (fetchedTasks) {
                const uniqueUsers = [...new Set(fetchedTasks.map(task => task.fullname))];
                setUsers(uniqueUsers); // Store users for filtering

                fetchedTasks = fetchedTasks.map((task) => {
                    task["dueDate"] = calculateDueDate(
                        task.startDate,
                        task.frequency
                    );
                    return task;
                });
            }
            setTasks(fetchedTasks || []);
        });

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !priorityButtonRef.current.contains(event.target) &&
                !allTasksButtonRef.current.contains(event.target) // For 'All Tasks' button
            ) {
                setPriorityDropdownOpen(false);
                setAllTasksDropdownOpen(false); // Close 'All Tasks' dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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

    const handleUserFilterChange = (user) => {
        setSelectedUser(user);
        setAllTasksDropdownOpen(false); // Close dropdown after selecting user
    };

    const togglePriorityDropdown = () => {
        if (isPriorityDropdownOpen) {
            setPriorityDropdownOpen(false); // Close if already open
        } else {
            setPriorityDropdownOpen(true);  // Open Priority dropdown
            setAllTasksDropdownOpen(false); // Close 'All Tasks' dropdown
        }
    };

    const toggleAllTasksDropdown = () => {
        if (isAllTasksDropdownOpen) {
            setAllTasksDropdownOpen(false); // Close if already open
        } else {
            setAllTasksDropdownOpen(true);  // Open 'All Tasks' dropdown
            setPriorityDropdownOpen(false); // Close Priority dropdown
        }
    };

    const filteredTasks = tasks
        .filter((task) => task.status !== "completed")
        .filter((task) => {
            return (
                (priorityFilter === "All Priority" || // Allow all priorities if 'All Priority' is selected
                    task.priority.toLowerCase() ===
                        priorityFilter.toLowerCase()) &&
                (selectedUser === "All" || task.fullname === selectedUser)
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
                <button
                    onClick={toggleAllTasksDropdown}
                    ref={allTasksButtonRef}
                    className="all-tasks-button"
                >
                    All Tasks
                    <PriorityDropdown/>
                </button>
                {isAllTasksDropdownOpen && ( // All Tasks Dropdown Menu
                    <div ref={dropdownRef} className="dropdown-menu">
                        <ul>
                            <li onClick={() => handleUserFilterChange("All")}>
                                All Users
                            </li>
                            {users.map((user, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleUserFilterChange(user)}
                                >
                                    {user}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    onClick={togglePriorityDropdown}
                    ref={priorityButtonRef}
                    className="priority-button"
                >
                    <span className="priority-text">Priority</span>
                    <PriorityDropdown className="priority-icon" />
                </button>

                {isPriorityDropdownOpen && (
                    <div ref={dropdownRef} className="dropdown-menu">
                        <ul>
                            <li onClick={() => handleFilterChange("All Priority")}>
                                All Priority
                            </li>
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
                {filteredTasks.length === 0 && (
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
                user={user}
                taskuser={selectedTask?.userId}
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
