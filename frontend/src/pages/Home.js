import React, { useEffect, useState } from "react";
import getUserProfile from "../services/User/getUserProfile";
import { useNavigate } from "react-router-dom";

import Tile from '../components/Home/Tile';
import Event from "../components/Home/Event";

import { getTasksForUser } from '../services/Task/getTasks';
import getActiveTaskAssignment from '../services/Task/getActiveTaskAssignment.js';

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
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => navigate("/"));
        } else {
            setUser(storedUser);
        }   
        const fetchTasks = async () => {
            const fetchedTasks = await getTasksForUser(); // Fetch tasks asynchronously        
            const tasksWithDueDates = await Promise.all(fetchedTasks.map(async (task) => {
                const dueDate = await getTaskDueDate(task); // Fetch due date
                return { ...task, dueDate }; // Return task with due date
            }));
    
            setTasks(tasksWithDueDates); // Update state with tasks that include due dates
        };
    
        fetchTasks(); // Fetch tasks on component mount 
    }, [navigate]);

    // Helper function to calculate due date based on start date and frequency
    const calculateDueDate = (startDate, frequency) => {
        const start = new Date(startDate);
        const dueDate = new Date(start);
        dueDate.setDate(start.getDate() + frequency); // Add frequency (in days) to start date        
        return dueDate.toDateString(); // Return a human-readable format
    };

    const getTaskDueDate = async (task) => {
        try {
            const activeAssignment = await getActiveTaskAssignment(task.taskId); // Fetch active assignment for the task
            if (activeAssignment) {
                return calculateDueDate(activeAssignment.startDate, task.frequency); // Calculate due date
            }
        } catch (err) {
            console.error(`Error fetching active assignment for task ${task.taskId}`, err);
        }
        return new Date().toDateString(); // Fallback if no active assignment
    };

    return (
        <div className="max-w-[520px] mx-auto h-full text-black font-poppins">
            <div class="flex justify-between h-10 mb-6 mx-8">
                <text className="text-4xl font-bold font-lexend">Hello, {user.fullname}!</text>
            </div>
            <div class="flex justify-between h-10 mb-6 mx-8">
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
                    {tasks.map((task, index) => (
                        <Tile 
                        key={index}
                        task={task} />
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
                <div class="h-40"></div>
            </div>
        </div> 
    );
}

export default Home;
