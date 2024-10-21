import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CloseIcon from '../svgs/Review/CloseIcon.js';
import StarRating from "../components/common/StarRating.js";
import Progressbar from "../components/common/Progressbar.js";

import { getHouseTask } from "../services/Task/getTasks.js";
import { createReviews, addStars } from "../services/Review/createReviews.js";

const labelColours = [
    "#3176A8", "#42A079", "#7742A0", "#A04842", "#A07542",
    "#DA70D6", "#8A2BE2", "#20B2AA", "#FF6347", "#4682B4"
];

const ReviewModal = () => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [reviewUserIndex, setCurrentUserIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState({});
    const [modalState, setModalState] = useState({ open: true });

    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(global.route + `/users/reviewModal`, {
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
        if (!storedUser || !storedUser.answers) {
            fetchUserProfile();
        } else {
            setUser(storedUser);
        }

        const fetchActiveTasks = async () => {
            const fetchedActiveTasks = await getHouseTask();
            setActiveTasks(fetchedActiveTasks || []);

            const uniqueUsers = (fetchedActiveTasks || []).reduce((acc, activeTask) => {
                if (activeTask.userId !== storedUser?.userId && !acc.some(u => u.userId === activeTask.userId)) {
                    acc.push({ userId: activeTask.userId, fullname: activeTask.fullname });
                }
                return acc;
            }, []);
            setUsers(uniqueUsers || []);

            const uniqueTasks = (fetchedActiveTasks || []).reduce((acc, activeTask) => {
                if (!acc.some(task => task.taskId === activeTask.taskId)) {
                    acc.push({ taskId: activeTask.taskId, taskname: activeTask.taskname });
                }
                return acc;
            }, []);
            setTasks(uniqueTasks || []);
        };

        fetchActiveTasks();
    }, []);

    const reviewUser = users[reviewUserIndex];
    const userTasks = activeTasks
        .filter((assign) => assign.userId === reviewUser?.userId)
        .reduce((acc, assign) => {
            const task = tasks.find((task) => task?.taskId === assign.taskId);
            if (task && !acc.some((t) => t.taskId === task.taskId)) {
                acc.push(task);
            }
            return acc;
        }, []);

    const handleClose = () => {
        setModalState({ open: false });
        navigate('/profile');
        createReviews(reviews);

        for (const userId in stars) {
            addStars(userId, stars[userId]);
        }
    };

    const handleNext = () => {
        if (reviewUserIndex < users.length - 1) {
            setStars((prevStars) => ({
                ...prevStars,
                [users[reviewUserIndex + 1].userId]: prevStars[users[reviewUserIndex + 1].userId] || 0
            }));
            setCurrentUserIndex(reviewUserIndex + 1);
        }
    };

    const handleReviewChange = (taskId, userId, reviewText) => {
        setReviews((prevReviews) => {
            const existingReviewIndex = prevReviews.findIndex(
                (review) => review.userId === userId && review.taskId === taskId
            );
            if (existingReviewIndex !== -1) {
                const updatedReviews = [...prevReviews];
                updatedReviews[existingReviewIndex].reviewText = reviewText;
                return updatedReviews;
            }
            return [...prevReviews, { userId, taskId, reviewText }];
        });
    };

    const handleStarChange = (userId, newStars) => {
        setStars((prevStars) => ({ ...prevStars, [userId]: newStars }));
    };

    const renderUserInitials = (fullname) => {
        return fullname
            ?.split(" ")
            .map((word) => word[0])
            .join("") || "U";
    };

    return (
        <>
            {modalState.open && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-full h-full max-w-lg rounded-lg relative flex flex-col">
                        {/* Upper White Section */}
                        <div className="h-1/3 pt-6 px-7">
                            {/* Header */}
                            <div className="flex justify-between items-center m-2 mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold m-0 p-0">
                                        {users.length > 0 ? `Review ${reviewUser?.fullname}` : 'Review'}
                                    </h1>
                                </div>
                                <button onClick={handleClose}>
                                    <CloseIcon />
                                </button>
                            </div>
                            {users.length === 0 ? (
                                <div className="flex flex-col justify-center items-center mt-6">
                                    <p className="text-lg text-center">There are no users to review.</p>
                                    <button
                                        onClick={handleClose}
                                        className="mt-4 bg-[#C5EE6F] text-black text-base font-semibold w-32 h-12 rounded-3xl"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center mt-6">
                                    <div className="flex flex-row">
                                        <div
                                                className="text-white text-3xl font-semibold size-[75px] rounded-full flex items-center justify-center"
                                                style={{ background: `${labelColours[reviewUserIndex % labelColours.length]}` }}
                                        >
                                            {renderUserInitials(reviewUser?.fullname).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="m-1">
                                        <StarRating
                                            iconSize={36}
                                            initialRating={stars[reviewUser?.userId] || 0} // Use stars state for current user
                                            readOnly={false}
                                            onRatingChange={(newStars) => handleStarChange(reviewUser?.userId, newStars)} // Update stars for current user
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Lower Black Section */}
                        {users.length === 0 ? null : (
                            <div className="h-2/3 bg-black rounded-t-submission p-4 flex flex-col">
                                <>
                                    <text className="text-2xl font-bold text-white mt-7 text-center">Review each task..</text>

                                    {/* Scrollable Reviews Container */}
                                    <div className="flex-grow overflow-y-auto p-5">
                                        {userTasks.length > 0 ? (
                                            userTasks.map((task) => (
                                                <div key={task.taskId} className="mb-5 bg-[#444444] bg-opacity-50 pt-2 pl-10 pr-10 rounded-2xl">
                                                    <h3 className="text-lg font-medium text-white">{task?.taskname}</h3>
                                                    <textarea
                                                        rows="2"
                                                        placeholder="Write your review..."
                                                        className="w-full text-sm text-white bg-transparent mt-2 resize-none outline-none"
                                                        onChange={(e) => handleReviewChange(task.taskId, reviewUser?.userId, e.target.value)}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-white">No tasks assigned to this user.</p>
                                        )}
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-center">
                                        {reviewUserIndex < users.length - 1 ? (
                                            <button
                                                onClick={handleNext}
                                                className="mt-6 bg-black border-2 border-white text-white text-base font-semibold w-32 h-12 rounded-3xl"
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleClose}
                                                className="mt-6 bg-[#C5EE6F] text-black text-base font-semibold w-32 h-12 rounded-3xl"
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </div>

                                    {/* Progress Bars */}
                                    <Progressbar
                                        currentUserIndex={reviewUserIndex}
                                        totalUsers={users.length}
                                    />
                                </>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewModal;
