import axios from "../../tokenInterceptor";

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
    // const token = localStorage.getItem('token');
    // if (!token) {
    //     return [];
    // }

    try {
        const res = await axios.get(global.route + `/events/all/active`, {
            withCredentials: true,
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        },);
        
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export { getEvents, getHomeEvents };
