import axios from "axios";

const getActiveTaskAssignment = async (taskId) => {
    try {
        const query = new URLSearchParams({ task: taskId }).toString();
        const url = `${global.route}/tasks/activeAssignment?${query}`;        
        const res = await axios.get(url, {
            withCredentials: true,
        });        
        return res.data.activeAssignment;
    } catch (error) {
        console.error(error);
    }
};

export default getActiveTaskAssignment;