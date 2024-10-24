import axios from "../../tokenInterceptor";

export const createTask = async (newTask) => {
    try {
        const res = await axios.post(`${global.route}/tasks/create`, newTask, {
            withCredentials: true,
        }) 
        return res.data.task;
    } catch (error) {
        console.error(error);
    }
};

export const completeTask = async (assignId) => {
    try {
        const response = await axios.put(`${global.route}/tasks/${assignId}/complete`, {}, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('Error completing task:', error.response ? error.response.data : error.message);
    }
};