import React from "react";

const Icon = (props) => {
    return (
        <div className="transition-opacity duration-10 opacity-100 hover:opacity-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="29"
                fill="none"
                viewBox="0 0 27 26"
            >
                <path
                    stroke={props.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.144 4.54c.462-1.847 3.17-1.847 3.631 0 .299 1.193 1.708 1.76 2.788 1.12 1.673-.988 3.587.869 2.568 2.492-.659 1.049-.075 2.416 1.155 2.705 1.903.449 1.903 3.075 0 3.524-1.23.29-1.814 1.657-1.155 2.705 1.02 1.623-.895 3.48-2.568 2.492-1.08-.64-2.49-.073-2.788 1.12-.462 1.847-3.169 1.847-3.631 0-.299-1.193-1.707-1.76-2.788-1.12-1.673.989-3.587-.869-2.568-2.492.659-1.048.075-2.415-1.154-2.705-1.904-.449-1.904-3.075 0-3.524 1.23-.29 1.813-1.656 1.154-2.705-1.019-1.623.895-3.48 2.568-2.491 1.08.638 2.49.072 2.788-1.121z"
                ></path>
                <path
                    stroke={props.fill}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.21 12.619c0 1.742-1.455 3.155-3.25 3.155-1.796 0-3.252-1.413-3.252-3.155 0-1.742 1.456-3.155 3.252-3.155 1.795 0 3.25 1.413 3.25 3.155z"
                ></path>
            </svg>    
        </div>   
    );
}

export default Icon;