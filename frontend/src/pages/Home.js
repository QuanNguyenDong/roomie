import React, { useEffect, useState } from "react";
import getUserProfile from "../services/User/getUserProfile";
import { useNavigate } from "react-router-dom";

import Tile from "../components/Home/Tile";
import Event from "../components/Home/Event";

import { getUserTask } from "../services/Task/getTasks";

function Home() {
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            getUserProfile()
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);
                    } else navigate("/");
                })
                .catch((error) => navigate("/"));
        } else setUser(storedUser);

        getUserTask()
            .then((tasks) => {
                if (!tasks) return;
                tasks.map((task) => {
                    task.dueDate = calculateDueDate(
                        task?.startDate,
                        task?.frequency
                    );
                    return task;
                });
                setTasks(tasks);
            })
            .catch((error) => {});
    }, [navigate]);

    const calculateDueDate = (startDate, frequency) => {
        const start = new Date(startDate);
        const dueDate = new Date(start);
        dueDate.setDate(start.getDate() + frequency);
        return dueDate.toDateString();
    };

    return (
        <div className="max-w-[520px] mx-auto h-full text-black font-poppins">
            <div className="flex justify-between h-10 mb-6 mx-8">
                <text className="text-4xl font-bold font-lexend">
                    Hello, {user.fullname}!
                </text>
            </div>
            <div className="flex justify-between h-10 mb-6 mx-8">
                <button className="bg-white text-xs w-28 rounded-3xl">
                    My Tasks
                </button>
                <button className="bg-secGrey text-xs w-28 rounded-3xl">
                    Upcoming
                </button>
                <button className="bg-secGrey text-xs w-28 rounded-3xl">
                    Completed
                </button>
            </div>
            <div className="flex flex-nowrap overflow-x-auto w-100vw h-56 mb-8">
                <div className="flex flex-nowrap space-x-6 ml-8">
                {tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) // Sort by dueDate
                    .map((task, index) => (
                        <Tile key={index} task={task} />
                    ))}
                </div>
            </div>
            <div className="mx-8">
                <text className="text-xl font-semibold">Events this week</text>
                <div className="flex flex-col space-y-4 mt-4">
                    <Event />
                    <Event />
                    <Event />
                </div>
            </div>
        </div>
    );
}

export default Home;
