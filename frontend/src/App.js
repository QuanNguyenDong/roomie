import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import UserSelect from "./pages/UserSelect";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import TaskManager from "./pages/TaskManager";
import Profile from "./pages/Profile";
import Roomie from "./pages/Roomie";
import Prompts from "./pages/prompts";  // Import the Prompts component
import DefaultLayout from "./layouts/DefaultLayout";
import TopbarOnly from "./layouts/TopbarOnly";
function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}
function AppRoutes() {
    global.route = "http://localhost:3001";
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<UserSelect />} />
                <Route path="/home"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route path="/calendar"
                    element={
                        <DefaultLayout>
                            <Calendar />
                        </DefaultLayout>
                    }
                />
                <Route path="/tasks"
                    element={
                        <DefaultLayout>
                            <TaskManager />
                        </DefaultLayout>
                    }
                />
                <Route path="/profile"
                    element={
                        <DefaultLayout>
                            <Profile />
                        </DefaultLayout>
                    }
                />
                <Route path="/roomie"
                    element={
                        <TopbarOnly>
                            <Roomie />
                        </TopbarOnly>
                    }
                />
                {/* Add the Prompts route */}
                <Route path="/prompts"
                    element={
                        <DefaultLayout>
                            <Prompts />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </Fragment>
    );
}
export default App;