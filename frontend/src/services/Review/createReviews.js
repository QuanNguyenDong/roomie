import axios from "axios";

const createReviews = async (reviews) => {
    try
    {
        const res = await axios.post(`${global.route}/reviews`, reviews, {
            withCredentials: true,
        })
        return res.data;
    }catch (error) {
        console.error(error);
    }
};

export default createReviews;