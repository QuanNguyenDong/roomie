import "../../styling/starRating.css";
import { useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "yellow";

export default function Stars({ count, initialRating, icon, color, iconSize, readOnly, onRatingChange}) {
  const [rating, setRating] = useState(initialRating);

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
              filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
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
