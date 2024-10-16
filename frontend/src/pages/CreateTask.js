import React from "react";

import "../styling/createTask.scss";
import "../styling/taskCard.scss";

import PeopleIcon from "../svgs/TaskManagement/PeopleIcon";
import PriorityIcon from "../svgs/TaskManagement/PriorityIcon";
import TaskFrequencyIcon from "../svgs/TaskManagement/TaskFrequencyIcon";
import DurationIcon from "../svgs/TaskManagement/DurationIcon";

const CreateTask = () => {
  return (
    <div className="absolute z-20 top-0 w-full h-100vh bg-[#f6f6f6]">
      <div className="header bg-gradient-to-b from-[#7D8D9C] to-[#F6F6F6]">
        <div className="task-avatar2">
          <PeopleIcon />
        </div>
        <h1>Wash dishes</h1>
      </div>

      <h2>Description</h2>
      <div className="description">
        <p>Use rubber gloves</p>
      </div>
      <div className="content">
        <div className="frequency-box">
          <p>
            <span className="icon-text-container">
              <span className="icon-text-label">
                <PriorityIcon />
                Priority: pp
              </span>
            </span>
          </p>
          <p>
            <span className="icon-text-container">
              <span className="icon-text-label">
                <TaskFrequencyIcon />
                Frequency: FQ days
              </span>
            </span>
          </p>

          <p>
            <span className="icon-text-container">
              <span className="icon-text-label">
                <DurationIcon />
                Time Required: 60 minutes
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
