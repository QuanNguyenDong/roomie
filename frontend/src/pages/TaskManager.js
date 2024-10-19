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
    const [users, setUsers] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [selectedUser, setSelectedUser] = useState("All");
    const [isPriorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
    const [isAllTasksDropdownOpen, setAllTasksDropdownOpen] = useState(false);

    let navigate = useNavigate();

    const dropdownRef = useRef(null);
    const priorityButtonRef = useRef(null);
    const allTasksButtonRef = useRef(null);

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

        // Fetch tasks and set them along with users
        getHouseTask().then((fetchedTasks) => {
            if (fetchedTasks) {
                // Extract unique users from tasks and set them in state
                const uniqueUsers = [...new Set(fetchedTasks.map(task => task.fullname))];
                setUsers(uniqueUsers);

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
                !allTasksButtonRef.current.contains(event.target)
            ) {
                setPriorityDropdownOpen(false);
                setAllTasksDropdownOpen(false);
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
        setAllTasksDropdownOpen(false);
    };

    const togglePriorityDropdown = () => {
        if (isPriorityDropdownOpen) {
            setPriorityDropdownOpen(false);
        } else {
            setPriorityDropdownOpen(true);
            setAllTasksDropdownOpen(false);
        }
    };

    const toggleAllTasksDropdown = () => {
        if (isAllTasksDropdownOpen) {
            setAllTasksDropdownOpen(false);
        } else {
            setAllTasksDropdownOpen(true);
            setPriorityDropdownOpen(false);
        }
    };

    const filteredTasks = tasks
        .filter((task) => task.status !== "completed")
        .filter((task) => {
            return (
                (priorityFilter === "All" ||
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
        dueDate.setDate(start.getDate() + frequency);
        return dueDate.toDateString();
    };

    const displayFrequency = (frequency) => {
        if (frequency === 1) return "Daily";
        if (frequency === 7) return "Weekly";
        if (frequency === 30) return "Monthly";
        return `${frequency} days`;
    };

    return (
        <div className="task-manager max-w-[500px] mx-auto">
            <text className="text-3xl font-bold font-lexend">
                Tasks
            </text>
            <div className="task-filter-buttons">
                <button
                    onClick={toggleAllTasksDropdown}
                    ref={allTasksButtonRef}
                >
                    <span className="priority-text">All Tasks</span>
                    <PriorityDropdown />
                </button>
                {isAllTasksDropdownOpen && (
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
                                <TileIcon
                                    fill={priorityColors[task.priority]}
                                />
                            </div>
                            <div className="task-header">
                                <text className="font-poppins font-bold max-w-full text-xl overflow-ellipses line-clamp-1">{task.taskname}</text> 
                                <div className="task-avatar">
                                    {task.fullname.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <p className="task-subtext max-w-60 text-white line-clamp-3">{task.description}</p>
                            <div className="task-footer">
                                <p>
                                    {task.dueDate}
                                    <FrequencyIcon /> {displayFrequency(task.frequency)}
                                </p>
                                <p className="font-medium">{task.duration} Min</p>
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
