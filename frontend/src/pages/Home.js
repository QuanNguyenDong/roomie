import React, { useEffect, useState } from "react";
import getUserProfile from "../services/getUserProfile";
import { useNavigate } from "react-router-dom";

import Tile from '../components/Home/Tile';

function Home() {
    const [user, setUser] = useState({});
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
    }, [navigate]);

    return (
        <div className="max-w-[500px] mx-auto h-full px-8 text-black font-lexend">
            <div class="flex justify-between h-10 mb-6">
                <text className="text-3xl font-bold">Hello, {user.fullname}!</text>
                <button className="bg-black text-xs text-white w-28 rounded-3xl">
                    Your Review
                </button>
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
            <div className="flex bg-black/10 w-full h-56">
                <Tile/>
            </div>
        </div>
    );
}

export default Home;
