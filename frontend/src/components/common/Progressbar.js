import React from 'react';

const Progressbar = ({ currentUserIndex, totalUsers }) => {
    return (
        <div className="flex flex-col text-xxs text-white m-2 my-5">
            <div className="flex justify-between">
                <p1>Progress</p1>
                <p1>{currentUserIndex + 1} of {totalUsers}</p1>
            </div>
            <div className="flex space-x-2 mt-0.5">
                {Array.from({ length: totalUsers }, (_, index) => {
                    const isActive = index <= currentUserIndex;
                    return (
                        <div
                            key={index}
                            className={`h-2 w-full rounded-full ${isActive ? 'bg-[#5452C2]' : 'bg-gray-300'} flex-1`} // if is active set to green color otherwise grye
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Progressbar;
