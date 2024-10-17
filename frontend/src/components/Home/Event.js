import React from 'react';

import {
    format,
    parseISO,
    isToday,
    isTomorrow
} from 'date-fns';

import '../../index.css'

const Event = ({ eventname, username, startDate, endDate}) => {
    const start = parseISO(startDate);

    const getDisplayDate = () => {
        if (isToday(start)) {
            return 'Today';
        } else if (isTomorrow(start)) {
            return 'Tomorrow';
        } else {
            return format(start, 'EEEE');
        }
    };

    return (
        <div className="bg-white w-fulll h-[71px] rounded-xl flex items-center">
            <div className="flex flex-row space-x-4 ml-4">
                <div className="bg-[#7D8D9C] text-white font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                    {username[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                    <text className="text-xs">{eventname}</text>
                    {/* <text className="text-xs text-[#AEAEB3]">{format(parseISO(startDate), 'p')} - {format(parseISO(endDate), 'p')}</text> */}
                    <text className="text-xs text-[#AEAEB3]">{getDisplayDate()}</text>
                </div>
            </div>
        </div>
    );
}

export default Event;