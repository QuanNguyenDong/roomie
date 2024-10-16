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
    const [isPriorityOpen, setPriorityOpen] = useState(false);
    const [isFrequencyOpen, setFrequencyOpen] = useState(false);
    const [isTimeOpen, setTimeOpen] = useState(false);
    const inputRef = useRef(null);
    const [selectedPriority, setSelectedPriority] = useState("Select");
    const [selectedTime, setSelectedTime] = useState("Select");
    const [selectedTimeValue, setSelectedTimeValue] = useState(0);
    const [selectedFrequencyValue, setSelectedFrequencyValue] = useState(0); // Numeric value as int
    const [selectedFrequency, setSelectedFrequency] = useState('Select'); // Display text
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleSelect = (option) => {
      setSelectedPriority(option); 
      setPriorityOpen(false); 
    };

    const handleTimeSelect = (value, displayText) => {
      setSelectedTimeValue(value);
      setSelectedTime(displayText);
      setTimeOpen(false); 
    };
  
    const handleFrequencySelect = (value, displayText) => {
      setSelectedFrequencyValue(value);
      setSelectedFrequency(displayText);
      setFrequencyOpen(false); 
    };  
  

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

    const handleSubmit = async () => {
      const taskData = {
          taskname: taskName,
          description: description,
          priority: selectedPriority,
          frequency: selectedFrequencyValue,
          duration: selectedTimeValue,
      };
      
      // You can replace the above line with any logic to send taskData to your backend or handle it as needed
      await createTask(taskData);
      // Reset the form after submission
      setTaskName('');
      setDescription('');
      setSelectedPriority('Select');
      setSelectedFrequency('Select');
      setSelectedTime('Select');
      toggleModal();
  };


    return (
        <div className="flex justify-center ">
            <div className="fixed bottom-0 w-[500px] px-7 mb-8">
                <div className="bg-black text-white rounded-[50px]">
                    <div className="h-16 flex flex-row justify-center space-x-16 sm:space-x-16 z-20">
                        <button onClick={() => navigate('/home')}>
                            <HomeIcon fill="white" />
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
                        <button className="">
                            <SettingsIcon fill="rgba(255, 255, 255, 0.5)" />
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
                     <div className="border-t-8 border-slate-950 w-full p-6 flex flex-col items-center rounded-t-[2rem]">
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
                           value={taskName} // Bind the input value to the state
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
                         {/* Priority */}
                         <div className="icon-text-container flex justify-between items-center">
                           <span className="icon-text-label flex items-center space-x-2">
                             <PriorityIcon />
                             <span className="text-[16px] text-black">Priority:</span>
                           </span>
                           <div className="relative">
                             {/* Dropdown Button */}
                             <button
                               onClick={() => setPriorityOpen(!isPriorityOpen)}
                               className="bg-[#D9D9D9] text-black text-[12px] p-2 rounded-full h-9 w-32 flex items-center justify-between"
                             >
                               <span style={{ marginLeft: "10px" }}>{selectedPriority}</span>
                               <DropdownIcon />
                             </button>
                 
                             {/* Dropdown List */}
                             {isPriorityOpen && (
                               <ul className="absolute right-0 mt-2 w-32 p-2 bg-white text-black rounded-lg shadow-lg z-20">
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleSelect('High')}>High</li>
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleSelect('Medium')}>Medium</li>
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleSelect('Low')}>Low</li>
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
                             {/* Dropdown Button */}
                             <button
                               onClick={() => setFrequencyOpen(!isFrequencyOpen)}
                               className="bg-[#D9D9D9] text-black text-[12px] p-2 rounded-full h-9 w-32 flex items-center justify-between"
                             >
                               <span style={{ marginLeft: "10px" }}>{selectedFrequency}</span>
                               <DropdownIcon />
                             </button>
                 
                             {/* Dropdown List */}
                             {isFrequencyOpen && (
                               <ul className="absolute right-0 mt-2 w-32 p-2 bg-white text-black rounded-lg shadow-lg z-20">
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleFrequencySelect(1, 'Daily')}>Daily</li>
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleFrequencySelect(7, 'Weekly')}>Weekly</li>
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleFrequencySelect(30, 'Monthly')}>Monthly</li>
                               </ul>
                             )}
                           </div>
                         </div>
                 
                         {/* Time Required */}
                         <div className="icon-text-container flex justify-between items-center mt-4">
                           <span className="icon-text-label flex items-center space-x-2">
                             <DurationIcon />
                             <span className="text-[16px] text-black">Time Required:</span>
                           </span>
                           <div className="relative">
                             {/* Dropdown Button */}
                             <button
                               onClick={() => setTimeOpen(!isTimeOpen)}
                               className="bg-[#D9D9D9] text-black text-[12px] p-2 rounded-full h-9 w-32 flex items-center justify-between"
                             >
                               <span style={{ marginLeft: "10px" }}>{selectedTime}</span>
                               <DropdownIcon />
                             </button>
                 
                             {/* Dropdown List */}
                             {isTimeOpen && (
                               <ul className="absolute right-0 mt-2 w-32 p-2 bg-white text-black rounded-lg shadow-lg z-20">
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleTimeSelect(30, '30 Mins')}>30 Mins</li>
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleTimeSelect(60, '60 Mins')}>60 Mins</li>
                                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-[14px]" onClick={() => handleTimeSelect(90, '90 Mins')}>90 Mins</li>
                               </ul>
                             )}
                           </div>
                         </div>
                       </div>
                     </div>
                 
            
                     <div className="absolute right-14">
                       <button
                          onClick={handleSubmit}
                          className="bg-none text-black py-1 px-4 rounded-lg text-[12px] border border-black border-solid hover:bg-slate-950 hover:text-white">
                          Submit
                       </button>
                     </div>
                   </div>
                 </motion.div>
                 
                )}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;