import React from "react";

const Icon = (props) => {
    return (
        <div className="transition-opacity duration-10 opacity-100 hover:opacity-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke={props.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                ></path>
            </svg>
        </div>
    );
}

export default Icon;
