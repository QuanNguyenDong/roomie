import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import getHome from "../services/Home/getHome";

import LogoGrey from "../svgs/Review/LogoGrey.js";
import CloseIcon from '../svgs/Review/CloseIcon'

function RoomieProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};

    const [answers, setAnswer] = useState([]);

    useEffect(() => {
        getHome()
            .then((res) => {
                setAnswer(Array.from(res.answers));
            })
            .catch((error) => { });
    }, []);

    if (!user) {
        return(
            <div>
                <div className="bg-secGrey text-center text-xl w-5/6 py-24 my-8 mx-auto rounded-3xl">
                    <span>No user data available.
                        <span
                            className="ml-1 text-blue-500 cursor-pointer hover:underline"
                            onClick={() => navigate(-1)}>
                            Go back
                        </span>
                    </span>
                </div>
            </div>
        )
    }

    const userAnswers = answers.filter(answer => answer.fullname === user.fullname);

    return (
        <div className="p-4">
            <div className='flex flex-row justify-between'>
                <h2 className="text-3xl font-bold pt-2">{user.fullname}'s Ice-breakers</h2>
                <button onClick={() => navigate(-1)}>
                    <CloseIcon />
                </button>
            </div>

            <div className="my-8">
                {userAnswers.map((answer, index) => {
                    return (
                        <div key={index} className="relative p-6 my-6 border border-dashed border-gray-300 rounded-[20px]">
                            <p className="font-regular text-[14px] text-center z-10 relative">{answer.question}</p>
                            <p className="font-light text-[12px] z-10 relative">{answer.answer}</p>
                            <div className="absolute bottom-2 right-2 opacity-60 z-0">
                                <LogoGrey />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RoomieProfile;
