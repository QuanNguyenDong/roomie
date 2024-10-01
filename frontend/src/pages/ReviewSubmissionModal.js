import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import CloseIcon from '../svgs/Review/CloseIcon.js'; // Importing the CloseIcon component

const ReviewModal = () => {
    // Manage modal state
    const [modalState, setModalState] = useState({ open: true }); // Start with the modal open
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [reviews, setReviews] = useState({});
    const navigate = useNavigate(); // Initialize the navigate function

    const users = [
        { userId: "1", fullname: "John Doe" },
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
        } else {
            handleClose(); // Close the modal if all reviews are done
        }
    };

    const handleReviewChange = (taskId, value) => {
        setReviews((prev) => ({ ...prev, [taskId]: value }));
    };

    return (
        <>
            {modalState.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-full h-full max-w-lg rounded-lg relative flex flex-col">
                        {/* Close Icon */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 focus:outline-none"
                        >
                            <CloseIcon />
                        </button>

                        {/* Upper Section with User Name */}
                        <div className="flex-grow flex items-center justify-center h-1/3">
                            <h2 className="text-2xl font-bold">{currentUser.fullname}</h2>
                        </div>

                        {/* Black Container for Reviews */}
                        <div className="h-2/3 bg-black rounded-t-submission p-4 flex flex-col">
                            <h2 className="text-2-1 italic text-white mt-7 ml-10 mb-8">Enter review for each task</h2>

                            {/* Scrollable Review Container */}
                            <div className="flex-grow overflow-y-auto bg-black p-5">
                                {userTasks.map((task) => (
                                    <div key={task.taskId} className="mb-5 bg-[#F9F9F9] p-4 pl-10 pr-10 rounded-2xl">
                                        <h3 className="text-xl font-semibold text-black">{task.taskname}</h3>
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
                                        className="my-6 bg-white text-base font-semibold w-32 h-12 rounded-3xl"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleClose}
                                        className="my-6 bg-[#C5EE6F] text-black text-base font-semibold w-32 h-12 rounded-3xl"
                                    >
                                        Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewModal;
