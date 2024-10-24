import React, { useEffect, useState } from "react";
import getUserProfile from "../services/User/getUserProfile";
import axios from "../tokenInterceptor.js";
import { useNavigate } from 'react-router-dom';
import LogoGrey from "../svgs/Review/LogoGrey.js";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [answers, setAnswer] = useState([]);

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
                localStorage.removeItem("users");
                localStorage.removeItem("token");
                localStorage.removeItem("alltasks");
                localStorage.removeItem("tasks");
                localStorage.removeItem("housetasks");
                localStorage.removeItem("events");
                localStorage.removeItem("house");
                localStorage.removeItem("answers");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

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
        }
        fetchUserProfile();
    }, [navigate]);

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

    return (
        <div className="max-w-[520px] mx-auto absolute top-0 text-black font-lexend bg-[#F6F6F6]">
            <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#7D8D9C] to-[#F6F6F6]">
                <span className="inline-flex items-center justify-center mt-20 size-[99px] rounded-full bg-darkGrey text-lg font-semibold text-white leading-none shadow-inner shadow-[inset_0_-4px_6px_rgba(0,0,0,0.2)]">
                    <span className="text-3xl">
                        {user.fullname
                            ?.split(" ")
                            .map((word) => word[0])
                            .join("")}
                    </span>
                </span>
                <p className="mt-4 mb-1 text-3xl font-bold">
                    {user.fullname}
                </p>
                <h4>{user.email ?? "youremail@gmail.com"}</h4>
                
                {/* Button Container */}
                <div className="flex space-x-4 mt-6"> {/* Flex container with horizontal spacing */}
                    <button className="bg-white text-xs text-darkGrey w-28 h-10 rounded-3xl drop-shadow-lg transform transition-transform duration-200 hover:scale-105" onClick={() => navigate('/reviews')}>
                        Your Reviews
                    </button>
                    <button className="bg-white text-xs text-darkGrey w-28 h-10 rounded-3xl drop-shadow-lg transform transition-transform duration-200 hover:scale-105" onClick={() => navigate('/reviewModal')}>
                        Submit Reviews
                    </button>
                </div>
            </div>
            <div className="my-6 mt-10 px-7">
                <p className="font-bold text-[16px] mb-2">A little bit about myself...</p>
                <p className="text-[14px]">{user.desc}</p>
            </div>
            <div className="px-7">
                <p className="font-bold">Fun facts about me...</p>
                {Array.from(user.answers ?? {}).map((answer, i) => (
                    <div key={i} className="relative p-6 my-6 border border-dashed border-gray-300 rounded-[20px]">
                        <p className="font-regular text-[14px] text-center z-10 relative">{answer.question}</p>
                        <p className="font-light text-[12px] z-10 relative">{answer.answer}</p>
                        <div className="absolute bottom-2 right-2 opacity-60 z-0">
                            <LogoGrey />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mb-28 text-center">
                <button
                    className="bg-[#C40808] text-white text-[14px] w-28 h-10 rounded-3xl"
                    onClick={() => signout()}>
                    Sign Out
                </button>    
            </div>
        </div>
    );
}

export default Profile;
