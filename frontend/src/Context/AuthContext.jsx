import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/auth/login");
        });
    }
  }, [navigate]);

  // const login = async (credentials) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/auth/login",
  //       credentials
  //     );
  //     const { token } = response.data;
  //     localStorage.setItem("token", token);
  //     setUser(response.data.user);
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   navigate("/auth/login");
  // };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
