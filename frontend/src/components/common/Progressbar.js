import React from 'react';

const Progressbar = ({ currentUserIndex, totalUsers }) => {
    return (
        <div className="flex flex-col text-xxs text-white m-2 my-5">
            <div className="flex justify-between">
                <p>Progress</p>
                <p>{currentUserIndex + 1} of {totalUsers}</p>
            </div>
            <div className="flex space-x-2 mt-0.5">
                {Array.from({ length: totalUsers }, (_, index) => {
                    const isActive = index <= currentUserIndex;
                    return (
                        <div
                            key={index}
                            data-testid="progress-bar"
                            className={`h-2 w-full rounded-full ${isActive ? 'bg-[#5452C2]' : 'bg-gray-300'} flex-1`} // if active set to purple color, otherwise gray
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Progressbar;
