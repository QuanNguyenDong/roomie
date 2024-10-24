import axios from "../../tokenInterceptor";

const createHome = async (body = {}) => {
    try {
        const res = await axios.post(global.route + `/home/create`, body, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};

export default createHome;
