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
  appendDots: dots => (
    <div style={{ marginTop: '10px' }}>  {/* Adjust dot container */}
      <ul style={{ margin: "0px"}}> {dots} </ul>
    </div>
  ),
  customPaging: i => (
    <div
      style={{
        width: '10px', 
        height: '10px', 
        borderRadius: '50%',
        backgroundColor: '#D7D7D7', 
      }}
    />
  ),
};
  
  const Tile = ({ type, title, reviews, stars, tasksCompleted }) => {
    if (type === 'task') {
      return (
        <div>
        <style>
          {`
            .slick-dots li.slick-active div {
              background-color: #000 !important;  /* Active dot color */
            }
          `}
        </style>
        <div className="bg-white rounded-reviews p-6 m-2 mt-5">
          <h3 className="text-[18px] font-semibold ml-[13px] mt-4">{title}</h3>
          {reviews.length > 0 ? (
            // Render the Slider for task tiles
            <Slider {...sliderSettings} className="mb-4">
              {reviews.map((review, index) => (
                <div key={index} className="p-4">
                  <p className='text-[16px]'>{review.reviewText}</p>
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
        </div>
      );
    }
  
    if (type === 'stars') {
      return (
        <div className="bg-white rounded-2xl p-6 m-2 w-1/2">
          <h3 className="text-[16px] font-semibold">Stars Earned</h3>
          <div className="mt-4">
            <p className="text-gray-600  text-[20px] text-center">{stars}</p>
          </div>
        </div>
      );
    }
  
    if (type === 'tasksCompleted') {
      return (
        <div className="bg-white rounded-2xl p-6 m-2 w-1/2">
          <text className="text-[16px] font-semibold">Tasks Completed</text>
          <div className="mt-4">
            <p className="text-gray-600 text-[20px] text-center">{tasksCompleted}</p>
          </div>
        </div>
      );
    }
  
    // If type is not 'task', 'stars', or 'tasksCompleted', return null (nothing is rendered)
    //return null;
  };
  

export default Tile;

