import React from "react";

const Icon = (props) => {
    return (
        <div className="transition-opacity duration-10 opacity-100 hover:opacity-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="none"
                viewBox="0 0 22 22"
            >
                <path
                    stroke={props.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.058 1.365V3.3M5.01 1.365V3.3M11.03 12.007h.009m-.01 3.87h.01m4.002-3.87h.009m-8.031 0h.009m-.01 3.87h.01M2.501 7.17h17.066M1.497 11.275c0-4.216 0-6.323 1.257-7.633 1.257-1.31 3.28-1.31 7.326-1.31h1.908c4.046 0 6.069 0 7.326 1.31 1.257 1.31 1.257 3.417 1.257 7.633v.497c0 4.215 0 6.323-1.257 7.633-1.257 1.31-3.28 1.31-7.326 1.31H10.08c-4.046 0-6.069 0-7.326-1.31-1.257-1.31-1.257-3.418-1.257-7.633v-.497z"
                ></path>
                <path
                    stroke={props.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M2 7.17h18.07"
                ></path>
            </svg>
        </div>
    );
}

export default Icon;
