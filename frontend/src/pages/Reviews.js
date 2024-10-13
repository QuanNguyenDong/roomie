import React, {useEffect, useState } from "react";
import "../styling/Review.css";
import CloseIcon from "../svgs/TaskManagement/CloseIcon.js";
import Tile from '../components/Review/Tile';
import { useNavigate } from 'react-router-dom';
import getReviews from "../services/Review/getReviews.js";

const Reviews = () => {
  const [reviewData, setReviewData] = useState([]); // Store fetched tasks
  const [username, setUsername] = useState("Angus");

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviews(); // Fetch reviews asynchronously
      setReviewData(fetchedReviews || []); // Set reviews or empty array if none
    };
    fetchReviews();
  }, []);
    //this data needs to be calculated from other tables
  const additionalData = {
    stars: 100,
    tasksCompleted: 5,
  };  

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

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/profile'); 
  }

  const userInitial = username.charAt(0).toUpperCase();

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
              {userInitial}
            </div>
            <h3 className="text-2xl font-bold ml-4">Your Weekly Reviews</h3>
          </div>
          
        <button
          onClick={handleClose}
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
            stars={additionalData.stars}
            />
          <Tile
            type="tasksCompleted"
            title="Tasks Completed"
            tasksCompleted={additionalData.tasksCompleted}
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
