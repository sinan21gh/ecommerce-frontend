
import {AuthProvider} from "../context/AuthContext";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axiosConfig.js";
import {useAuth} from "../context/AuthContext";
import "../Login.css"

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

    const GoToLogin = () => {
        navigate("/register");
    };

    return (
  <div className="auth-page">
    <div className="auth-card">
      <h1 className="auth-title">Login</h1>

      {message && <p className="auth-message">{message}</p>}

      <form onSubmit={handleLogin} className="auth-form">
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
        <div className="auth-footer">
            <p>Don't have an account?</p>
            <button className="link-btn" onClick={GoToLogin}>Create an account</button>
        </div>
    </div>
  </div>
);


}
export default Login;