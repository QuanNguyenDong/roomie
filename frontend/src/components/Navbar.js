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

import createTask from '../services/Task/CreateTask';

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({ priority: false, frequency: false, time: false });
  const inputRef = useRef(null);
  const [selected, setSelected] = useState({ priority: "Select", frequency: "Select", time: "Select" });
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const toggleDropdown = (type) => {
    setDropdowns((prev) => ({
      priority: type === 'priority' ? !prev.priority : false,
      frequency: type === 'frequency' ? !prev.frequency : false,
      time: type === 'time' ? !prev.time : false,
    }));
  };

  const handleSelect = (type, value) => {
    setSelected((prev) => ({ ...prev, [type]: value }));
    setDropdowns({ priority: false, frequency: false, time: false });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleClickOutside = (event) => {
      if (event.target.closest('.dropdown')) return;
      setDropdowns({ priority: false, frequency: false, time: false });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleSubmit = async () => {
    const taskData = {
      taskname: taskName,
      description: description,
      priority: selected.priority,
      frequency: selected.frequency,
      duration: selected.time,
    };

    await createTask(taskData);
    setTaskName('');
    setDescription('');
    setSelected({ priority: 'Select', frequency: 'Select', time: 'Select' });
    toggleModal();
  };

  return (
    <div className="flex justify-center ">
      <div className="fixed bottom-0 w-[500px] px-7 mb-8">
        <div className="bg-black text-white rounded-[50px]">
          <div className="h-16 flex flex-row justify-center space-x-16 sm:space-x-16 z-20">
            <button onClick={() => navigate('/home')}><HomeIcon fill="white" /></button>
            <button onClick={() => navigate('/calendar')}><CalendarIcon fill="white" /></button>
            <button onClick={toggleModal}><PlusIcon fill="white" /></button>
            <button onClick={() => navigate('/tasks')}><TasksIcon fill="white" /></button>
            <button className=""><SettingsIcon fill="rgba(255, 255, 255, 0.5)" /></button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="max-w-[520px] border-2 border-b-0 border-slate-950/80 mx-auto fixed bottom-0 left-0 right-0 rounded-t-[1.5rem] bg-[#f6f6f6] text-white font-poppins overflow-y-auto overflow-x-hidden"
            initial={{ y: "100%" }}
            animate={{ y: "0%", opacity: 1, height: "92vh" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <div className="absolute top-8 right-8 cursor-pointer z-50">
              <button onClick={toggleModal}><CloseIcon /></button>
            </div>

            {/* Modal Content */}
            <div className="relative top-0 w-full bg-[#f6f6f6]">
              {/* Header */}
              <div className="w-full p-6 flex flex-col items-center rounded-t-[2rem]">
                <div className="mt-[20px] ml-[15px] w-[100px] h-[100px] rounded-full bg-[#7D8D9C] flex justify-center items-center shadow-[0px_6px_6px_rgba(0,0,0,0.2)]">
                  <PeopleIcon />
                </div>
                <h1 className="text-[32px] mt-7 font-semibold text-center self-start">
                  <input
                    type="text"
                    placeholder="Task Name..."
                    className="w-full text-black bg-transparent focus:outline-none"
                    ref={inputRef}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </h1>
              </div>

              {/* Description */}
              <h2 className="text-[20px] mb-3 font-light ml-11 mt-0 text-black">Description</h2>
              <div className="description bg-[#ECECEC] p-6 w-[86%] mb-5 ml-10 rounded-xl text-black font-light">
                <textarea
                  type="text"
                  placeholder="Type a description..."
                  className="w-full text-[14px] bg-transparent focus:outline-none"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Content Section */}
              <div className="content w-full ml-4 pl-6">
                <div className="bg-[#ECECEC] p-6 rounded-xl w-[89%] mb-5">
                  {['priority', 'frequency', 'time'].map((type, index) => (
                    <div key={type} className="icon-text-container flex justify-between items-center mt-4">
                      <span className="icon-text-label flex items-center space-x-2">
                        {type === 'priority' && <PriorityIcon />}
                        {type === 'frequency' && <TaskFrequencyIcon />}
                        {type === 'time' && <DurationIcon />}
                        <span className="text-[16px] text-black">{`${type.charAt(0).toUpperCase() + type.slice(1)}:`}</span>
                      </span>
                      <div className="relative dropdown">
                        <button
                          onClick={() => toggleDropdown(type)}
                          className="bg-[#D9D9D9] text-black text-[12px] p-2 rounded-full h-9 w-32 flex items-center justify-between"
                        >
                          <span style={{ marginLeft: "10px" }}>{selected[type]}</span>
                          <DropdownIcon />
                        </button>

                        {dropdowns[type] && (
                          <ul className={`absolute ${type === 'time' ? 'bottom-full' : 'top-full'} right-0 ${type === 'time' ? 'mb-2' : 'mt-2'} w-32 p-2 bg-white text-black rounded-lg shadow-lg z-20`}>
                            {type === 'priority' && ['High', 'Medium', 'Low'].map(option => (
                              <li key={option} className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleSelect('priority', option)}>{option}</li>
                            ))}
                            {type === 'frequency' && [
                              { value: 1, text: 'Daily' },
                              { value: 7, text: 'Weekly' },
                              { value: 30, text: 'Monthly' }
                            ].map(option => (
                              <li key={option.text} className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleSelect('frequency', option.value)}>{option.text}</li>
                            ))}
                            {type === 'time' && [
                              { value: 30, text: '30 Min' },
                              { value: 60, text: '60 Min' },
                              { value: 120, text: '120 Min' }
                            ].map(option => (
                              <li key={option.text} className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleSelect('time', option.value)}>{option.text}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-none absolute right-14 mb-4 text-black py-1 px-4 rounded-lg text-[12px] border border-black border-solid hover:bg-slate-950 hover:text-white">
                  Create Task
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
