import axios from "../../tokenInterceptor";

const createAnswers = async (body = {}) => {
    try {
        const res = await axios.post(global.route + `/answers`, body, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export default createAnswers;
