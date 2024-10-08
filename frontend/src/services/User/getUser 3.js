import axios from "axios";

const getUser = async (userId) => {
    try{
        const query = new URLSearchParams({ user: userId}).toString();
        const url = `${global.route}/users?${query}`;        
        const res = await axios.get(url, {
            withCredentials: true,
        });
        return res.data.user;
    } catch (error) {
        console.error(error);
    }
};

export default getUser;