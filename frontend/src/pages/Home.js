import React, { useEffect, useState } from "react";
import getUserProfile from "../services/User/getUserProfile";
import { useNavigate } from "react-router-dom";

import TaskModal from "./TaskCard.js";
import Tile from "../components/Home/Tile";
import Event from "../components/Home/Event";

import { getUserTask } from "../services/Task/getTasks";
import { getHomeEvents } from "../services/Event/getEvents";

function Home() {
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const [taskFilter, setTaskFilter] = useState("all");
    const [selectedTask, setSelectedTask] = useState(null);

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
        } else {
            setUser(storedUser);
            fetchEvents();
        }

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

    const fetchEvents = async () => {
        try {
            const events = await getHomeEvents();
            setEvents(events);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const calculateDueDate = (startDate, frequency) => {
        const start = new Date(startDate);
        const dueDate = new Date(start);
        dueDate.setDate(start.getDate() + frequency);
        return dueDate.toDateString();
    };

    const filteredTasks = tasks.filter((task) => {
        const today = new Date();
        const taskDueDate = new Date(task.dueDate);

        if (taskFilter === "upcoming") {
            return taskDueDate > today && !task.completed;
        } else if (taskFilter === "completed") {
            return today > taskDueDate;
        } else {
            return true;
        }
    });

    const filteredEvents = events.filter((event) => {
        const today = new Date();

        const startOfWeek = new Date(today);
        const endOfWeek = new Date(today);

        const dayOfWeek = today.getDay();
        const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startOfWeek.setDate(today.getDate() - diffToMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        const diffToSunday = 7 - dayOfWeek;
        endOfWeek.setDate(today.getDate() + diffToSunday);
        endOfWeek.setHours(23, 59, 59, 999);

        const eventStartDate = new Date(event.startDate);

        return eventStartDate >= startOfWeek && eventStartDate <= endOfWeek && eventStartDate >= today;
    });

    const openTaskModal = async (task) => {
        setSelectedTask(task);
    };

    const closeTaskModal = () => {
        setSelectedTask(null);
    };

    return (
        <div className="max-w-[520px] mx-auto h-full text-black font-poppins">
            <div className="flex justify-between h-10 mb-6 mx-8">
                <text className="text-3xl font-bold font-lexend">
                    Hello, {user.fullname}!
                </text>
            </div>
            <div className="flex justify-between h-10 mb-6 mx-8">
                <button
                    className={`${taskFilter === "all" ? "bg-white" : "bg-secGrey"
                        } text-black text-xs w-28 rounded-3xl`}
                    onClick={() => setTaskFilter("all")}>
                    My Tasks
                </button>
                <button
                    className={`${taskFilter === "upcoming" ? "bg-white" : "bg-secGrey"
                        } text-black text-xs w-28 rounded-3xl`}
                    onClick={() => setTaskFilter("upcoming")}>
                    Upcoming
                </button>
                <button
                    className={`${taskFilter === "completed" ? "bg-white" : "bg-secGrey "
                        } text-black text-xs w-28 rounded-3xl`}
                    onClick={() => setTaskFilter("completed")}>
                    Completed
                </button>
            </div>
            <div className="flex flex-nowrap overflow-x-auto w-100vw h-60 mb-8">
                {filteredTasks.length == 0 ? (
                    <div className="bg-secGrey text-center text-xl w-full py-24 mx-8 rounded-3xl">
                        <span>You don't have any {taskFilter === 'all' ? '' : taskFilter} tasks</span>
                    </div>
                ) : (
                    <div className="flex flex-nowrap space-x-6 mx-8">
                        {filteredTasks
                            .sort(
                                (a, b) =>
                                    new Date(a.dueDate) - new Date(b.dueDate)
                            )
                            .map((task, index) => (
                                <div
                                    className="mt-2"
                                    key={index}
                                    onClick={() => openTaskModal(task)}>
                                    <Tile task={task} />
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <div className="mx-8">
                <text className="text-xl font-semibold">Events this week</text>
                <div className="flex flex-col space-y-4 my-4">
                    {filteredEvents.length === 0 ? (
                        <div className="bg-secGrey text-center text-xl w-full py-24 rounded-3xl">
                            <span>You don't have any events this week</span>
                        </div>
                    ) : (
                        filteredEvents
                            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                            .map((event, index) => (
                                <Event
                                    key={index}
                                    event={event}
                                    username={event.user.username}
                                    eventname={event.eventname}
                                    startDate={event.startDate}
                                    endDate={event.endDate}
                                />
                            ))
                    )}
                </div>
            </div>
            <TaskModal
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={closeTaskModal}
            />
        </div>
    );
}

export default Home;
