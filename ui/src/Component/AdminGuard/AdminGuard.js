import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { isAdminAuthenticate } from '../../api/admin';

const AdminGuard = () => {
    let auth = isAdminAuthenticate();
    return(auth.role === "admin" ? <Outlet /> : <Navigate to="/" />)
}

export default AdminGuard