import * as React from "react";

const SVGComponent = (props) => {
    return (
        <div className="transition-opacity duration-10 opacity-100 hover:opacity-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="31"
                fill="none"
                viewBox="0 0 28 27"
            >
                <path
                    stroke={props.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.468 13.04l2.312-2.174m0 0l8.092-7.606 8.092 7.606m-16.184 0v10.867c0 .6.518 1.086 1.156 1.086h3.468m11.56-11.953l2.312 2.174m-2.312-2.174v10.867c0 .6-.518 1.086-1.156 1.086H17.34m-6.936 0c.638 0 1.156-.486 1.156-1.086v-4.347c0-.6.518-1.086 1.156-1.086h2.312c.638 0 1.156.486 1.156 1.086v4.347c0 .6.517 1.086 1.156 1.086m-6.936 0h6.936"
                ></path>
            </svg>
        </div>
    );
};

export default SVGComponent;