import React from "react";

import "../../index.css";

import TileIcon from "../../svgs/Home/Tasks/TileIcon";

const Tile = ({ task }) => {
    return (
        <div className="bg-tileBlue text-white w-[247px] h-full rounded-3xl relative">
            <div className="p-5 h-full flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                    <div className="w-1/2">
                        <text className="text-base font-semibold">
                            {task.taskname}
                        </text>
                    </div>
                    <div className="bg-[#7D8D9C] w-8 h-8 rounded-full mt-2 flex items-center justify-center">
                        <text className="text-base font-semibold">
                            {task.fullname.charAt(0).toUpperCase()}
                        </text>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-between">
                        <text className="text-xs ">{task.dueDate}</text>
                        <text className="text-xs font-medium">
                            {task.duration} minutes
                        </text>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-3 right-3">
                <TileIcon fill="#426DA0" />
            </div>
        </div>
    );
};

export default Tile;
