import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  Load user from localStorage on app start
  */
  useEffect(() => {

    try {

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

    } catch (error) {
      console.error("Error reading user from storage");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    setLoading(false);

  }, []);

  /*
  Login function
  */
  const login = (data) => {

    const { user, token } = data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUser(user);

    // Redirect based on role
    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } 
    else if (user.role === "organizer") {
      navigate("/organizer-dashboard");
    } 
    else if (user.role === "student") {
      navigate("/student-dashboard");
    }

  };

  /*
  Logout function
  */
  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    navigate("/login");

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >

      {!loading && children}

    </AuthContext.Provider>

  );

};