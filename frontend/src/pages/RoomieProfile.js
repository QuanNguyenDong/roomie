import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import getHome from "../services/Home/getHome";

import CloseIcon from '../svgs/Review/CloseIcon'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

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
                        <div
                            key={index}
                            className="py-4 px-6 my-6 bg-white border border-gray-200 rounded-lg shadow"
                        >
                            <p className="font-bold">{answer.question}</p>
                            <p>{answer.answer}</p>
                            <div class="flex items-center mt-4">
                                <span className="mr-1 inline-flex items-center justify-center size-[25px] rounded-full bg-darkGrey leading-none">
                                    <text className="text-sm font-semibold text-white">
                                        {answer.fullname.substr(0, 1)}
                                    </text>
                                </span>
                                <div class="mx-1 text-sm">
                                    <text class="text-gray-900 leading-none">
                                        {answer.fullname}
                                    </text>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RoomieProfile;
