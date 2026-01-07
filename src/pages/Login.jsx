
import {AuthProvider} from "../context/AuthContext";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axiosConfig.js";
import {useAuth} from "../context/AuthContext";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/login", {
                username: username,
                password: password
            });

            localStorage.setItem("token", res.data);
            setMessage("Login successful!");
            console.log(res);

            setTimeout(() => {
                navigate("/products");
            }, 3000)

        } catch (err) {
            setMessage("Invalid username or password");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <input
            className="login-input1"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
            <input
                className="login-input2"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
            <button type="submit" className="login-button">Login</button>
            <p>{message}</p>
        </form>
    )

}
export default Login;