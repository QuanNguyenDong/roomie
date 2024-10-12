import axios from "axios";

const getEvents = async () => {
    try {
        const res = await axios.get(global.route + `/events/all`, {
            withCredentials: true,
        });
        
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export { getEvents };
