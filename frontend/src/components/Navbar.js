import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { HomeIcon, CalendarIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

const Navbar = ({ }) => {
    const navigate = useNavigate();
    
    return (
        <div className="bg-slate-100 text-black">
            <div className="h-16 flex flex-row justify-center space-x-6 sm:space-x-9 z-20">
                <button onClick={() => navigate('/home')}>
                    <HomeIcon className="size-12 text-black" />
                </button>
                <button onClick={() => navigate('/calendar')}>
                    <CalendarIcon className="size-12 text-black" />
                </button>
                <button onClick={() => navigate('/tasks')}>
                    <ClipboardDocumentCheckIcon className="size-12 text-black" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;