import axios from "axios";

const getTasks = async() => {
    try
    {
        const res = await axios.get(global.route + `/tasks/all`, {
            withCredentials: true,
        });                     
        return res.data.tasks;
    }catch (error) {
        console.error(error);
    }
};

const getTasksForUser = async() => {
    try{
        const res = await axios.get(global.route + `/tasks/assigned`, {
            withCredentials: true,
        });        
        return res.data.tasks;
    } catch (error) {
        console.error(error); 
    }    
};

export { getTasks, getTasksForUser };