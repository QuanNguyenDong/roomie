import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Tile from '../components/Home/Tile';
import Event from "../components/Home/Event";

function Home() {
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("session"));

    useEffect(() => {
        if (user === null) {
            localStorage.removeItem("session");
            navigate("/signIn");
        }
    }, []);

    return (
        <div className="w-full h-full text-black font-poppins">
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
                    <Tile />
                    <Tile />
                    <Tile />
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
    )
}

export default Home;