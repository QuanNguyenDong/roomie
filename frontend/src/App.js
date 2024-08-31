import React, { Fragment } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';

import UserSelect from './pages/UserSelect';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<UserSelect />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<TaskManager />} />
        </Routes>

        <div className="fixed bottom-0 w-full">
          <Navbar />  {/* Navbar always displayed at the bottom */}
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
