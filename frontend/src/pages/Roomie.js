import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import getHome from "../services/Home/getHome";
import createHome from "../services/Home/createHome";
import joinHome from "../services/Home/joinHome";
import leaveHome from "../services/Home/leaveHome";

import { ChevronDownIcon } from '@heroicons/react/24/solid';

const labelColours = [
    "#3176A8", "#42A079", "#7742A0", "#A04842", "#A07542",
    "#DA70D6", "#8A2BE2", "#20B2AA", "#FF6347", "#4682B4"
];

function JoinOrCreate() {
    const code = useRef("");
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            var str = code.current.value;
            if (str.length !== 5) throw Error("Code must be 5 characters");

            var body = { code: str };
            const res = await createHome(body);

            if (res.status !== 200) throw Error(res.message);
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            var str = code.current.value;
            if (str.length !== 5) throw Error("Code must be 5 characters");

            var body = { code: str };
            const res = await joinHome(body);

            if (res.status !== 200) throw Error(res.message);
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="max-w-[520px] mx-auto py-10 py-auto h-full text-black font-poppins">
            <div className="my-10 text-center">
                <text className="text-4xl font-bold font-lexend">Roomie</text>
            </div>
            <div class="flex flex-col items-center">
                <form>
                    <label className="mx-auto text-sm font-medium leading-6 text-gray-900 flex flex-row items-center gap-1">
                        Enter code to join HOUSE
                    </label>
                    <input
                        className="w-[280px] my-2 rounded-3xl py-1.5 px-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        id="code"
                        name="code"
                        ref={code}
                        autoComplete="off"
                        placeholder="abc12"
                        required
                    />
                    <div class="flex flex-col items-center my-10">
                        <button
                            onClick={handleJoin}
                            className="w-28 h-10 bg-black text-s text-white rounded-3xl shadow"
                        >
                            Join
                        </button>
                        <text className="my-4">OR</text>
                        <button
                            onClick={handleCreate}
                            className="w-28 h-10 bg-black text-s text-white rounded-3xl shadow"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Roomie() {
    const [house, setHouse] = useState(null);
    const [users, setUsers] = useState(null);
    const [answers, setAnswer] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getHome()
            .then((res) => {
                setHouse(res.house);
                setUsers(Array.from(res.users));
                setAnswer(Array.from(res.answers));
            })
            .catch((error) => { });
    }, []);

    const handleLeave = async () => {
        try {
            await leaveHome();
            window.location.reload();
        } catch (err) { }
    };

    const handleUserClick = (user) => {
        navigate('/icebreakers', { state: { user } });
    };

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return !house || !users ? (
        <JoinOrCreate />
    ) : (
        <div className="mx-8 py-10 py-auto h-full text-black font-poppins">
            <div class="flex justify-between h-10 mb-7">
                <text className="text-4xl font-semibold font-lexend">
                    Your House
                </text>
            </div>
            <div className="flex flex-row justify-center space-x-24 mb-10">
                <button
                    className="flex items-center justify-center rounded-full bg-black/50 text-white text-xs w-28 h-7">
                    Create House
                </button>
                <button
                    className="flex items-center justify-center rounded-full bg-black/50 text-white text-xs w-28 h-7">
                    Join House
                </button>
            </div>
            <div className="flex flex-row justify-between mb-4">
                <text className="text-xl block ">House {house.code}</text>
                <div className="flex flex-row">
                    <button
                        className="flex items-center justify-center rounded-full bg-black text-white text-xs w-20 mr-4 h-7"
                        onClick={handleLeave}>
                        Leave 
                    </button>
                    <button onClick={toggleExpand}>
                        <ChevronDownIcon
                            className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            width="24" />
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ height: "auto" }}
                animate={{ height: isExpanded ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="flex flex-col text-start mx-2 mb-4">
                    {users.map((user, idx) => {
                        const bgColor = labelColours[idx % labelColours.length];
                        return (
                            <div key={idx}>
                                <button
                                    className="text-left flex flex-row"
                                    onClick={() => handleUserClick(user)}>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row">
                                            <div
                                                className="text-white text-sm mr-2 font-semibold w-6 h-6 rounded-full flex items-center justify-center"
                                                style={{ background: `${bgColor}` }}
                                            >
                                                {user.username[0].toUpperCase()}
                                            </div>
                                            <p>{user.fullname}</p>
                                        </div>
                                    </div>
                                </button>
                                <div className="mb-2 w-full h-[2px] bg-[#D9D9D9]"></div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}

export default Roomie;
