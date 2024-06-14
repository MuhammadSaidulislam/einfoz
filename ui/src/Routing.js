import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Admin/Login/Login';
import AdminGuard from './Component/AdminGuard/AdminGuard';
import AddOption from './Pages/Admin/AddOption/AddOption';
import Dashboard from './Pages/User/Dashboard/Dashboard';
import AdminDashboard from './Pages/Admin/Dashboard/Dashboard';
import ViewProfile from './Component/ViewProfile/ViewProfile';
import ViewPost from './Component/ViewPost/ViewPost';
import ViewService from './Component/ViewService/ViewService';

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AdminGuard />}>
                        <Route path="/add-option" element={<AddOption />}></Route>
                        <Route path="/my-dashboard" element={<AdminDashboard />}></Route>
                    </Route>
                    <Route path="/profile/:id" element={<ViewProfile />}></Route>
                    <Route path="/post/:id" element={<ViewPost />}></Route>
                    <Route path="/service/:id" element={<ViewService />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing