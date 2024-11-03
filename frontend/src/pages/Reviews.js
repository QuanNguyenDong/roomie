import React, {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import getUserProfile from "../services/User/getUserProfile";
import getReviews from "../services/Review/getReviews.js";

import "../styling/Review.css";
import CloseIcon from "../svgs/TaskManagement/CloseIcon.js";
import Tile from '../components/Review/Tile';

const Reviews = () => {
  const [user, setUser] = useState({});
  const [reviewData, setReviewData] = useState([]); // Store fetched tasks
  
  const navigate = useNavigate();

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

    const fetchReviews = async () => {
      const fetchedReviews = await getReviews(); // Fetch reviews asynchronously
      setReviewData(fetchedReviews || []); // Set reviews or empty array if none
    };
    fetchReviews();
  }, [navigate]);

  const handleClose = () => {
    navigate('/profile'); 
  }

  return (
    <>
    <div className="max-w-[500px] h-full mx-auto p-8">
      <div className="flex justify-between items-center m-2">
      <div className="flex items-center">
            {/* Display the initial in a styled div */}
            <div
              className="flex items-center justify-center bg-[#7D8D9C]
              text-white font-regular rounded-full w-14 h-14 border-gray-300 shadow-md"
              style={{ fontSize: '24px' }}
            >
              {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
            </div>
            <h3 className="text-2xl font-bold ml-4">Your Weekly Reviews</h3>
          </div>
          
        <button
          onClick={handleClose}
          data-testid="close-button"
        >
        <CloseIcon />
        </button>
      </div>
      
      <div className="flex flex-wrap w-full">
        {/* The stars and tasksCompleted tiles */}
        <div className="flex w-full justify-between rounded-full">
          <Tile
            type="stars"
            title="Total Stars"
            stars={user.stars || 0}
            />
          <Tile
            type="tasksCompleted"
            title="Tasks Completed"
            tasksCompleted={user.taskscompleted || 0}
            />
        </div>
        
        {reviewData.length > 0 ? (
          <div className="w-full">
           {/*task tiles */}
            {reviewData.map((tile, index) => (
              <Tile
                key={index}
                type="task"
                title={tile.title}
                reviews={tile.reviews}
              />
            ))}
          </div>
        ) : ( 
          <div className="flex flex-col justify-center items-center mt-40 w-full">
                                    <p className="text-lg text-center mt-6">No reviews submitted.</p>
                                    <button
                                        onClick={handleClose}
                                        className="mt-4 bg-black text-white text-base font-semibold w-32 h-12 rounded-3xl"
                                    >
                                        Close
                                    </button>
                                </div> 
        )}    
      </div>
    </div>
  </>
);
};

export default Reviews;
