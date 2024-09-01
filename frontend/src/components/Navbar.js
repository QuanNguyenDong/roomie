import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../index.css';

import HomeIcon from '../svgs/Navbar/HomeIcon';
import CalendarIcon from '../svgs/Navbar/CalendarIcon';
import TasksIcon from '../svgs/Navbar/TasksIcon';
import SettingsIcon from '../svgs/Navbar/SettingsIcon';

const Navbar = ({ }) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <div className="fixed bottom-0 w-[500px] px-7 mb-8">
                <div className="bg-black text-white rounded-[50px]">
                    <div className="h-16 flex flex-row justify-center space-x-16 sm:space-x-16 z-20">
                        <button onClick={() => navigate('/home')}>
                            <HomeIcon className='icon' fill="white" />
                        </button>
                        <button onClick={() => navigate('/calendar')}>
                            <CalendarIcon fill="white" />
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
        </div>
    );
}

export default Navbar;