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
