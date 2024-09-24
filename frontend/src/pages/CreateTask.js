import React from "react";
import "../styling/createTask.scss";
import "../styling/taskCard.scss";
import PeopleIcon from "../svgs/TaskManagement/PeopleIcon"

const CreateTask = () => {
  return (
    <div className="modal-content">
    <div className="relative pt-16 px-7 py-4 h-[38vh] bg-gradient-to-b from-[#7D8D9C] to-[#F6F6F6]">
        <div className='task-avatar3'><PeopleIcon/></div>
        <h1>Create Task</h1>
    </div>
    <h2>Description</h2>
    <div className='description'>
      <input type="text" id="description-task"></input>
      </div>
      <button>Enter</button>
      </div>
  );
};

export default CreateTask;
