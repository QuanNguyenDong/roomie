import React, { useEffect, useState } from "react";
import axios from "axios";

import Tile from "../components/Home/Tile";

function Home() {
    const [user, setUser] = useState({});

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(global.route + `/users/profile`, {
                withCredentials: true,
            });
            const userData = response.data;
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            fetchUserProfile();
        } else {
            setUser(storedUser);
        }
    }, []);

    return (
        <div className="w-full h-full px-8 text-black font-lexend">
            <div class="flex justify-between h-10 mb-6">
                <text className="text-4xl font-bold">
                    Hello, {user.fullname ?? ""}!
                </text>
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
                <Tile />
            </div>
        </div>
    );
}

export default Home;
