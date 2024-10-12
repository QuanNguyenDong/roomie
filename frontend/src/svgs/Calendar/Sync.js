import React from "react";

const Icon = (props) => {
    return (
        <div className="transition-opacity duration-10 opacity-100 hover:opacity-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="none"
                viewBox="0 0 35 35"
            >
                <g clipPath="url(#clip0_542_1736)">
                    <path
                        stroke={props.fill}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M11.667 24.792l5.833 5.833m0 0l5.833-5.833M17.5 30.625V17.5m12.95 8.881a7.292 7.292 0 00-4.2-13.256h-1.837A11.668 11.668 0 104.375 23.756"
                    ></path>
                </g>
                <defs>
                    <clipPath id="clip0_542_1736">
                        <path fill={props.fill} d="M0 0H35V35H0z"></path>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}

export default Icon;
