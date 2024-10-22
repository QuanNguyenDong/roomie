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
import RoomieProfile from "./pages/RoomieProfile";
import Prompts from "./pages/prompts"; 
import DefaultLayout from "./layouts/DefaultLayout";
import TopbarOnly from "./layouts/TopbarOnly";
import Reviews from "./pages/Reviews";
import ReviewModal from "./pages/ReviewSubmissionModal";
import Signup from "./pages/Signup";


function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}
function AppRoutes() {
    global.route = "/api";
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<UserSelect />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/home"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        <DefaultLayout>
                            <Calendar />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <DefaultLayout>
                            <TaskManager />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <DefaultLayout>
                            <Profile />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/roomie"
                    element={
                        <DefaultLayout>
                            <Roomie />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/icebreakers"
                    element={
                        <DefaultLayout>
                            <RoomieProfile />
                        </DefaultLayout>
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
                <Route
                    path="/reviews"
                    element={
                        <DefaultLayout>
                            <Reviews />
                        </DefaultLayout>
                    }
                />
                <Route path="/reviewModal"
                    element={
                        <DefaultLayout>
                            <ReviewModal />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </Fragment>
    );
}
export default App;