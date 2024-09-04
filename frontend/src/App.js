import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Topbar from './components/Topbar';
import Navbar from './components/Navbar';

import UserSelect from './pages/UserSelect';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isUserSelectPage = location.pathname === "/";

  global.route = "http://localhost:3001";

  return (
    <Fragment>
      {!isUserSelectPage && <Topbar />}
      <Routes>
        <Route path="/" element={<UserSelect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
      {!isUserSelectPage && <Navbar />}
    </Fragment>
  );
}

export default App;