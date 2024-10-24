import axios from "../../tokenInterceptor";

const joinHome = async (body = {}) => {
    try {
        const res = await axios.post(global.route + `/home/join`, body, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};

export default joinHome;
