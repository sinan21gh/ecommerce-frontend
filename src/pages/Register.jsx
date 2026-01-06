import {createContext,useContext, useState} from "react";
import axios from "axios";
import api from "../api/axiosConfig.js";
import { useNavigate } from "react-router-dom";
import Verify from "./Verify.jsx";

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
       <>
           <div className="body1">
                <button style={{marginLeft:"100px", marginTop:"20px", color:"white", background:"none", border:"none", cursor:"pointer", fontSize:"2em"} }
                         title="About Us">E-Commerce</button>

                <div className="forms">
                    <h1 style={{color:"black"}}>Register</h1>
                    <p style={{color:"black"}}>{message}</p>
                    <form onSubmit={submit}>
                        <input
                            className="i1"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        /><br/>
                        <input
                            className="i2"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        /><br/>
                        <input
                            className="i3"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /><br/>
                        <button type="submit">Register</button>
                    </form>
                    <p style={{color:"black"}}>{message}</p>
                </div>
                <p className="loginmes">Already Have An Account?</p>
                <button className="f1" onClick={GoToLogin}>Go To Login</button>

           </div>
       </>
    )
}
export default Register;