import React, { useState } from "react";

import "../../index.css";

import TasksIcon from "../../svgs/Navbar/TasksIcon";

const priorityColors = {
    High: "#C49191",
    Medium: "#D8AF8A",
    Low: "#9DB492",
};

const svgColors = {
    High: "#661717",
    Medium: "#703320",
    Low: "#243327",
};

const Tile = ({ task }) => {
    return (
        <div
            className="text-white w-[247px] h-56 my-auto rounded-3xl relative cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
            style={{ backgroundColor: priorityColors[task.priority] }}>
            <div className="p-5 h-full flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                    <div className="w-1/2">
                        <span className="text-base font-semibold">
                            {task?.title || "Task Name"}
                        </span>
                    </div>
                    <div className="bg-[#7D8D9C] w-8 h-8 rounded-full mt-2 flex items-center justify-center">
                        <span className="text-base font-semibold">
                            {task?.fullname?.charAt(0).toUpperCase() || 'T'}
                        </span>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-between">
                        <span className="text-xs">{task?.dueDate || "No due date"}</span>
                        <span className="text-xs font-medium">
                            {task?.duration ? `${task.duration} minutes` : "Duration unknown"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-3 right-3">
                <TasksIcon  fill={svgColors[task.priority]} />

            </div>
        </div>
    );
};

export default Tile;
