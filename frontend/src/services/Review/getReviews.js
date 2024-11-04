import axios from "axios";
// import React from 'react';

const getReviews = async () => {
    try{
        const res = await axios.get(global.route + `/reviews`, {
            withCredentials: true,
        });

        return res.data.reviewData;
    }
    catch (error) {
        console.error(error);
    }
};

export default getReviews;