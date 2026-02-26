import { createContext, useContext, useState } from "react";
import { signin, signout, signup as registerUser } from "../api/auth.api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Read user from sessionStorage on first load
  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem("token");
    const savedUser = sessionStorage.getItem("user");
    if (token && savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  });

  const login = async (email, password) => {
    const res = await signin({ email, password });
    const token = res.data.message.token;
    const userData = res.data.message.user || res.data.user || res.data;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const signup = async (name, email, password) => {
    const res = await registerUser({ name, email, password });
    const token = res.data.message?.token;
    const userData = res.data.message?.user || res.data.user || res.data;
    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await signout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
