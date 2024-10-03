import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../index.css";

import Notif from "../svgs/Topbar/Notif";
import Profile from "../svgs/Topbar/Profile";
import axios from "axios";

const Topbar = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);

    const signout = async () => {
        try {
            const res = await axios.post(
                global.route + `/users/signout`,
                {},
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                localStorage.removeItem("user");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center mb-4">
            <div className="top-0 w-[500px] h-[50px] px-7 pt-4">
                <div className="text-black flex flex-row justify-between">
                    <div>
                        {/* <button onClick={() => navigate("/roomie")}>
                            <Hamburger className="icon" fill="#111827" />
                        </button> */}
                    </div>

                    <div className="relative space-x-2.5">
                        <button onClick={() => navigate("/home")}>
                            <Notif className="icon" fill="#111827" />
                        </button>
                        <button onClick={() => setDropdown(!dropdown)}>
                            <Profile className="icon" fill="#111827" />
                        </button>

                        {/* Dropdown menu */}
                        <div
                            className={`absolute ${
                                dropdown ? "" : "hidden"
                            } right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg`}
                        >
                            <ul className="py-2 text-sm text-gray-700 w-28">
                                <li>
                                    <button
                                        onClick={() => {
                                            navigate("/home");
                                            setDropdown(false);
                                        }}
                                        className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            navigate("/roomie");
                                            setDropdown(false);
                                        }}
                                        className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        House
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            navigate("/profile");
                                            setDropdown(false);
                                        }}
                                        className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            setDropdown(false);
                                        }}
                                        className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        Setting
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            signout();
                                            setDropdown(false);
                                        }}
                                        className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
