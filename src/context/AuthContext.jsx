import {createContext, useState, useEffect, useContext} from "react";
import api from "../api/axiosConfig";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

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
    const res = await api.post("/users/login", { username, password });
    const jwt = res.data;

    setToken(jwt);
    localStorage.setItem("token", jwt);

    const profile = await api.get("/users/me");
    setUser(profile.data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);