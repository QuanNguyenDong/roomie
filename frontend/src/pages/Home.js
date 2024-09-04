import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Tile from '../components/Home/Tile';

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
        <div className="w-full h-full px-8 text-black font-lexend">
            <div class="flex justify-between h-10 mb-6">
                <text className="text-4xl font-bold">Hello, {user.fullname}!</text>
                <button className="bg-black text-xs text-white w-28 rounded-3xl">
                    Your Review
                </button>
            </div>
            <div class="flex justify-between h-10 mb-6">
                <button className="bg-secGrey text-xs w-28 rounded-3xl">
                    My Tasks
                </button>
                <button className="bg-secGrey text-xs w-28 rounded-3xl">
                    Upcoming
                </button>
                <button className="bg-secGrey text-xs w-28 rounded-3xl">
                    Completed
                </button>
            </div>
            <div className="flex bg-black/10 w-full h-56">
                <Tile/>
            </div>
        </div>  
    )
}

export default Home;