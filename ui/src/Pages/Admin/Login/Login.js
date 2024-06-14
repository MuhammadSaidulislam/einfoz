import React from 'react'
import './Login.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginAdmin } from '../../../api/admin';
// import { loginAdmin } from '../../api/admin';

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const adminLogin = () => {
        let loginUser = {
            name: name,
            password: password
        }
        loginAdmin(loginUser).then((data) => {
            if (data.message) {
                localStorage.setItem("niomadmin", JSON.stringify({"role":"admin"}));
                return navigate("/add-option")
            }
        })
    }
    return (
        <>
            <div className="login">
                <h2>Welcome, Admin !!</h2>
                <p>Please log in</p>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="User Name" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input onClick={() => adminLogin()} type="submit" value="Log In" />
            </div>
        </>
    );
};

export default Login;