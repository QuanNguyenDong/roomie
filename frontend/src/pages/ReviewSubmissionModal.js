import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CloseIcon from '../svgs/Review/CloseIcon.js'; 
import StarRating from "../components/common/StarRating.js"; 
import Progressbar from "../components/common/Progressbar.js";

import { getHouseTask } from "../services/Task/getTasks.js";
import createReviews from "../services/Review/createReviews.js";

const ReviewModal = () => {
    const [modalState, setModalState] = useState({ open: true });
    const [reviewUserIndex, setCurrentUserIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({});    
    const [users, setUsers] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [tasks, setTasks] = useState([]);

    // Get logged in user
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(global.route + `/users/reviewModal`, {
                withCredentials: true,
            });
            const userData = response.data;
            localStorage.setItem("user", JSON.stringify(userData));
            setLoggedInUser(userData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.answers) {
            fetchUserProfile();
        } else {
            setLoggedInUser(storedUser);
        }

        const fetchActiveTasks = async () => {
            const fetchedActiveTasks = await getHouseTask();
            setActiveTasks(fetchedActiveTasks || []);

            // Extract unique users, excluding the logged-in user
            const uniqueUsers = (fetchedActiveTasks || []).reduce((acc, activeTask) => {
                if (activeTask.userId !== storedUser?.userId && !acc.some(u => u.userId === activeTask.userId)) {
                    acc.push({ userId: activeTask.userId, fullname: activeTask.fullname });
                }
                return acc;
            }, []);
            setUsers(uniqueUsers || []);

            // Extract unique tasks
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

    const reviewUser = users[reviewUserIndex];  // Current user being reviewed
    const userTasks = activeTasks
    .filter((assign) => assign.userId === reviewUser?.userId)
    .reduce((acc, assign) => {
        const task = tasks.find((task) => task?.taskId === assign.taskId);
        if (task && !acc.some((t) => t.taskId === task.taskId)) {
            acc.push(task);  // Only add unique tasks
        }
        return acc;
    }, []);


    const handleClose = () => {
        setModalState({ open: false });                
        navigate('/profile');   
        createReviews(reviews);
    };

    const handleNext = () => {
        if (reviewUserIndex < users.length - 1) {
            setCurrentUserIndex(reviewUserIndex + 1);
        }
    };

    const handleReviewChange = (taskId, userId, reviewText) => {
        setReviews((prevReviews) => {
            // Check if a review for this userId and taskId already exists
            const existingReviewIndex = prevReviews.findIndex(
                (review) => review.userId === userId && review.taskId === taskId
            );
    
            // If it exists, update the review text
            if (existingReviewIndex !== -1) {
                const updatedReviews = [...prevReviews];  // Create a new array to avoid mutation
                updatedReviews[existingReviewIndex].reviewText = reviewText;
                return updatedReviews;
            }
    
            // If it doesn't exist, add a new review object
            return [...prevReviews, { userId, taskId, reviewText }];
        });
    };

    const renderUserInitials = (fullname) => {
        return fullname
            ?.split(" ")
            .map((word) => word[0])
            .join("") || "U";  // Fallback to 'U' if fullname is not defined
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
                                    <h1 className="text-3xl font-bold m-0 p-0">Review {reviewUser?.fullname}</h1>
                                    {/* <h2 className="text-4xl font-bold m-0 p-0">{reviewUser?.fullname}</h2> */}
                                </div>
                                <button onClick={handleClose}>
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-6">
                                <span className="inline-flex items-center justify-center size-[75px] rounded-full bg-darkGrey text-lg font-semibold text-white leading-none">
                                    <p className="text-3xl">
                                        {renderUserInitials(reviewUser?.fullname)}
                                    </p>
                                </span>
                                <div className="m-1">
                                    <StarRating iconSize={36} initialRating={0} readOnly={false} />
                                </div>
                            </div>
                        </div>

                        {/* Lower Black Section */}
                        <div className="h-2/3 bg-black rounded-t-submission p-4 flex flex-col">
                            <h2 className="text-2-1 italic text-white mt-7 ml-9 mb-8">Enter review for each task</h2>

                            {/* Scrollable Reviews Container */}
                            <div className="flex-grow overflow-y-auto bg-black p-5">
                                {userTasks.length > 0 ? (
                                    userTasks.map((task) => (
                                        <div key={task.taskId} className="mb-5 bg-[#F9F9F9] pt-2 pl-10 pr-10 rounded-2xl">
                                            <h3 className="text-lg font-semibold text-black">{task?.taskname}</h3>
                                            <textarea
                                                rows="2"
                                                placeholder="Write your review..."
                                                className="w-full text-sm bg-transparent mt-2 resize-none"
                                                onChange={(e) => handleReviewChange(task.taskId, reviewUser?.userId, e.target.value)}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white">No tasks assigned to this user.</p>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-center mt-4">
                                {reviewUserIndex < users.length - 1 ? (
                                    <button
                                        onClick={handleNext}
                                        className="mt-6 bg-white text-base font-semibold w-32 h-12 rounded-3xl"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleClose}
                                        className="mt-6 mb-2 bg-[#C5EE6F] text-black text-base font-semibold w-32 h-12 rounded-3xl"
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
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewModal;
