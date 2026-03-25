import {createContext,useContext, useState} from "react";
import axios from "axios";
import api from "../api/axiosConfig.js";
import { useNavigate } from "react-router-dom";
import Verify from "./Verify.jsx";
import "../Register.css"

function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const res = await api.post("/users/register",{username,email,password});
            console.log(res);
            setMessage("Account created");

            setTimeout(()=> {
                navigate("/verifypage", {
                    state:{email}
                });
            },3000)
        }
        catch (err) {
            if (err.response?.status === 409) {
                setMessage("Username or email has been taken");
            }
            else {
                setMessage("Registration failed");
            }
        }

    }


    const GoToLogin = () => {
        navigate("/login");
    };
    const goToVerify = () => {
        navigate("/verifypage");
    };


    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>

                {message && <p className="auth-message">{message}</p>}

                <form onSubmit={submit} className="auth-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" className="primary-btn">
                        Register
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <button className="link-btn" onClick={GoToLogin}>Go to Login</button>
                </div>
            </div>
        </div>
    );
}
export default Register;