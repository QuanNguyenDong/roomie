import React from 'react';

import '../../index.css'

import TileIcon from '../../svgs/Home/Tasks/TileIcon';

const Tile = () => {
    return (
        <div className="bg-tileBlue text-white w-[247px] h-full rounded-3xl relative">
            <div className="p-5 h-full flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                    <div className="w-1/2">
                        <text className="text-base font-semibold">Vacuum Living Room</text>
                    </div>
                    <div className="bg-[#7D8D9C] w-8 h-8 rounded-full mt-2 flex items-center justify-center">
                        T
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-between">
                        <text className="text-xs ">10 September</text>
                        <text className="text-xs font-medium">30 Min</text>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-3 right-3">
                <TileIcon fill="#426DA0" />
            </div>
        </div>
    );
}

export default Tile;