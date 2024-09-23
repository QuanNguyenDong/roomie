import axios from "axios";

const getUserProfile = async () => {
    try {
        const res = await axios.get(global.route + `/users/profile`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        // console.error(error);
    }
};

export default getUserProfile;