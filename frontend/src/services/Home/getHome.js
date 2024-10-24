import axios from "../../tokenInterceptor";

const getHome = async () => {
    try {
        const res = await axios.get(global.route + `/home`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export default getHome;