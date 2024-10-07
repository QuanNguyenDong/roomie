import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '../svgs/Review/CloseIcon.js'; 
import StarRating from "../components/common/StarRating.js"; 
import Progressbar from "../components/common/Progressbar.js";
import axios from "axios";

const ReviewModal = () => {
    const [modalState, setModalState] = useState({ open: true });
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [reviews, setReviews] = useState({});
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    //Get logged in user
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
    }, []);

    const users = [
        { userId: "1", fullname: "Trish Manjunath" },
        { userId: "2", fullname: "Jane Smith" },
        { userId: "3", fullname: "Alice Johnson" },
        { userId: "4", fullname: "Bob Brown" },
        { userId: "5", fullname: "Charlie Davis" },
    ];

    const tasks = [
        { taskId: "1", taskname: "Kitchen Cleaning" },
        { taskId: "2", taskname: "Vacuum" },
        { taskId: "3", taskname: "Cook Chicken" },
        { taskId: "4", taskname: "Wipe TV" },
        { taskId: "5", taskname: "Clean Backyard" },
    ];

    // Assignments based on the schema
    const assignments = [
        { userId: "1", taskId: "1", status: "active" },
        { userId: "1", taskId: "2", status: "active" },
        { userId: "2", taskId: "3", status: "inactive" },
        { userId: "3", taskId: "4", status: "active" },
        { userId: "3", taskId: "5", status: "completed" },
        { userId: "4", taskId: "1", status: "active" },
        { userId: "5", taskId: "4", status: "completed" },
        { userId: "5", taskId: "1", status: "completed" },
        { userId: "5", taskId: "2", status: "completed" },
        { userId: "5", taskId: "3", status: "completed" },
        { userId: "5", taskId: "5", status: "completed" },
    ];

    // Get the current user and their assigned tasks
    const currentUser = users[currentUserIndex];
    const userTasks = assignments
        .filter((assign) => assign.userId === currentUser.userId)
        .map((assign) => tasks.find((task) => task.taskId === assign.taskId));

    const handleClose = () => {
        setModalState({ open: false }); // Close the modal
        navigate('/profile'); // Navigate to profile page
    };

    const handleNext = () => {
        if (currentUserIndex < users.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
        }
    };

    const handleReviewChange = (taskId, value) => {
        // TODO: write to database
        setReviews((prev) => ({ ...prev, [taskId]: value }));
    };

    return (
        <>
            {modalState.open && (
                // TODO: remove z component later
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-full h-full max-w-lg rounded-lg relative flex flex-col">
                        {/* Upper White Section */}
                        <div className="h-1/3 py-12 px-7">
                            {/* Header */}
                            <div className="flex justify-between items-center m-2 mb-4">
                                <div>
                                    <h1 className="text-4xl font-bold m-0 p-0">Review</h1>
                                    <h2 className="text-4xl font-bold m-0 p-0">{currentUser.fullname}</h2>
                                </div>
                                {/* Close Icon */}
                                <button
                                    onClick={handleClose}
                                    className="pb-6"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-6">
                                {/*Profile Photo */}
                                <span className="inline-flex items-center justify-center size-[75px] rounded-full bg-darkGrey text-lg font-semibold text-white leading-none">
                                    <p className="text-3xl">
                                        {user.fullname
                                            ?.split(" ")
                                            .map((word) => word[0])
                                            .join("")}
                                    </p>
                                </span>
                                {/*Star Rating System*/}
                                <div className = "m-1">
                                    <StarRating iconSize={36} initialRating={0} readOnly={false}/>
                                </div>
                            </div>
                        </div>

                        {/* Lower Black Section */}
                        <div className="h-2/3 bg-black rounded-t-submission p-4 flex flex-col">
                            <h2 className="text-2-1 italic text-white mt-7 ml-9 mb-8">Enter review for each task</h2>

                            {/* Scrollable Reviews Container */}
                            <div className="flex-grow overflow-y-auto bg-black p-5">
                                {userTasks.map((task) => (
                                    //White tiles
                                    <div key={task.taskId} className="mb-5 bg-[#F9F9F9] pt-2 pl-10 pr-10 rounded-2xl">
                                        <h3 className="text-lg font-semibold text-black">{task.taskname}</h3>
                                        <textarea
                                            rows="2"
                                            placeholder="Write your review..."
                                            className="w-full text-sm bg-transparent mt-2 resize-none"
                                            onChange={(e) => handleReviewChange(task.taskId, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-center mt-4">
                                {currentUserIndex < users.length - 1 ? (
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
                                currentUserIndex={currentUserIndex} 
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
