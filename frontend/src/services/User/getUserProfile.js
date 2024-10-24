import axios from "axios";

const getUserProfile = async () => {
    try {
        const response = await axios.get(global.route + `/users/profile`, {
            withCredentials: true,
        });
        const userData = response.data;
        return userData;
    } catch (error) {
        console.error(error);
    }
};

export default getUserProfile;
