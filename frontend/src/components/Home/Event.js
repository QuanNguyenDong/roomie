import React, { useState, useEffect } from 'react';

import '../../index.css'

const Event = ({ }) => {
    return (
        <div className="bg-white w-fulll h-[71px] rounded-xl flex items-center">
            <div class="flex flex-row space-x-4 ml-4">
                <div className="bg-[#7D8D9C] text-white font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                    T
                </div>
                <div class="flex flex-col">
                    <text className="text-xs">Quan's Housewarming Party</text>
                    <text className="text-xs text-[#AEAEB3]">In 2 weeks</text>
                </div>
            </div>
        </div>
    );
}

export default Event;