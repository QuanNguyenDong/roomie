import axios from "axios";

const createTask = async (newTask) => {
    try {
        const res = await axios.post(`${global.route}/tasks/create`, newTask, {
            withCredentials: true,
        }) 
        return res.data.task;
    } catch (error) {
        console.error(error);
    }
};

export default createTask;