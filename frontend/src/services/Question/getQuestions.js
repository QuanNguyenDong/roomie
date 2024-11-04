import axios from "axios";
// import React from 'react';

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