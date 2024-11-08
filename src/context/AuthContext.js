// src/context/AuthContext.js
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4400/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser({ email });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const register = async (name, email, password) => {
    await axios.post("http://localhost:4400/api/auth/register", { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
