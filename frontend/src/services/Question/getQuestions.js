import axios from "../../tokenInterceptor";

const getQuestions = async() => {
    try{
        const res = await axios.get(global.route + `/questions`);  
        return res.data;
    } catch (error)
    {
        console.error(error);
    }    
};

export default getQuestions;