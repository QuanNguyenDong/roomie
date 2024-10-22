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

//need a reivew data table
/*
  const reviewData = [
    {
      title: 'Clean Backyard',
      reviews: [
        { reviewText: 'Great job!' },
        { reviewText: 'Needs improvement.'},
        { reviewText: 'could be better' },
        { reviewText: 'How did you get it so clean...no really'}
      ],
    },
    {
      title: 'Wipe TV',
      reviews: [
        { reviewText: 'Clean better bro' },
      ],
    },
    {
      title: 'Cook Chicken',
      reviews: [
        { reviewText: 'Wow so much chicken'},
        { reviewText: 'Excellent work remembering'},
      ],
    },
    {
       title: 'Kitchen Cleaning',
       reviews: [
        { reviewText: 'Please make sure you clean the countertops after you finish next time!'},
        { reviewText: 'Excellent work.'},
       ],
    },
    {
       title: 'Feather Dusting',
       reviews: [],
    },
  ];
  */

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
            tasksCompleted={user.taskscompleted}
            />
        </div>

        {/*task tiles */}
        <div className="w-full">
          {reviewData.map((tile, index) => (
            <Tile
              key={index}
              type="task"
              title={tile.title}
              reviews={tile.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);
};

export default Reviews;
