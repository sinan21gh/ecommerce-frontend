import {createContext, useState, useEffect, useContext} from "react";
import api from "../api/axiosConfig";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (token) {
      api
          .get("/users/me")
          .then((res) => setUser(res.data))
          .catch(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
          });
    }
  }, [token]);

  const login = async (username, password) => {
    try{
      const res = await api.post("/users/login", { username, password });
      const jwt = res.data;
      setToken(jwt);
      localStorage.setItem("token", jwt);
      setMessage("login success");

      const profile = await api.get("/users/me");
      setUser(profile.data);
      console.log(profile.data);

    }
    catch(err) {
      setMessage("could not login");
      console.log(err);
    }

  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, message, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
