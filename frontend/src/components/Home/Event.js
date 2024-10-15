import React from 'react';
import { format, parseISO } from 'date-fns';
import '../../index.css';

const Event = ({ eventname = 'Unknown Event', username = 'Unknown', startDate, endDate }) => {
    return (
        <div className="bg-white w-fulll h-[71px] rounded-xl flex items-center">
            <div className="flex flex-row space-x-4 ml-4">
                <div className="bg-[#7D8D9C] text-white font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                    {username[0] ? username[0].toUpperCase() : ''}
                </div>
                <div className="flex flex-col">
                    <span className="text-xs">{eventname}</span>
                    {startDate && endDate ? (
                        <span className="text-xs text-[#AEAEB3]">
                            {format(parseISO(startDate), 'p')} - {format(parseISO(endDate), 'p')}
                        </span>
                    ) : (
                        <span className="text-xs text-[#AEAEB3]">No time specified</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Event;
