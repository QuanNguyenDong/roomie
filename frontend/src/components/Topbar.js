import React from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";

import Hamburger from "../svgs/Topbar/Hamburger";
import Notif from "../svgs/Topbar/Notif";
import Profile from "../svgs/Topbar/Profile";

const Topbar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center mb-4">
            <div className="top-0 w-[500px] h-[50px] px-7 pt-4">
                <div className="text-black flex flex-row justify-between">
                    <div>
                        <button onClick={() => navigate("/roomie")}>
                            <Hamburger className="icon" fill="#111827" />
                        </button>
                    </div>

                    <div className="relative space-x-2.5">
                        <button onClick={() => navigate("/home")}>
                            <Notif className="icon" fill="#111827" />
                        </button>
                        <button onClick={() => navigate("/profile")}>
                            <Profile className="icon" fill="#111827" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
