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

const getHomeEvents = async () => {
    try {
        const res = await axios.get(global.route + `/events/all/active`, {
            withCredentials: true,
        });
        
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export { getEvents, getHomeEvents };
