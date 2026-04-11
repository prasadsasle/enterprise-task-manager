import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login.jsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {useState} from "react";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import HomePage from "./components/HomePage.jsx";
import ProtectedRoutes from "./services/ProtectedRoutes.jsx";
function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Public route */}
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

                        {/* Protected routes */}
                        <Route path="/" element={
                            <ProtectedRoutes>
                                <HomePage />
                            </ProtectedRoutes>
                        } />

                        <Route path="/employees" element={
                            <ProtectedRoutes>
                                <EmployeeList />
                            </ProtectedRoutes>
                        } />

                        <Route path="/employees/new" element={
                            <ProtectedRoutes>
                                <EmployeeForm />
                            </ProtectedRoutes>
                        } />

                        <Route path="/employees/edit/:id" element={
                            <ProtectedRoutes>
                                <EmployeeForm />
                            </ProtectedRoutes>
                        } />

                        <Route path="/tasks" element={
                            <ProtectedRoutes>
                                <TaskList />
                            </ProtectedRoutes>
                        } />

                        <Route path="/tasks/new" element={
                            <ProtectedRoutes>
                                <TaskForm />
                            </ProtectedRoutes>
                        } />

                        <Route path="/tasks/:id" element={
                            <ProtectedRoutes>
                                <TaskForm />
                            </ProtectedRoutes>
                        } />

                        {/* Catch-all route */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </div>
            </Router>

        </>
    )

}

export default App
