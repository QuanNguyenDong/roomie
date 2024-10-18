import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { completeTask } from '../services/Task/CreateTask';

import "../styling/taskCard.scss"
import TickIcon from "../svgs/TaskManagement/TickIcon";
import CloseIcon from "../svgs/TaskManagement/CloseIcon";
import PriorityIcon from "../svgs/TaskManagement/PriorityIcon";
import TaskFrequencyIcon from "../svgs/TaskManagement/TaskFrequencyIcon";
import DurationIcon from "../svgs/TaskManagement/DurationIcon";
import PuzzleIcon from "../svgs/TaskManagement/PuzzleIcon";
import DeadlineIcon from "../svgs/TaskManagement/DeadlineIcon";

import CustomCheckbox from '../components/common/CustomCheckbox';

function TaskModal({ user, task, taskuser, isOpen, onClose }) {
    const [flipped, setFlipped] = useState(false);
    const [bgColor, setBgColor] = useState('bg-gray-400');
    const [isChecked, setIsChecked] = useState(false);

    if (!isOpen || !task) return null;

    const getHeaderGradient = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'linear-gradient(180deg, #C49191 24.9%, #F6F6F6 86.58%)'; // Red gradient for high priority
            case 'medium':
                return 'linear-gradient(180deg, #D8AF8A 24.9%, #F6F6F6 86.58%)'; // Yellow gradient for medium priority
            case 'low':
                return 'linear-gradient(180deg, #9DB492 24.9%, #F6F6F6 86.58%)'; // Green gradient for low priority
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

    const handleCheckboxChange = async () => {
        if (!isChecked && taskuser === user.userId) {
            setIsChecked(true);
            handleFlip();

            try {
                await completeTask(task.taskId);
            } catch (error) {
                console.error("Failed to complete task:", error);
            }
        }
    };


    const handleFlip = () => {
        setFlipped(!flipped);
        setBgColor('bg-gray-400');

        setTimeout(() => {
            if (!flipped) {
                setBgColor('bg-[#58AF70]');
            }
        }, 100);
    };

    return (
        <div className="modal-overlay text-black" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="header" style={{ background: getHeaderGradient(task.priority) }}>
                    <motion.div
                        className=""
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ perspective: 1000 }}
                    >
                        <div className={`mt-5 w-[120px] h-[120px] rounded-full ${bgColor} flex justify-center items-center my-5 mx-auto text-5xl text-white shadow-lg`}>
                            {bgColor === 'bg-gray-400' && task.fullname.charAt(0).toUpperCase()}
                            {bgColor === 'bg-[#58AF70]' && <TickIcon />}
                        </div>
                    </motion.div>

                    <button className="close-button" onClick={onClose}><CloseIcon /></button>

                    <div className="flex flex-row justify-between">
                        <text className='text-3xl font-bold p-2'>{task.taskname}</text>
                        {taskuser === user?.userId && (
                            <div className="bg-white w-20 h-8 rounded-3xl mt-2.5">
                                <CustomCheckbox isChecked={isChecked} onChange={handleCheckboxChange} />
                            </div>    
                        )}
                    </div>

                    <div className={`priority-tag ${getPriorityClass(task.priority)}`}>
                        <p style={{ marginTop: "8px" }}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                    </div>
                </div>

                <text class="text-3xl font-lato ml-10 mb-4 mt-4 font-light">Description</text>
                <div className='description'>
                    <p class="font-sans font-extralight text-sm">{task.description}</p>
                </div>
                <div className='content'>
                    <div className='deadline-box'>
                        <p>
                            <span className="icon-text-container">
                                <span className="icon-text-label font-lato font-bold">
                                    <DeadlineIcon />
                                    Deadline:
                                </span>
                                <span className="font-sans font-extralight">
                                    {task.dueDate}
                                </span>
                            </span>
                        </p>

                        <hr style={{ border: "none", borderBottom: "0.3px dashed #000", margin: "10px 0" }} />
                        <p>
                            <span className="icon-text-container">
                                <span className="icon-text-label font-lato font-bold">
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
