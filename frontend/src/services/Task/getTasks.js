import axios from "axios";

const getUserTask = async() => {
    try{
        const res = await axios.get(global.route + `/user/tasks`, {
            withCredentials: true,
        });              
        return res.data.assignedTasks;
    } catch (error) {
        console.error(error); 
    }    
};

const getHouseTask = async() => {
    try{
        const res = await axios.get(global.route + `/house/tasks/current-week`, {
            withCredentials: true,
        });
        console.log(res.data);         
        return res.data.activeAssignment;
    } catch (error) {
        console.error(error); 
    }    
};

const getAllTasks = async () => {
    try {
        const res = await axios.get(global.route + `/house/tasks`, {
            withCredentials: true,
        });
        console.log(res.data);
        return res.data.activeAssignment;
    } catch (error) {
        console.error(error);
    }
};

export { getUserTask, getHouseTask, getAllTasks };