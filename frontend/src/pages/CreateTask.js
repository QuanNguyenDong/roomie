import React from "react";
import "../styling/createTask.scss";
import "../styling/taskCard.scss";
import PeopleIcon from "../svgs/TaskManagement/PeopleIcon"

const CreateTask = () => {
  return (
    <div className="modal-content">
    <div className="relative pt-16 px-7 py-4 h-[40vh] bg-gradient-to-b from-[#7D8D9C] to-[#F6F6F6]">
        <div className="header">
        <div className='task-avatar2'><PeopleIcon/></div>
        <h1>Create Task</h1>
        </div>
    </div>
    <h2>Description</h2>
    <div className='description'>
      <p>hello</p>
      </div>
      </div>
  );
};

export default CreateTask;
