import React from 'react';
import '../../index.css';

const Event = ({ eventName, timeInfo, initial }) => {
  return (
    <div className="bg-white w-fulll h-[71px] rounded-xl flex items-center">
      <div className="flex flex-row space-x-4 ml-4">
        <div className="bg-[#7D8D9C] text-white font-semibold w-8 h-8 rounded-full flex items-center justify-center">
          {initial}
        </div>
        <div className="flex flex-col">
          <span className="text-xs">{eventName}</span>
          <span className="text-xs text-[#AEAEB3]">{timeInfo}</span>
        </div>
      </div>
    </div>
  );
}

export default Event;
