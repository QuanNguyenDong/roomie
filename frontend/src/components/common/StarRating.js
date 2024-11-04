import "../../styling/starRating.css";
import { useState, useEffect } from "react";
import React from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★"; // Unicode for star
const DEFAULT_UNSELECTED_COLOR = "white"; 
const DEFAULT_COLOR = "#FFD43B"; // Yellow color for selected
const DEFAULT_STROKE_COLOR = "#FFD43B"; // Yellow stroke for unselected

export default function Stars({ 
  count, 
  initialRating, 
  icon, 
  color, 
  iconSize, 
  readOnly, 
  onRatingChange
}) {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

  const handleClick = (index) => {
    if (!readOnly) {
      setRating(index);
      if (onRatingChange) {
        onRatingChange(index);
      }
    }
  };

  return (
    <div className="starsContainer">
      {stars.map((item, index) => {
        const isActiveColor = rating && index < rating;
        let elementColor = "";

        if (isActiveColor) {
        
          elementColor = color || DEFAULT_COLOR;
        } else {

          elementColor = DEFAULT_UNSELECTED_COLOR;
        }

        return (
          <div
            className="star"
            key={index}
            style={{
              fontSize: iconSize ? `${iconSize}px` : "14px",
              color: elementColor,
              WebkitTextStroke: !isActiveColor ? `2px ${DEFAULT_STROKE_COLOR}` : "none", 
              cursor: readOnly ? "default" : "pointer",
              filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`, // Grayscale unselected stars
            }}
            onClick={() => handleClick(index + 1)}
          >
            {icon ? icon : DEFAULT_ICON}
          </div>
        );
      })}
    </div>
  );
}

