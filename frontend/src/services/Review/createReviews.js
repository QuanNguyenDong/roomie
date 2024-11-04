import axios from "axios";
// import React from 'react';

const createReviews = async (reviews) => {
    try {
        const res = await axios.post(`${global.route}/reviews`, reviews, {
            withCredentials: true,
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

const addStars = async (userId, amount) => {
    try {
        const res = await axios.post(global.route + `/users/${userId}/stars`, { amount }, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export { createReviews, addStars };