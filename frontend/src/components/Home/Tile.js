import React, {useState} from "react";

import "../../index.css";
import TaskModal from "../../pages/TaskCard"

import TileIcon from "../../svgs/Home/Tasks/TileIcon";

const Tile = ({ task }) => {
    const [selectedTask, setSelectedTask] = useState(null);

    const openTaskModal = async (task) => {
        setSelectedTask(task);
    };

    const closeTaskModal = () => {
        setSelectedTask(null);
    };

    return (
        <div 
            className="bg-tileBlue text-white w-[247px] h-full rounded-3xl relative"
            onClick={() => openTaskModal(task)}>
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
                <TileIcon fill={"#426DA0"}/>
            </div>
            <TaskModal
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={closeTaskModal}
            />
        </div>
    );
};

export default Tile;
