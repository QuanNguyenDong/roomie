import axios from "../../tokenInterceptor";

const leaveHome = async () => {
    try {
        const res = await axios.delete(global.route + `/home/leave`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export default leaveHome;
