import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import "../styling/createTask.scss";
import "../styling/taskCard.scss";

import '../index.css';

import HomeIcon from '../svgs/Navbar/HomeIcon';
import CalendarIcon from '../svgs/Navbar/CalendarIcon';
import TasksIcon from '../svgs/Navbar/TasksIcon';
import SettingsIcon from '../svgs/Navbar/SettingsIcon';
import PlusIcon from "../svgs/Navbar/PlusIcon";
import PeopleIcon from "../svgs/TaskManagement/PeopleIcon";
import CloseIcon from "../svgs/TaskManagement/CloseIcon";
import PriorityIcon from "../svgs/TaskManagement/PriorityIcon";
import TaskFrequencyIcon from "../svgs/TaskManagement/TaskFrequencyIcon";
import DurationIcon from "../svgs/TaskManagement/DurationIcon";
import DropdownIcon from "../svgs/Navbar/DropdownIcon";

const Navbar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPriorityOpen, setPriorityOpen] = useState(false);
    const [isFrequencyOpen, setFrequencyOpen] = useState(false);
    const [isTimeOpen, setTimeOpen] = useState(false);
    const inputRef = useRef(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {
        if (isModalOpen) {
            inputRef.current.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);


    return (
        <div className="flex justify-center ">
            <div className="fixed bottom-0 w-[500px] px-7 mb-8">
                <div className="bg-black text-white rounded-[50px]">
                    <div className="h-16 flex flex-row justify-center space-x-16 sm:space-x-16 z-20">
                        <button onClick={() => navigate('/home')}>
                            <HomeIcon className='icon' fill="white" />
                        </button>
                        <button onClick={() => navigate('/calendar')}>
                            <CalendarIcon fill="white" />
                        </button>
                        <button onClick={toggleModal}>
                            <PlusIcon fill="white" />
                        </button>
                        <button onClick={() => navigate('/tasks')}>
                            <TasksIcon fill="white" />
                        </button>
                        <button>
                            <SettingsIcon fill="white" />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                    className="max-w-[520px] mx-auto fixed bottom-0 left-0 right-0 rounded-t-[1.5rem] bg-[#f6f6f6] text-white font-poppins overflow-y-auto overflow-x-hidden"
                    initial={{ y: "100%", opacity: 1 }}
                    animate={{ y: "0%", opacity: 1, height: "92vh" }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ ease: "linear", duration: 0.5, x: { duration: 0.25 }}}
                  >
                    {/* Close Button */}
                    <div className="absolute top-8 right-8 cursor-pointer z-50">
                      <button onClick={toggleModal}><CloseIcon /></button>
                    </div>
                  
                    {/* Modal Content */}
                    <div className="relative top-0 w-full bg-[#f6f6f6]">
                      {/* Header */}
                      <div className="border-t-slate-600 w-full p-6 flex flex-col items-center rounded-t-[1.5rem]">
                        {/* Task Avatar */}
                        <div className="mt-[20px] ml-[15px] w-[120px] h-[120px] rounded-full bg-[#7D8D9C] flex justify-center items-center shadow-[0px_6px_6px_rgba(0,0,0,0.2)]">
                          <PeopleIcon />
                        </div>
                        <h1 className="text-[32px] mt-7 font-semibold text-center self-start">
                          <input
                            type="text"
                            placeholder="Task Name..."
                            className="w-full text-black bg-transparent focus:outline-none"
                            ref={inputRef}
                          />
                        </h1>
                      </div>
                  
                      {/* Description */}
                      <h2 className="text-[20px] mb-3 font-light ml-11 mt-0 text-black">Description</h2>
                      <div className="description bg-[#ECECEC] p-6 w-[86%] mb-5 ml-10 rounded-xl text-black font-light">
                        <input
                          type="text"
                          placeholder="Type a description..."
                          className="w-full bg-transparent focus:outline-none"
                        />
                      </div>
                  
                      {/* Content Section */}
                      <div className="content w-full ml-4 pl-6">
                        <div className="bg-[#ECECEC] p-6 rounded-xl w-[89%] mb-5">
                          {/* Priority */}
                          <div className="icon-text-container flex justify-between items-center">
                            <span className="icon-text-label flex items-center space-x-2">
                              <PriorityIcon />
                              <span className="text-[16px] text-black">Priority:</span>
                            </span>
                            <div className="relative">
                            <button onClick={() => setPriorityOpen(!isPriorityOpen)} className="bg-[#D9D9D9] text-black text-[12px] p-2 rounded-full h-9 w-32 flex items-center justify-between">
                                    <span style={{marginLeft:"10px"}}>Select</span>
                                    <DropdownIcon />
                                    </button>
                        {isPriorityOpen && (
                              <ul className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-20 hidden group-hover:block">
                                <li className="p-2 hover:bg-gray-100">High</li>
                                <li className="p-2 hover:bg-gray-100">Medium</li>
                                <li className="p-2 hover:bg-gray-100">Low</li>
                              </ul>
                        )}
                            </div>
                          </div>
                  
                          {/* Frequency */}
                          <div className="icon-text-container flex justify-between items-center mt-4">
                            <span className="icon-text-label flex items-center space-x-2">
                              <TaskFrequencyIcon />
                              <span className="text-[16px] text-black">Frequency:</span>
                            </span>
                            <div className="relative">
                            <button className="bg-[#D9D9D9] text-black text-[12px] p-2 rounded-full h-9 w-32 flex items-center justify-between">
                                    <span style={{marginLeft:"10px"}}>Select</span>
                                    <DropdownIcon />
                                    </button>
                              <ul className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-20 hidden group-hover:block">
                                <li className="p-2 hover:bg-gray-100">Daily</li>
                                <li className="p-2 hover:bg-gray-100">Weekly</li>
                                <li className="p-2 hover:bg-gray-100">Monthly</li>
                              </ul>
                            </div>
                          </div>
                  
                          {/* Time Required */}
                          <div className="icon-text-container flex justify-between items-center mt-4">
                            <span className="icon-text-label flex items-center space-x-2">
                              <DurationIcon />
                              <span className="text-[16px] text-black">Time Required:</span>
                            </span>
                            <div className="relative">
                            <button className="bg-[#D9D9D9] text-black text-[12px] p-2 rounded-full h-9 w-32 flex items-center justify-between">
                                    <span style={{marginLeft:"10px"}}>Select</span>
                                    <DropdownIcon />
                                    </button>
                              <ul className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-20 hidden group-hover:block">
                                <li className="p-2 hover:bg-gray-100">30 mins</li>
                                <li className="p-2 hover:bg-gray-100">60 mins</li>
                                <li className="p-2 hover:bg-gray-100">90 mins</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                

                )}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;