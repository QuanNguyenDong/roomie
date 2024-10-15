import React, {useEffect, useState } from "react";
import "../styling/Review.css";
import CloseIcon from '../svgs/Review/CloseIcon.js'; 
import Tile from '../components/Review/Tile';
import { useNavigate } from 'react-router-dom';
import getReviews from "../services/Review/getReviews.js";

const Reviews = () => {
  const [reviewData, setReviewData] = useState([]); // Store fetched tasks


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

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/profile'); 
  }

  return (
    <>
    <div className="max-w-[500px] h-full mx-auto p-8">
      <div className="flex justify-between items-center m-2">
        <div>
          <h3 className="text-3xl font-bold">Your Reviews</h3>
          <p className="text-gray-600">Let's see how you did...</p>
        </div>
          
        <button
          onClick={handleClose}
          className="pb-6"
        >
        <CloseIcon />
        </button>
      </div>
      
      {reviewData.length > 0 ? (
        <div className="flex flex-wrap w-full">
          {/* The stars and tasksCompleted tiles */}
          <div className="flex w-full justify-between">
            <Tile
              type="stars"
              title="Total Stars"
              stars={additionalData?.stars}
              />
            <Tile
              type="tasksCompleted"
              title="Tasks Completed"
              tasksCompleted={additionalData?.tasksCompleted}
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
      ) : ( 
          <div className= "flex justify-center items-center mt-10">
            <p className = "text-2xl font-bold">No Reviews yet!</p>
          </div> 
      )}
    </div>
  </>
);
};

export default Reviews;
