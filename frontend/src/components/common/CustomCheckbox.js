import React from "react";

const CustomCheckbox = ({ isChecked, onChange }) => {
    return (
        <div className="relative group">
            <label className="flex cursor-pointer">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={onChange} // Use the passed handler
                />
                <span
                    className={`w-4 h-4 mt-2 ml-3 rounded-full flex justify-center items-center border-2 border-black transition-all duration-300
        ${isChecked ? 'bg-black' : 'bg-white'}`}
                >
                    {isChecked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                    {!isChecked && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-transparent group-hover:text-black transition-colors duration-150"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </span>
                <text className="w-4 h-4 mt-1.5 ml-1.5 text-sm font-semibold">
                    Done
                </text>
            </label>
        </div>
    );
};

export default CustomCheckbox;
