import React from 'react';
import Slider from "react-slick";

//Task tiles will have carousel
const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  
  const Tile = ({ type, title, reviews, stars, tasksCompleted }) => {
    if (type === 'task') {
      return (
        <div className="bg-white border rounded-reviews p-6 m-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          {reviews.length > 0 ? (
            // Render the Slider for task tiles
            <Slider {...sliderSettings} className="mt-4">
              {reviews.map((review, index) => (
                <div key={index} className="p-4">
                  <p>{review.reviewText}</p>
                </div>
              ))}
            </Slider>
          ) : (
            // For no reviews
            <div className="mt-4">
              <p className="text-gray-600">No reviews to show</p>
            </div>
          )}
        </div>
      );
    }
  
    if (type === 'stars') {
      return (
        <div className="bg-white border rounded-lg shadow-lg p-6 m-2 w-1/2">
          <h3 className="text-xl font-semibold">Stars</h3>
          <div className="mt-4">
            <p className="text-gray-600">Total Stars: {stars}</p>
          </div>
        </div>
      );
    }
  
    if (type === 'tasksCompleted') {
      return (
        <div className="bg-white border rounded-lg shadow-lg p-6 m-2 w-1/2">
          <h3 className="text-xl font-semibold">Tasks Completed</h3>
          <div className="mt-4">
            <p className="text-gray-600">Tasks Completed: {tasksCompleted}</p>
          </div>
        </div>
      );
    }
  
    // If type is not 'task', 'stars', or 'tasksCompleted', return null (nothing is rendered)
    //return null;
  };
  

export default Tile;

