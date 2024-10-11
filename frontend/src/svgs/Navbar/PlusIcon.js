import React from "react";

const Icon = (props) => {
  return (
    <div className="transition-opacity duration-10 opacity-100 hover:opacity-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke={props.fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M10 2v16m8-8H2"
        ></path>
      </svg>
    </div>
  );
}

export default Icon;